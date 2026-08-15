/**
 * @fileoverview Controlador para la gestión de envíos
 * @module controllers/envio
 */

import type { Request, Response } from 'express';
import { EnvioService } from '../services/envio.service.js';
import { EstadoEnvio } from '../models/envio.model.js';
import type { EnvioCreateData, EnvioUpdateData } from '../models/envio.model.js';
import winston from 'winston';

// Configurar logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const envioService = new EnvioService();

/**
 * Controlador para la gestión de envíos
 * @class EnvioController
 */
export class EnvioController {
  /**
   * Obtiene todos los envíos con filtros opcionales
   * @route GET /api/envios
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { estado, clienteId, fechaInicio, fechaFin, search } = req.query;

      const filters = {
        estado: estado as EstadoEnvio,
        clienteId: clienteId ? parseInt(clienteId as string) : undefined,
        fechaInicio: fechaInicio ? new Date(fechaInicio as string) : undefined,
        fechaFin: fechaFin ? new Date(fechaFin as string) : undefined,
        search: search as string,
      };

      const envios = await envioService.findAll(filters);
      res.status(200).json({
        success: true,
        data: envios,
        total: envios.length,
      });
    } catch (error) {
      logger.error('Error al obtener envíos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los envíos',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene un envío por su ID
   * @route GET /api/envios/:id
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const envio = await envioService.findById(id);
      if (!envio) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: envio,
      });
    } catch (error) {
      logger.error('Error al obtener envío:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el envío',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene un envío por su número de House
   * @route GET /api/envios/house/:house
   */
  static async getByHouse(req: Request, res: Response): Promise<void> {
    try {
      const { house } = req.params;
      const envio = await envioService.findByHouse(house);
      if (!envio) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: envio,
      });
    } catch (error) {
      logger.error('Error al obtener envío por House:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el envío',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Crea un nuevo envío manualmente
   * @route POST /api/envios
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body as EnvioCreateData;

      const envio = await envioService.create(body);
      res.status(201).json({
        success: true,
        message: 'Envío creado exitosamente',
        data: envio,
      });
    } catch (error) {
      logger.error('Error al crear envío:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear el envío',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Actualiza un envío existente
   * @route PUT /api/envios/:id
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const body = req.body as EnvioUpdateData;

      const envio = await envioService.update(id, body);
      if (!envio) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Envío actualizado exitosamente',
        data: envio,
      });
    } catch (error) {
      logger.error('Error al actualizar envío:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el envío',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Elimina un envío (eliminación física)
   * @route DELETE /api/envios/:id
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const result = await envioService.delete(id);
      if (!result) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Envío eliminado exitosamente',
      });
    } catch (error) {
      logger.error('Error al eliminar envío:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el envío',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Actualiza el estado de un envío
   * @route PATCH /api/envios/:id/estado
   */
  static async updateEstado(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      // ✅ CORREGIDO: Tipar el destructuring de req.body
      const { estado, incidencia } = req.body as {
        estado: EstadoEnvio;
        incidencia?: string
      };

      if (!estado || !Object.values(EstadoEnvio).includes(estado as EstadoEnvio)) {
        res.status(400).json({
          success: false,
          message: 'Estado inválido',
        });
        return;
      }

      const envio = await envioService.updateEstado(id, estado as EstadoEnvio, incidencia as string);
      if (!envio) {
        res.status(404).json({
          success: false,
          message: 'Envío no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Estado del envío actualizado',
        data: envio,
      });
    } catch (error) {
      logger.error('Error al actualizar estado del envío:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el estado del envío',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene estadísticas de envíos
   * @route GET /api/envios/estadisticas
   */
  static async getEstadisticas(req: Request, res: Response): Promise<void> {
    try {
      const clienteId = req.query.clienteId ? parseInt(req.query.clienteId as string) : undefined;
      const estadisticas = await envioService.getEstadisticas(clienteId);

      res.status(200).json({
        success: true,
        data: estadisticas,
      });
    } catch (error) {
      logger.error('Error al obtener estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene el historial de envíos de un cliente
   * @route GET /api/envios/cliente/:id/historial
   */
  static async getHistorialByCliente(req: Request, res: Response): Promise<void> {
    try {
      const clienteId = parseInt(req.params.id);
      if (isNaN(clienteId)) {
        res.status(400).json({
          success: false,
          message: 'ID de cliente inválido',
        });
        return;
      }

      const historial = await envioService.getHistorialByCliente(clienteId);
      res.status(200).json({
        success: true,
        data: historial,
        total: historial.length,
      });
    } catch (error) {
      logger.error('Error al obtener historial del cliente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el historial del cliente',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}