/**
 * @fileoverview Controlador para la gestión de envíos
 * @module controllers/envio
 */

import { Request, Response } from 'express';
import { EnvioService } from '../services/envio.service';
import { EstadoEnvio, PrioridadEnvio, EstadoAduana } from '../models/envio.model';
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

export class EnvioController {
  /**
   * Obtiene todos los envíos con filtros
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
   * Obtiene un envío por ID
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
   * Obtiene un envío por House
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
   * Crea un nuevo envío
   * @route POST /api/envios
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body = req.body;
      
      const envioData = {
        id_cliente: body.id_cliente,
        house: body.house,
        awb: body.awb,
        descripcion: body.descripcion,
        peso: body.peso,
        volumen: body.volumen || 0,
        bultos: body.bultos,
        remitente_nombre: body.remitente_nombre,
        remitente_passport: body.remitente_passport,
        destinatario_nombre: body.destinatario_nombre,
        destinatario_direccion: body.destinatario_direccion,
        destinatario_telefono: body.destinatario_telefono,
        cobrado_origen: body.cobrado_origen || false,
        unidad_destino: body.unidad_destino,
        prioridad: body.prioridad || PrioridadEnvio.NORMAL,
        fecha_limite: body.fecha_limite ? new Date(body.fecha_limite) : undefined,
      } as Partial<Envio>;

      const envio = await envioService.create(envioData);
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body = req.body;
      
      const envioData = {
        id_cliente: body.id_cliente,
        house: body.house,
        awb: body.awb,
        descripcion: body.descripcion,
        peso: body.peso,
        volumen: body.volumen,
        bultos: body.bultos,
        remitente_nombre: body.remitente_nombre,
        remitente_passport: body.remitente_passport,
        destinatario_nombre: body.destinatario_nombre,
        destinatario_direccion: body.destinatario_direccion,
        destinatario_telefono: body.destinatario_telefono,
        cobrado_origen: body.cobrado_origen,
        unidad_destino: body.unidad_destino,
        prioridad: body.prioridad,
        fecha_limite: body.fecha_limite ? new Date(body.fecha_limite) : undefined,
        estado: body.estado,
        incidencia: body.incidencia,
        costo_aduana: body.costo_aduana,
        costo_importacion: body.costo_importacion,
      } as Partial<Envio>;

      const envio = await envioService.update(id, envioData);
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
   * Elimina un envío
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { estado, incidencia } = req.body;

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
}