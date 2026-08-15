/**
 * @fileoverview Servicio para la importación de manifiestos
 * @module services/importacion
 */

import * as XLSX from 'xlsx';
import { AppDataSource } from '../config/database.config.js';
import { Envio, EstadoEnvio, EnvioCreateData } from '../models/envio.model.js';
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

/**
 * Configuración de mapeo de columnas
 * @interface ColumnaMapeo
 */
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

/**
 * Datos de una fila del Excel
 * @interface FilaData
 */
export interface FilaData {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Resultado de validación de un campo
 * @interface ValidacionResultado
 */
export interface ValidacionResultado {
  valido: boolean;
  errores: string[];
}

/**
 * Reporte de error de una fila
 * @interface ErrorReporte
 */
export interface ErrorReporte {
  fila: number;
  house: string;
  errores: string[];
}

/**
 * Resultado de la importación
 * @interface ImportacionResultado
 */
export interface ImportacionResultado {
  total: number;
  importados: number;
  errores: ErrorReporte[];
  envios: Envio[];
}

/**
 * Resultado de la vista previa
 * @interface VistaPreviaResultado
 */
export interface VistaPreviaResultado {
  filas: EnvioCreateData[];
  total: number;
  errores: ErrorReporte[];
}

/**
 * Validación de un campo
 * @interface ValidacionCampo
 */
export interface ValidacionCampo {
  tipo?: 'number' | 'boolean' | 'string';
  longitud?: number;
  regex?: RegExp;
  obligatorio?: boolean;
}

/**
 * Servicio para importación de manifiestos
 * @class ImportacionService
 */
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
  async obtenerColumnas(filePath: string): Promise<string[]> {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }

  /**
   * Valida un campo específico según las reglas definidas
   * @param {string | number | boolean | null | undefined} valor - Valor a validar
   * @param {string} campo - Nombre del campo
   * @param {ValidacionCampo} reglas - Reglas de validación
   * @returns {ValidacionResultado} Resultado de la validación
   */
  private validarCampo(
    valor: string | number | boolean | null | undefined,
    campo: string,
    reglas: ValidacionCampo = {}
  ): ValidacionResultado {
    const errores: string[] = [];

    const esObligatorio = reglas.obligatorio === true;

    if (esObligatorio && (valor === undefined || valor === null || valor === '')) {
      errores.push(`Campo "${campo}" es obligatorio`);
      return { valido: false, errores };
    }

    if (!esObligatorio && (valor === undefined || valor === null || valor === '')) {
      return { valido: true, errores: [] };
    }

    const valorStr = String(valor).trim();

    if (reglas.tipo === 'number' && isNaN(Number(valorStr))) {
      errores.push(`Campo "${campo}" debe ser un número`);
    }

    if (reglas.tipo === 'boolean') {
      const lower = valorStr.toLowerCase();
      if (!['true', 'false', 'si', 'no', '1', '0', ''].includes(lower)) {
        errores.push(`Campo "${campo}" debe ser booleano (true/false, si/no)`);
      }
    }

    if (reglas.longitud && valorStr.length !== reglas.longitud) {
      errores.push(
        `Campo "${campo}" debe tener exactamente ${reglas.longitud} dígitos (actual: ${valorStr.length})`
      );
    }

    if (reglas.regex && !reglas.regex.test(valorStr)) {
      errores.push(`Campo "${campo}" tiene formato inválido`);
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

    const validaciones: Array<{ valor: unknown; campo: string; reglas: ValidacionCampo }> = [
      { valor: fila[mapeo.house], campo: 'House', reglas: { obligatorio: true, regex: /^[A-Z]{4}-\d{8}$/ } },
      { valor: fila[mapeo.descripcion], campo: 'Descripción', reglas: { obligatorio: true } },
      { valor: fila[mapeo.remitente_nombre], campo: 'Remitente', reglas: { obligatorio: true } },
      { valor: fila[mapeo.destinatario_nombre], campo: 'Destinatario', reglas: { obligatorio: true } },
      {
        valor: fila[mapeo.destinatario_identificacion],
        campo: 'Carnet de Identidad',
        reglas: { obligatorio: true, longitud: 11, regex: /^\d{11}$/ },
      },
      { valor: fila[mapeo.destinatario_telefono], campo: 'Teléfono', reglas: { obligatorio: true } },
      { valor: fila[mapeo.destinatario_direccion], campo: 'Dirección', reglas: { obligatorio: true } },
      { valor: fila[mapeo.unidad_destino], campo: 'Unidad de destino', reglas: { obligatorio: true } },
      { valor: fila[mapeo.remitente_passport], campo: 'Passport', reglas: { obligatorio: false } },
    ];

    if (mapeo.cobrado_origen) {
      validaciones.push({
        valor: fila[mapeo.cobrado_origen],
        campo: 'Cobrado/No Cobrado',
        reglas: { obligatorio: false, tipo: 'boolean' },
      });
    }

    validaciones.push({
      valor: fila[mapeo.peso],
      campo: 'Peso',
      reglas: { obligatorio: true, tipo: 'number' },
    });

    validaciones.push({
      valor: fila[mapeo.bultos],
      campo: 'Bultos',
      reglas: { obligatorio: true, tipo: 'number' },
    });

    for (const v of validaciones) {
      const result = this.validarCampo(v.valor, v.campo, v.reglas);
      errores.push(...result.errores);
    }

    // Validaciones adicionales numéricas
    const pesoValor = fila[mapeo.peso];
    if (pesoValor !== undefined && pesoValor !== null && pesoValor !== '') {
      const pesoNum = Number(pesoValor);
      if (!isNaN(pesoNum) && pesoNum <= 0) {
        errores.push('Campo "Peso" debe ser mayor a 0');
      }
    }

    const bultosValor = fila[mapeo.bultos];
    if (bultosValor !== undefined && bultosValor !== null && bultosValor !== '') {
      const bultosNum = Number(bultosValor);
      if (!isNaN(bultosNum) && bultosNum <= 0) {
        errores.push('Campo "Bultos" debe ser mayor a 0');
      }
    }

    return {
      valido: errores.length === 0,
      errores,
    };
  }

  /**
   * Convierte un valor booleano a partir de diferentes formatos
   * @param {unknown} value - Valor a convertir
   * @returns {boolean} Valor booleano
   */
  private convertirBooleano(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') {
      const lower = value.toLowerCase().trim();
      return ['true', 'si', 'sí', '1', 'yes', 'y', 'on'].includes(lower);
    }
    return false;
  }

