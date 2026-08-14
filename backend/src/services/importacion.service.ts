/**
 * @fileoverview Servicio para importación de manifiestos desde Excel
 * @module services/importacion
 */

import * as XLSX from 'xlsx';
import { EnvioService } from './envio.service';
import { ClienteService } from './cliente.service';
import { PrioridadEnvio } from '../models/envio.model';

const envioService = new EnvioService();
const clienteService = new ClienteService();

export interface ImportResult {
  success: boolean;
  total: number;
  importados: number;
  errores: ImportError[];
  envios: any[];
}

export interface ImportError {
  fila: number;
  house: string;
  error: string;
}

export class ImportacionService {
  /**
   * Importa envíos desde un archivo Excel
   * @param {Buffer} fileBuffer - Buffer del archivo Excel
   * @param {number} clienteId - ID del cliente al que pertenecen los envíos
   * @returns {Promise<ImportResult>} Resultado de la importación
   */
  async importarDesdeExcel(fileBuffer: Buffer, clienteId: number): Promise<ImportResult> {
    const resultado: ImportResult = {
      success: true,
      total: 0,
      importados: 0,
      errores: [],
      envios: [],
    };

    try {
      // Leer el archivo Excel
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet) as any[];

      resultado.total = data.length;

      // Verificar que el cliente existe
      const cliente = await clienteService.findById(clienteId);
      if (!cliente) {
        throw new Error(`Cliente con ID ${clienteId} no encontrado`);
      }

      // Procesar cada fila
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const fila = i + 2; // +2 porque Excel empieza en 1 y tenemos encabezados

        try {
          const envioData = this.mapearFila(row, clienteId);
          const envio = await envioService.create(envioData);
          resultado.importados++;
          resultado.envios.push(envio);
        } catch (error) {
          resultado.errores.push({
            fila,
            house: row['House'] || row['house'] || 'Desconocido',
            error: error instanceof Error ? error.message : 'Error desconocido',
          });
        }
      }

      resultado.success = resultado.errores.length === 0;

      return resultado;
    } catch (error) {
      throw new Error(`Error al procesar el archivo Excel: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Mapea una fila del Excel a un objeto Envio
   * @param {any} row - Fila del Excel
   * @param {number} clienteId - ID del cliente
   * @returns {Partial<Envio>} Datos del envío
   */
  private mapearFila(row: any, clienteId: number): Partial<Envio> {
    // Mapeo de columnas según el manifiesto real
    const house = this.getColumnValue(row, ['House', 'house', 'HOUSE']);
    const awb = this.getColumnValue(row, ['AWB', 'awb', 'Master AWB', 'No. de Master AWB']);
    const descripcion = this.getColumnValue(row, ['Naturaleza y Cantidad', 'naturaleza', 'descripcion', 'Descripción']);
    const peso = parseFloat(this.getColumnValue(row, ['Peso (Kg)', 'peso', 'Peso', 'Peso Kg']) || '0');
    const bultos = parseInt(this.getColumnValue(row, ['Bultos (Cant.)', 'bultos', 'Bultos']) || '1');
    const remitente = this.getColumnValue(row, ['Remitente', 'Nombre y Apellidos del REMITENTE', 'remitente']);
    const passport = this.getColumnValue(row, ['Passport', 'pasaporte', 'Identificación Remitente']);
    const destinatario = this.getColumnValue(row, ['Destinatario', 'Nombre y Apellidos del DESTINATARIO', 'destinatario']);
    const carnet = this.getColumnValue(row, ['Carnet de Identidad', 'carnet', 'Identificación Destinatario']);
    const telefono = this.getColumnValue(row, ['Teléfono del DESTINATARIO', 'telefono', 'Teléfono']);
    const direccion = this.getColumnValue(row, ['Dirección del DESTINATARIO', 'direccion', 'Dirección']);
    const cobrado = this.getColumnValue(row, ['Cobrado/No Cobrado', 'cobrado', 'Cobrado']);
    const unidadDestino = this.getColumnValue(row, ['Unidad de destino', 'unidad', 'Unidad']);

    // Validaciones
    if (!house) {
      throw new Error('El campo House es obligatorio');
    }

    if (!destinatario) {
      throw new Error('El campo Destinatario es obligatorio');
    }

    if (!direccion) {
      throw new Error('El campo Dirección es obligatorio');
    }

    if (isNaN(peso) || peso <= 0) {
      throw new Error(`El peso "${peso}" no es válido. Debe ser un número mayor a 0.`);
    }

    return {
      id_cliente: clienteId,
      house,
      awb: awb || undefined,
      descripcion: descripcion || 'Misceláneas',
      peso,
      bultos: bultos || 1,
      remitente_nombre: remitente || 'Desconocido',
      remitente_passport: passport || undefined,
      destinatario_nombre: destinatario,
      destinatario_direccion: direccion,
      destinatario_telefono: telefono || 'No especificado',
      cobrado_origen: cobrado === '2' || cobrado === 'Si' || cobrado === 'Sí',
      unidad_destino: unidadDestino || undefined,
      prioridad: PrioridadEnvio.NORMAL,
    };
  }

  /**
   * Obtiene el valor de una columna buscando por varios nombres posibles
   * @param {any} row - Fila del Excel
   * @param {string[]} keys - Posibles nombres de la columna
   * @returns {string} Valor encontrado
   */
  private getColumnValue(row: any, keys: string[]): string {
    for (const key of keys) {
      if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
        return String(row[key]).trim();
      }
    }
    return '';
  }
}