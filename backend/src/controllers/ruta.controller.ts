/**
 * @fileoverview Controlador de Rutas
 * @module controllers/ruta
 */

import type { Request, Response, NextFunction } from 'express';
import type { RutaService } from '../services/ruta.service.js';
import type { Ruta } from '../models/ruta.model.js';

export class RutaController {
  private rutaService: RutaService;

  constructor(rutaService: RutaService) {
    this.rutaService = rutaService;
  }

  /**
   * Optimizar rutas para una semana
   */
  async optimizarSemana(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fechaInicio, dias = 7 } = req.query;
      const fecha = fechaInicio ? new Date(fechaInicio as string) : new Date();

      const resultado = await this.rutaService.optimizarSemana(fecha, Number(dias));

      res.status(200).json({
        success: true,
        data: resultado,
        message: `Rutas optimizadas para ${dias} días`,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Obtener rutas de una semana
   */
  async getRutasSemana(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fecha } = req.params;
      const fechaObj = new Date(fecha);

      const resultado = await this.rutaService.getRutasSemana(fechaObj);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Obtener detalle de una ruta
   */
  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resultado = await this.rutaService.findById(id);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Asignar ruta a chofer
   */
  async asignarChofer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { id_chofer } = req.body;

      if (!id_chofer) {
        res.status(400).json({
          success: false,
          message: 'Se requiere id_chofer',
        });
        return;
      }

      const resultado = await this.rutaService.asignarChofer(id, Number(id_chofer));

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
        message: 'Chofer asignado exitosamente',
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Actualizar ruta manualmente
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const data: Partial<Ruta> = req.body as Partial<Ruta>;

      const resultado = await this.rutaService.update(id, data);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
        message: 'Ruta actualizada exitosamente',
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Generar manifiesto de ruta
   */
  async generarManifiesto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resultado = await this.rutaService.generarManifiesto(id);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Reoptimizar ruta ante incidencia
   */
  async reoptimizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { envio_id, motivo } = req.body;

      const resultado = await this.rutaService.reoptimizar(id, {
        envio_id: envio_id ? Number(envio_id) : undefined,
        motivo: motivo || 'Reoptimización manual',
      });

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
        message: 'Ruta reoptimizada exitosamente',
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Obtener ficha de costo de una ruta
   */
  async getFichaCosto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resultado = await this.rutaService.getFichaCosto(id);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Exportar ficha de costo a PDF
   */
  async exportarFichaCostoPDF(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const pdf = await this.rutaService.exportarFichaCostoPDF(id);

      if (!pdf) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=ficha-costo-ruta-${id}.pdf`);
      res.send(pdf);
    } catch (error) {
      next(error as Error);
    }
  }

  /**
   * Exportar ficha de costo a CSV
   */
  async exportarFichaCostoCSV(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const csv = await this.rutaService.exportarFichaCostoCSV(id);

      if (!csv) {
        res.status(404).json({
          success: false,
          message: 'Ruta no encontrada',
        });
        return;
      }

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=ficha-costo-ruta-${id}.csv`);
      res.send(csv);
    } catch (error) {
      next(error as Error);
    }
  }
}