  /**
   * Obtiene vista previa de los datos con el mapeo seleccionado
   * @param {string} filePath - Ruta del archivo Excel
   * @param {ColumnaMapeo} mapeo - Configuración de mapeo
   * @param {number} clienteId - ID del cliente
   * @returns {Promise<VistaPreviaResultado>} Vista previa de los datos
   */
  async obtenerVistaPrevia(
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
    const filasResult: EnvioCreateData[] = [];

    for (let i = 0; i < filasValidas.length; i++) {
      const fila = filasValidas[i];
      const resultado = this.validarFila(fila, mapeo);

      const envioData: EnvioCreateData = {
        house: String(fila[mapeo.house] || ''),
        descripcion: String(fila[mapeo.descripcion] || ''),
        peso: parseFloat(String(fila[mapeo.peso] || 0)),
        bultos: parseInt(String(fila[mapeo.bultos] || 0)),
        remitente_nombre: String(fila[mapeo.remitente_nombre] || ''),
        remitente_passport: String(fila[mapeo.remitente_passport] || ''),
        destinatario_nombre: String(fila[mapeo.destinatario_nombre] || ''),
        destinatario_identificacion: String(fila[mapeo.destinatario_identificacion] || ''),
        destinatario_telefono: String(fila[mapeo.destinatario_telefono] || ''),
        destinatario_direccion: String(fila[mapeo.destinatario_direccion] || ''),
        cobrado_origen: this.convertirBooleano(fila[mapeo.cobrado_origen]),
        unidad_destino: String(fila[mapeo.unidad_destino] || ''),
        id_cliente: clienteId,
        estado: EstadoEnvio.PENDIENTE,
        awb: null,
        volumen: 0,
        prioridad: 'normal' as const,
        fecha_limite: null,
        fecha_asignacion: null,
        fecha_entrega_real: null,
        incidencia: null,
        firma_digital: null,
        foto_evidencia: null,
        importe_aduana: null,
        numero_factura_aduana: null,
        fecha_ultima_consulta_aduana: null,
        intentos_consulta_aduana: 0,
        estado_aduana: 'pendiente' as const,
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