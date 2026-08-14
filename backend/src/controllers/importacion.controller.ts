/**
 * @fileoverview Controlador para importación de manifiestos
 * @module controllers/importacion
 */

import { Request, Response } from 'express';
import { ImportacionService } from '../services/importacion.service';
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

const importacionService = new ImportacionService();

export class ImportacionController {
  /**
   * Importa envíos desde un archivo Excel
   * @route POST /api/importacion/excel
   */
  static async importarExcel(req: Request, res: Response): Promise<void> {
    try {
      // Verificar que se haya subido un archivo
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No se ha subido ningún archivo',
        });
        return;
      }

      // Verificar que sea un Excel
      const fileExt = req.file.originalname.split('.').pop()?.toLowerCase();
      if (!['xlsx', 'xls'].includes(fileExt || '')) {
        res.status(400).json({
          success: false,
          message: 'El archivo debe ser un Excel (.xlsx o .xls)',
        });
        return;
      }

      // Obtener clienteId del body
      const { clienteId } = req.body;
      if (!clienteId) {
        res.status(400).json({
          success: false,
          message: 'El campo clienteId es obligatorio',
        });
        return;
      }

      const clienteIdNum = parseInt(clienteId);
      if (isNaN(clienteIdNum)) {
        res.status(400).json({
          success: false,
          message: 'clienteId debe ser un número válido',
        });
        return;
      }

      // Procesar la importación
      const resultado = await importacionService.importarDesdeExcel(req.file.buffer, clienteIdNum);

      res.status(200).json({
        success: true,
        data: {
          total: resultado.total,
          importados: resultado.importados,
          errores: resultado.errores,
          envios: resultado.envios,
        },
        message: resultado.success
          ? 'Todos los envíos fueron importados correctamente'
          : `Se importaron ${resultado.importados} de ${resultado.total} envíos. ${resultado.errores.length} errores encontrados.`,
      });
    } catch (error) {
      logger.error('Error al importar Excel:', error);
      res.status(500).json({
        success: false,
        message: 'Error al importar el archivo Excel',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene el formato esperado del Excel
   * @route GET /api/importacion/formato
   */
  static async getFormato(req: Request, res: Response): Promise<void> {
    try {
      const formato = {
        columnas: [
          { nombre: 'House', requerido: true, ejemplo: 'CACC-24014926' },
          { nombre: 'AWB', requerido: false, ejemplo: '230-66684660' },
          { nombre: 'Naturaleza y Cantidad', requerido: false, ejemplo: 'CAJA MISCELANEAS' },
          { nombre: 'Peso (Kg)', requerido: true, ejemplo: '30.0' },
          { nombre: 'Bultos (Cant.)', requerido: false, ejemplo: '1' },
          { nombre: 'Remitente', requerido: false, ejemplo: 'EXSY ISABEL FONSECA' },
          { nombre: 'Passport', requerido: false, ejemplo: '65082578945' },
          { nombre: 'Destinatario', requerido: true, ejemplo: 'ANILEX MARIAM PEREZ FONSECA' },
          { nombre: 'Carnet de Identidad', requerido: false, ejemplo: '94092140098' },
          { nombre: 'Teléfono del DESTINATARIO', requerido: false, ejemplo: '54771705 / 54771705' },
          { nombre: 'Dirección del DESTINATARIO', requerido: true, ejemplo: 'CALLE VICENTE SOMONTE # 16' },
          { nombre: 'Cobrado/No Cobrado', requerido: false, ejemplo: '2' },
          { nombre: 'Unidad de destino', requerido: false, ejemplo: 'CMW' },
        ],
      };

      res.status(200).json({
        success: true,
        data: formato,
      });
    } catch (error) {
      logger.error('Error al obtener formato:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el formato',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}