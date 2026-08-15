/**
 * @fileoverview Controlador de Importación de Manifiestos
 * @module controllers/importacion
 */

import type { Request, Response, NextFunction } from 'express';
import { ImportacionService } from '../services/importacion.service.js';

export class ImportacionController {
  private importacionService: ImportacionService;

  constructor() {
    this.importacionService = new ImportacionService();
  }

  async importarManifiesto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file;
      let mapeo: Record<string, string> | null = null;

      if (req.body.mapeo) {
        try {
          const mapeoData = req.body.mapeo;
          mapeo = typeof mapeoData === 'string' ? JSON.parse(mapeoData) : (mapeoData as Record<string, string>);
        } catch {
          res.status(400).json({
            success: false,
            message: 'El mapeo debe ser un JSON válido',
          });
          return;
        }
      }

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

  // ✅ Eliminar async porque no hay await
  vistaPrevia(req: Request, res: Response, next: NextFunction): void {
    try {
      const file = req.file;
      let mapeo: Record<string, string> | null = null;

      if (req.body.mapeo) {
        try {
          const mapeoData = req.body.mapeo;
          mapeo = typeof mapeoData === 'string' ? JSON.parse(mapeoData) : (mapeoData as Record<string, string>);
        } catch {
          res.status(400).json({
            success: false,
            message: 'El mapeo debe ser un JSON válido',
          });
          return;
        }
      }

      if (!file) {
        res.status(400).json({
          success: false,
          message: 'No se proporcionó ningún archivo',
        });
        return;
      }

      const resultado = this.importacionService.vistaPrevia(file, mapeo);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  // ✅ Eliminar async porque no hay await
  reporteErrores(req: Request, res: Response, next: NextFunction): void {
    try {
      const { archivoId } = req.params;
      const resultado = this.importacionService.obtenerReporteErrores(archivoId);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }
}