/**
 * @fileoverview Servicio para la importación de manifiestos
 * @module services/importacion
 */

import * as XLSX from 'xlsx';
import { AppDataSource } from '../config/database.config';
import { Envio, EstadoEnvio } from '../models/envio.model';
import { Repository } from 'typeorm';
import * as fs from 'fs';

export interface ColumnaMapeo {
  house: string;
  descripcion: string;
  peso: string;
  bultos: string;
  remitente_nombre: string;
  remitente_passport: string;
  destinatario_nombre: string;
  destinatario_identificacion: string;
  destinatario_telefono: string;
  destinatario_direccion: string;
  cobrado_origen: string;
  unidad_destino: string;
}

export interface ValidacionResultado {
  valido: boolean;
  errores: string[];
}

export class ImportacionService {
  private envioRepository: Repository<Envio>;

  constructor() {
    this.envioRepository = AppDataSource.getRepository(Envio);
  }

  /**
   * Obtiene las columnas de un archivo Excel
   */
  async obtenerColumnas(filePath: string): Promise<string[]> {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }

  /**
   * Valida un campo específico según las reglas definidas
   */
  private validarCampo(
    valor: any,
    campo: string,
    esObligatorio: boolean,
    validaciones?: { tipo?: string; longitud?: number; regex?: RegExp }
  ): ValidacionResultado {
    const errores: string[] = [];

    // Si es obligatorio y está vacío
    if (esObligatorio && (valor === undefined || valor === null || valor === '')) {
      errores.push(`Campo "${campo}" es obligatorio`);
      return { valido: false, errores };
    }

    // Si es opcional y está vacío, es válido
    if (!esObligatorio && (valor === undefined || valor === null || valor === '')) {
      return { valido: true, errores: [] };
    }

    const valorStr = String(valor).trim();

    // Validaciones específicas
    if (validaciones) {
      // Validar tipo numérico
      if (validaciones.tipo === 'number' && isNaN(Number(valorStr))) {
        errores.push(`Campo "${campo}" debe ser un número`);
      }

      // Validar tipo booleano
      if (validaciones.tipo === 'boolean') {
        const lower = valorStr.toLowerCase();
        if (!['true', 'false', 'si', 'no', '1', '0', ''].includes(lower)) {
          errores.push(`Campo "${campo}" debe ser booleano (true/false, si/no)`);
        }
      }

      // Validar longitud exacta
      if (validaciones.longitud && valorStr.length !== validaciones.longitud) {
        errores.push(`Campo "${campo}" debe tener exactamente ${validaciones.longitud} dígitos (actual: ${valorStr.length})`);
      }

      // Validar regex (ej. Carnet de Identidad: 11 dígitos)
      if (validaciones.regex && !validaciones.regex.test(valorStr)) {
        errores.push(`Campo "${campo}" tiene formato inválido`);
      }
    }

    return {
      valido: errores.length === 0,
      errores,
    };
  }

  /**
   * Valida una fila completa de datos
   */
  private validarFila(fila: any, mapeo: ColumnaMapeo): ValidacionResultado {
    const errores: string[] = [];

    // Validar House (obligatorio, formato)
    const houseResult = this.validarCampo(
      fila[mapeo.house],
      'House',
      true,
      { regex: /^[A-Z]{4}-\d{8}$/ }
    );
    errores.push(...houseResult.errores);

    // Validar Descripción (obligatorio)
    const descResult = this.validarCampo(
      fila[mapeo.descripcion],
      'Descripción',
      true
    );
    errores.push(...descResult.errores);

    // Validar Peso (obligatorio, > 0)
    const pesoValor = fila[mapeo.peso];
    if (pesoValor === undefined || pesoValor === null || pesoValor === '') {
      errores.push('Campo "Peso" es obligatorio');
    } else if (isNaN(Number(pesoValor)) || Number(pesoValor) <= 0) {
      errores.push('Campo "Peso" debe ser mayor a 0');
    }

    // Validar Bultos (obligatorio, > 0)
    const bultosValor = fila[mapeo.bultos];
    if (bultosValor === undefined || bultosValor === null || bultosValor === '') {
      errores.push('Campo "Bultos" es obligatorio');
    } else if (isNaN(Number(bultosValor)) || Number(bultosValor) <= 0) {
      errores.push('Campo "Bultos" debe ser mayor a 0');
    }

    // Validar Remitente (obligatorio)
    const remResult = this.validarCampo(
      fila[mapeo.remitente_nombre],
      'Remitente',
      true
    );
    errores.push(...remResult.errores);

    // Validar Destinatario (obligatorio)
    const destResult = this.validarCampo(
      fila[mapeo.destinatario_nombre],
      'Destinatario',
      true
    );
    errores.push(...destResult.errores);

    // Validar Carnet de Identidad (obligatorio, 11 dígitos)
    const carnetResult = this.validarCampo(
      fila[mapeo.destinatario_identificacion],
      'Carnet de Identidad',
      true,
      { longitud: 11, regex: /^\d{11}$/ }
    );
    errores.push(...carnetResult.errores);

    // Validar Teléfono (obligatorio)
    const telResult = this.validarCampo(
      fila[mapeo.destinatario_telefono],
      'Teléfono',
      true
    );
    errores.push(...telResult.errores);

    // Validar Dirección (obligatorio)
    const dirResult = this.validarCampo(
      fila[mapeo.destinatario_direccion],
      'Dirección',
      true
    );
    errores.push(...dirResult.errores);

    // Validar Unidad de Destino (obligatorio)
    const unidadResult = this.validarCampo(
      fila[mapeo.unidad_destino],
      'Unidad de destino',
      true
    );
    errores.push(...unidadResult.errores);

    // Validar Passport (opcional)
    const passportResult = this.validarCampo(
      fila[mapeo.remitente_passport],
      'Passport',
      false
    );
    errores.push(...passportResult.errores);

    // Validar Cobrado/No Cobrado (opcional, booleano)
    if (mapeo.cobrado_origen) {
      const cobradoResult = this.validarCampo(
        fila[mapeo.cobrado_origen],
        'Cobrado/No Cobrado',
        false,
        { tipo: 'boolean' }
      );
      errores.push(...cobradoResult.errores);
    }

    return {
      valido: errores.length === 0,
      errores,
    };
  }

