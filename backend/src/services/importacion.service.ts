/**
 * @fileoverview Servicio para la importación de manifiestos
 * @module services/importacion
 */

import * as XLSX from 'xlsx';
import { AppDataSource } from '../config/database.config';
import { Envio, EstadoEnvio } from '../models/envio.model';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

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

export interface FilaData {
  [key: string]: string | number | boolean | null | undefined;
}

export interface ValidacionResultado {
  valido: boolean;
  errores: string[];
}

export interface ErrorReporte {
  fila: number;
  house: string;
  errores: string[];
}

export interface ImportacionResultado {
  total: number;
  importados: number;
  errores: ErrorReporte[];
  envios: Envio[];
}

export interface VistaPreviaResultado {
  filas: Partial<Envio>[];
  total: number;
  errores: ErrorReporte[];
}

export class ImportacionService {
  private envioRepository: Repository<Envio>;

  constructor() {
    this.envioRepository = AppDataSource.getRepository(Envio);
  }

  /**
   * Obtiene las columnas de un archivo Excel
   * @param {string} filePath - Ruta del archivo Excel
   * @returns {Promise<string[]>} Lista de nombres de columnas
   */
  obtenerColumnas(filePath: string): Promise<string[]> {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    if (data.length === 0) return Promise.resolve([]);
    return Promise.resolve(Object.keys(data[0]));
  }

