/**
 * @fileoverview Controlador para la importación de manifiestos
 * @module controllers/importacion
 */

import type { Request, Response } from 'express';
import { ImportacionService } from '../services/importacion.service.js';
import type { ColumnaMapeo } from '../services/importacion.service.js';
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

/**
 * Controlador para la importación de manifiestos
 * @class ImportacionController
 */
export class ImportacionController {
  /**
   * Obtiene las columnas de un archivo Excel
   * @route POST /api/importacion/columnas
   * @param {Request} req - Express request object con archivo en req.file
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con lista de columnas
   * @example
   * POST /api/importacion/columnas
   * FormData: { file: archivo.xlsx }
   * Response: { success: true, data: ['House', 'Destinatario', ...] }
   */
  static async getColumnas(req: Request, res: Response): Promise<void> {
    try {
      // ✅ CORREGIDO: Tipar file como Express.Multer.File
      const file = req.file as Express.Multer.File | undefined;
      if (!file) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó ningún archivo',
        });
        return;
      }

      const columnas = await importacionService.obtenerColumnas(file.path);
      res.status(200).json({
        success: true,
        data: columnas,
      });
    } catch (error) {
      logger.error('Error al obtener columnas del Excel:', error);
      res.status(500).json({
        success: false,
        message: 'Error al leer el archivo Excel',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene vista previa de los datos con el mapeo seleccionado
   * @route POST /api/importacion/vista-previa
   * @param {Request} req - Express request object con archivo, mapeo y clienteId
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con vista previa de los datos
   * @example
   * POST /api/importacion/vista-previa
   * FormData: { file: archivo.xlsx, mapeo: {...}, clienteId: 1 }
   * Response: { success: true, data: { filas: [...], total: 100, errores: [...] } }
   */
  static async getVistaPrevia(req: Request, res: Response): Promise<void> {
    try {
      // ✅ CORREGIDO: Tipar file como Express.Multer.File
      const file = req.file as Express.Multer.File | undefined;
      const { mapeo, clienteId } = req.body;

      if (!file) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó ningún archivo',
        });
        return;
      }

      if (!mapeo) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó el mapeo de columnas',
        });
        return;
      }

      const mapeoParsed = typeof mapeo === 'string' ? JSON.parse(mapeo) : mapeo;
      const clienteIdParsed = parseInt(clienteId);

      const resultado = await importacionService.obtenerVistaPrevia(
        file.path,
        mapeoParsed as ColumnaMapeo,
        clienteIdParsed
      );

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      logger.error('Error al generar vista previa:', error);
      res.status(500).json({
        success: false,
        message: 'Error al generar la vista previa',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Importa el archivo con el mapeo seleccionado
   * @route POST /api/importacion/importar
   * @param {Request} req - Express request object con archivo, mapeo y clienteId
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con resultado de la importación
   * @example
   * POST /api/importacion/importar
   * FormData: { file: archivo.xlsx, mapeo: {...}, clienteId: 1 }
   * Response: { success: true, data: { total: 100, importados: 95, errores: [...] } }
   */
  static async importar(req: Request, res: Response): Promise<void> {
    try {
      // ✅ CORREGIDO: Tipar file como Express.Multer.File
      const file = req.file as Express.Multer.File | undefined;
      const { mapeo, clienteId } = req.body;

      if (!file) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó ningún archivo',
        });
        return;
      }

      if (!mapeo) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó el mapeo de columnas',
        });
        return;
      }

      const mapeoParsed = typeof mapeo === 'string' ? JSON.parse(mapeo) : mapeo;
      const clienteIdParsed = parseInt(clienteId);

      const resultado = await importacionService.importar(
        file.path,
        mapeoParsed as ColumnaMapeo,
        clienteIdParsed
      );

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      logger.error('Error al importar archivo:', error);
      res.status(500).json({
        success: false,
        message: 'Error al importar el archivo',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}