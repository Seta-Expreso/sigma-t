/**
 * @fileoverview Controlador de Envíos
 * @module controllers/envio
 */

import type { Request, Response, NextFunction } from 'express';
import type { EnvioService } from '../services/envio.service.js';
import type { ImportacionService } from '../services/importacion.service.js';
import type { Envio } from '../models/envio.model.js';

export class EnvioController {
  private envioService: EnvioService;
  private importacionService: ImportacionService;

  constructor(envioService: EnvioService, importacionService: ImportacionService) {
    this.envioService = envioService;
    this.importacionService = importacionService;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const envioData: Partial<Envio> = req.body;
      const resultado = await this.envioService.create(envioData);
      res.status(201).json({
        success: true,
        data: resultado,
        message: 'Envío creado exitosamente',
      });
    } catch (error) {
      next(error as Error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filtros = req.query;
      const resultado = await this.envioService.findAll(filtros);
      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resultado = await this.envioService.findById(id);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
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

  async findByHouse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const house = req.params.house;
      const resultado = await this.envioService.findByHouse(house);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const envioData: Partial<Envio> = req.body;
      const resultado = await this.envioService.update(id, envioData);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resultado,
        message: 'Envío actualizado exitosamente',
      });
    } catch (error) {
      next(error as Error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resultado = await this.envioService.delete(id);

      if (!resultado) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error as Error);
    }
  }

  async getEstadisticas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resultado = await this.envioService.getEstadisticas();
      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }

  async importarManifiesto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const file = req.file;
      let mapeo: Record<string, string> | null = null;

      if (req.body.mapeo) {
        try {
          mapeo = JSON.parse(req.body.mapeo) as Record<string, string>;
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
}