/**
 * @fileoverview Controlador de Importación de Manifiestos
 * @module controllers/importacion
 */

import { Request, Response, NextFunction } from 'express';
import { ImportacionService } from '../services/importacion.service.js';

export class ImportacionController {
  private importacionService: ImportacionService;

  constructor() {
    this.importacionService = new ImportacionService();
  }

  /**
   * Importar manifiesto desde Excel/CSV
   */
  async importarManifiesto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file;
      const mapeo = req.body.mapeo ? JSON.parse(req.body.mapeo) : null;

      if (!file) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó ningún archivo',
        });
        return;
      }

      const resultado = await this.importacionService.importarManifiesto(file, mapeo);

      res.status(200).json({
        success: true,
        data: resultado,
        message: `Importación completada: ${resultado.importados} envíos importados`,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Obtener vista previa de importación
   */
  async vistaPrevia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file;
      const mapeo = req.body.mapeo ? JSON.parse(req.body.mapeo) : null;

      if (!file) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó ningún archivo',
        });
        return;
      }

      const resultado = await this.importacionService.vistaPrevia(file, mapeo);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Obtener reporte de errores de importación
   */
  async reporteErrores(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { archivoId } = req.params;
      const resultado = await this.importacionService.obtenerReporteErrores(archivoId);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }
}