  /**
   * Valida un campo específico según las reglas definidas
   * @param {any} valor - Valor a validar
   * @param {string} campo - Nombre del campo
   * @param {boolean} esObligatorio - Si el campo es obligatorio
   * @param {Object} validaciones - Validaciones adicionales
   * @returns {ValidacionResultado} Resultado de la validación
   */
  private validarCampo(
    valor: string | number | boolean | null | undefined,
    campo: string,
    esObligatorio: boolean,
    validaciones?: { tipo?: string; longitud?: number; regex?: RegExp }
  ): ValidacionResultado {
    const errores: string[] = [];

    if (esObligatorio && (valor === undefined || valor === null || valor === '')) {
      errores.push(`Campo "${campo}" es obligatorio`);
      return { valido: false, errores };
    }

    if (!esObligatorio && (valor === undefined || valor === null || valor === '')) {
      return { valido: true, errores: [] };
    }

    const valorStr = String(valor).trim();

    if (validaciones) {
      if (validaciones.tipo === 'number' && isNaN(Number(valorStr))) {
        errores.push(`Campo "${campo}" debe ser un número`);
      }

      if (validaciones.tipo === 'boolean') {
        const lower = valorStr.toLowerCase();
        if (!['true', 'false', 'si', 'no', '1', '0', ''].includes(lower)) {
          errores.push(`Campo "${campo}" debe ser booleano (true/false, si/no)`);
        }
      }

      if (validaciones.longitud && valorStr.length !== validaciones.longitud) {
        errores.push(`Campo "${campo}" debe tener exactamente ${validaciones.longitud} dígitos (actual: ${valorStr.length})`);
      }

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
   * @param {FilaData} fila - Fila del Excel
   * @param {ColumnaMapeo} mapeo - Configuración de mapeo
   * @returns {ValidacionResultado} Resultado de la validación
   */
  private validarFila(fila: FilaData, mapeo: ColumnaMapeo): ValidacionResultado {
    const errores: string[] = [];

    const houseResult = this.validarCampo(
      fila[mapeo.house],
      'House',
      true,
      { regex: /^[A-Z]{4}-\d{8}$/ }
    );
    errores.push(...houseResult.errores);

    const descResult = this.validarCampo(
      fila[mapeo.descripcion],
      'Descripción',
      true
    );
    errores.push(...descResult.errores);

    const pesoValor = fila[mapeo.peso];
    if (pesoValor === undefined || pesoValor === null || pesoValor === '') {
      errores.push('Campo "Peso" es obligatorio');
    } else if (isNaN(Number(pesoValor)) || Number(pesoValor) <= 0) {
      errores.push('Campo "Peso" debe ser mayor a 0');
    }

    const bultosValor = fila[mapeo.bultos];
    if (bultosValor === undefined || bultosValor === null || bultosValor === '') {
      errores.push('Campo "Bultos" es obligatorio');
    } else if (isNaN(Number(bultosValor)) || Number(bultosValor) <= 0) {
      errores.push('Campo "Bultos" debe ser mayor a 0');
    }

    const remResult = this.validarCampo(
      fila[mapeo.remitente_nombre],
      'Remitente',
      true
    );
    errores.push(...remResult.errores);

    const destResult = this.validarCampo(
      fila[mapeo.destinatario_nombre],
      'Destinatario',
      true
    );
    errores.push(...destResult.errores);

    const carnetResult = this.validarCampo(
      fila[mapeo.destinatario_identificacion],
      'Carnet de Identidad',
      true,
      { longitud: 11, regex: /^\d{11}$/ }
    );
    errores.push(...carnetResult.errores);

    const telResult = this.validarCampo(
      fila[mapeo.destinatario_telefono],
      'Teléfono',
      true
    );
    errores.push(...telResult.errores);

    const dirResult = this.validarCampo(
      fila[mapeo.destinatario_direccion],
      'Dirección',
      true
    );
    errores.push(...dirResult.errores);

    const unidadResult = this.validarCampo(
      fila[mapeo.unidad_destino],
      'Unidad de destino',
      true
    );
    errores.push(...unidadResult.errores);

    const passportResult = this.validarCampo(
      fila[mapeo.remitente_passport],
      'Passport',
      false
    );
    errores.push(...passportResult.errores);

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
   * @param {string} filePath - Ruta del archivo Excel
   * @param {ColumnaMapeo} mapeo - Configuración de mapeo
   * @param {number} clienteId - ID del cliente
   * @returns {Promise<VistaPreviaResultado>} Vista previa de los datos
   */
  obtenerVistaPrevia(
    filePath: string,
    mapeo: ColumnaMapeo,
    clienteId: number
  ): Promise<VistaPreviaResultado> {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: FilaData[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    const filasValidas = data.filter((fila: FilaData) => {
      const valores = Object.values(fila);
      return valores.some((v) => v !== '' && v !== null && v !== undefined);
    });

    const errores: ErrorReporte[] = [];
    const filasResult: Partial<Envio>[] = [];

    for (let i = 0; i < filasValidas.length; i++) {
      const fila = filasValidas[i];
      const resultado = this.validarFila(fila, mapeo);

      const envioData: Partial<Envio> = {
        house: String(fila[mapeo.house] || ''),
        descripcion: String(fila[mapeo.descripcion] || ''),
        peso: parseFloat(String(fila[mapeo.peso])) || 0,
        bultos: parseInt(String(fila[mapeo.bultos])) || 0,
        remitente_nombre: String(fila[mapeo.remitente_nombre] || ''),
        remitente_passport: String(fila[mapeo.remitente_passport] || ''),
        destinatario_nombre: String(fila[mapeo.destinatario_nombre] || ''),
        destinatario_identificacion: String(fila[mapeo.destinatario_identificacion] || ''),
        destinatario_telefono: String(fila[mapeo.destinatario_telefono] || ''),
        destinatario_direccion: String(fila[mapeo.destinatario_direccion] || ''),
        cobrado_origen: fila[mapeo.cobrado_origen]
          ? ['true', 'si', '1'].includes(String(fila[mapeo.cobrado_origen]).toLowerCase())
          : false,
        unidad_destino: String(fila[mapeo.unidad_destino] || ''),
        id_cliente: clienteId,
        estado: EstadoEnvio.PENDIENTE,
      };

      filasResult.push(envioData);

      if (!resultado.valido) {
        errores.push({
          fila: i + 1,
          house: String(fila[mapeo.house] || ''),
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
   * @param {string} filePath - Ruta del archivo Excel
   * @param {ColumnaMapeo} mapeo - Configuración de mapeo
   * @param {number} clienteId - ID del cliente
   * @returns {Promise<ImportacionResultado>} Resultado de la importación
   */
  async importar(
    filePath: string,
    mapeo: ColumnaMapeo,
    clienteId: number
  ): Promise<ImportacionResultado> {
    const vistaPrevia = await this.obtenerVistaPrevia(filePath, mapeo, clienteId);

    const enviosValidos = vistaPrevia.filas.filter(
      (_, index) => !vistaPrevia.errores.some((e) => e.fila === index + 1)
    );

    const enviosCreados: Envio[] = [];

    for (const envioData of enviosValidos) {
      try {
        const existing = await this.envioRepository.findOne({
          where: { house: envioData.house },
        });
        if (existing) {
          const index = vistaPrevia.filas.indexOf(envioData);
          vistaPrevia.errores.push({
            fila: index + 1,
            house: envioData.house || '',
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
          house: envioData.house || '',
          errores: [error instanceof Error ? error.message : 'Error al guardar'],
        });
      }
    }

    try {
      fs.unlinkSync(filePath);
    } catch {
      logger.warn('No se pudo eliminar el archivo temporal:', { filePath });
    }

    return {
      total: vistaPrevia.total,
      importados: enviosCreados.length,
      errores: vistaPrevia.errores,
      envios: enviosCreados,
    };
  }
}