  /**
   * Obtiene vista previa de los datos con el mapeo seleccionado
   */
  async obtenerVistaPrevia(
    filePath: string,
    mapeo: ColumnaMapeo,
    clienteId: number
  ): Promise<{ filas: any[]; total: number; errores: any[] }> {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    // Filtrar filas vacías (todas las columnas vacías)
    const filasValidas = data.filter((fila: any) => {
      const valores = Object.values(fila);
      return valores.some((v) => v !== '' && v !== null && v !== undefined);
    });

    const errores: any[] = [];
    const filasResult: any[] = [];

    for (let i = 0; i < filasValidas.length; i++) {
      const fila = filasValidas[i];
      const resultado = this.validarFila(fila, mapeo);

      // Mapear los campos
      const envioData = {
        house: fila[mapeo.house] || '',
        descripcion: fila[mapeo.descripcion] || '',
        peso: parseFloat(fila[mapeo.peso]) || 0,
        bultos: parseInt(fila[mapeo.bultos]) || 0,
        remitente_nombre: fila[mapeo.remitente_nombre] || '',
        remitente_passport: fila[mapeo.remitente_passport] || '',
        destinatario_nombre: fila[mapeo.destinatario_nombre] || '',
        destinatario_identificacion: fila[mapeo.destinatario_identificacion] || '',
        destinatario_telefono: fila[mapeo.destinatario_telefono] || '',
        destinatario_direccion: fila[mapeo.destinatario_direccion] || '',
        cobrado_origen: fila[mapeo.cobrado_origen]
          ? ['true', 'si', '1'].includes(String(fila[mapeo.cobrado_origen]).toLowerCase())
          : false,
        unidad_destino: fila[mapeo.unidad_destino] || '',
        id_cliente: clienteId,
        estado: EstadoEnvio.PENDIENTE,
      };

      filasResult.push(envioData);

      if (!resultado.valido) {
        errores.push({
          fila: i + 1,
          house: fila[mapeo.house] || '',
          errores: resultado.errores,
        });
      }
    }

    return {
      filas: filasResult,
      total: filasValidas.length,
      errores,
    };
  }

  /**
   * Importa el archivo con el mapeo seleccionado
   */
  async importar(
    filePath: string,
    mapeo: ColumnaMapeo,
    clienteId: number
  ): Promise<{
    total: number;
    importados: number;
    errores: Array<{ fila: number; house: string; errores: string[] }>;
    envios: any[];
  }> {
    const vistaPrevia = await this.obtenerVistaPrevia(filePath, mapeo, clienteId);

    const enviosValidos = vistaPrevia.filas.filter(
      (_, index) => !vistaPrevia.errores.some((e) => e.fila === index + 1)
    );

    const enviosCreados: any[] = [];

    for (const envioData of enviosValidos) {
      try {
        // Verificar que el House no exista
        const existing = await this.envioRepository.findOne({
          where: { house: envioData.house },
        });
        if (existing) {
          vistaPrevia.errores.push({
            fila: vistaPrevia.filas.indexOf(envioData) + 1,
            house: envioData.house,
            errores: [`House "${envioData.house}" ya existe en la base de datos`],
          });
          continue;
        }

        const envio = this.envioRepository.create(envioData);
        const saved = await this.envioRepository.save(envio);
        enviosCreados.push(saved);
      } catch (error) {
        const index = vistaPrevia.filas.indexOf(envioData);
        vistaPrevia.errores.push({
          fila: index + 1,
          house: envioData.house,
          errores: [error instanceof Error ? error.message : 'Error al guardar'],
        });
      }
    }

    // Limpiar archivo temporal
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.warn('No se pudo eliminar el archivo temporal:', filePath);
    }

    return {
      total: vistaPrevia.total,
      importados: enviosCreados.length,
      errores: vistaPrevia.errores,
      envios: enviosCreados,
    };
  }
}