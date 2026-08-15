/**
 * @fileoverview Controlador para la gestión de clientes
 * @module controllers/cliente
 */

import { Request, Response } from 'express';
import { ClienteService } from '../services/cliente.service';
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

const clienteService = new ClienteService();

/** Datos de cliente para operaciones de creación/actualización */
interface ClienteData {
  nombre_empresa?: string;
  contacto_nombre?: string;
  contacto_telefono?: string;
  contacto_email?: string;
  tarifa_preferencial?: number;
  activo?: boolean;
}

/**
 * Controlador para la gestión de clientes
 * @class ClienteController
 */
export class ClienteController {
  /**
   * Obtiene todos los clientes activos
   * @route GET /api/clientes
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con lista de clientes
   * @example
   * GET /api/clientes
   * Response: { success: true, data: [...], total: 10 }
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const clientes = await clienteService.findAll();
      res.status(200).json({
        success: true,
        data: clientes,
        total: clientes.length,
      });
    } catch (error) {
      logger.error('Error al obtener clientes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los clientes',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Obtiene un cliente por su ID
   * @route GET /api/clientes/:id
   * @param {Request} req - Express request object con id en params
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con el cliente encontrado
   * @example
   * GET /api/clientes/1
   * Response: { success: true, data: { id: 1, nombre_empresa: 'CAC' } }
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

      const cliente = await clienteService.findById(id);
      if (!cliente) {
        res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      logger.error('Error al obtener cliente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el cliente',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Crea un nuevo cliente
   * @route POST /api/clientes
   * @param {Request} req - Express request object con datos del cliente
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con el cliente creado
   * @example
   * POST /api/clientes
   * Body: { nombre_empresa: 'CAC', contacto_nombre: 'Juan' }
   * Response: { success: true, data: { id: 1, ... } }
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body as ClienteData;

      const clienteData = {
        nombre_empresa: body.nombre_empresa,
        contacto_nombre: body.contacto_nombre,
        contacto_telefono: body.contacto_telefono,
        contacto_email: body.contacto_email,
        tarifa_preferencial: body.tarifa_preferencial,
        activo: body.activo !== undefined ? body.activo : true,
      } as Partial<Cliente>;

      const cliente = await clienteService.create(clienteData);
      res.status(201).json({
        success: true,
        message: 'Cliente creado exitosamente',
        data: cliente,
      });
    } catch (error) {
      logger.error('Error al crear cliente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear el cliente',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Actualiza un cliente existente
   * @route PUT /api/clientes/:id
   * @param {Request} req - Express request object con id en params y datos en body
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con el cliente actualizado
   * @example
   * PUT /api/clientes/1
   * Body: { nombre_empresa: 'CAC Updated' }
   * Response: { success: true, data: { ... } }
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

      const body = req.body as ClienteData;

      const clienteData = {
        nombre_empresa: body.nombre_empresa,
        contacto_nombre: body.contacto_nombre,
        contacto_telefono: body.contacto_telefono,
        contacto_email: body.contacto_email,
        tarifa_preferencial: body.tarifa_preferencial,
        activo: body.activo,
      } as Partial<Cliente>;

      const cliente = await clienteService.update(id, clienteData);
      if (!cliente) {
        res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cliente actualizado exitosamente',
        data: cliente,
      });
    } catch (error) {
      logger.error('Error al actualizar cliente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el cliente',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Elimina un cliente (desactivación lógica)
   * @route DELETE /api/clientes/:id
   * @param {Request} req - Express request object con id en params
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta de confirmación
   * @example
   * DELETE /api/clientes/1
   * Response: { success: true, message: 'Cliente eliminado exitosamente' }
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

      const result = await clienteService.delete(id);
      if (!result) {
        res.status(404).json({
          success: false,
          message: 'Cliente no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cliente eliminado exitosamente',
      });
    } catch (error) {
      logger.error('Error al eliminar cliente:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el cliente',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * Busca clientes por término de búsqueda
   * @route GET /api/clientes/buscar
   * @param {Request} req - Express request object con query param 'q'
   * @param {Response} res - Express response object
   * @returns {Promise<void>} Respuesta con lista de clientes que coinciden
   * @example
   * GET /api/clientes/buscar?q=CAC
   * Response: { success: true, data: [...], total: 5 }
   */
  static async search(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          message: 'El parámetro de búsqueda es requerido',
        });
        return;
      }

      const clientes = await clienteService.search(q);
      res.status(200).json({
        success: true,
        data: clientes,
        total: clientes.length,
      });
    } catch (error) {
      logger.error('Error al buscar clientes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar clientes',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}