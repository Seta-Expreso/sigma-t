/**
 * @fileoverview Rutas para la gestión de envíos
 * @module routes/envio
 */

import { Router, Request, Response } from 'express';
import { EnvioController } from '../controllers/envio.controller';

const router = Router();

/**
 * GET /api/envios
 * @description Obtiene todos los envíos con filtros opcionales
 * @param {string} estado - Filtrar por estado (query param)
 * @param {number} clienteId - Filtrar por cliente (query param)
 * @param {string} fechaInicio - Fecha de inicio (query param)
 * @param {string} fechaFin - Fecha de fin (query param)
 * @param {string} search - Búsqueda por texto (query param)
 * @returns {Object} Lista de envíos
 */
router.get('/', (req: Request, res: Response) => {
  void EnvioController.getAll(req, res);
});

/**
 * GET /api/envios/estadisticas
 * @description Obtiene estadísticas de envíos
 * @param {number} clienteId - Filtrar por cliente (query param, opcional)
 * @returns {Object} Estadísticas de envíos
 */
router.get('/estadisticas', (req: Request, res: Response) => {
  void EnvioController.getEstadisticas(req, res);
});

/**
 * GET /api/envios/house/:house
 * @description Obtiene un envío por su número de House
 * @param {string} house - Número de House (path param)
 * @returns {Object} Datos del envío
 */
router.get('/house/:house', (req: Request, res: Response) => {
  void EnvioController.getByHouse(req, res);
});

/**
 * GET /api/envios/cliente/:id/historial
 * @description Obtiene el historial de envíos de un cliente
 * @param {number} id - ID del cliente (path param)
 * @returns {Object} Lista de envíos del cliente
 */
router.get('/cliente/:id/historial', (req: Request, res: Response) => {
  void EnvioController.getHistorialByCliente(req, res);
});

/**
 * GET /api/envios/:id
 * @description Obtiene un envío por su ID
 * @param {number} id - ID del envío (path param)
 * @returns {Object} Datos del envío
 */
router.get('/:id', (req: Request, res: Response) => {
  void EnvioController.getById(req, res);
});

/**
 * POST /api/envios
 * @description Crea un nuevo envío manualmente
 * @param {Object} body - Datos del envío
 * @returns {Object} Envío creado
 */
router.post('/', (req: Request, res: Response) => {
  void EnvioController.create(req, res);
});

/**
 * PUT /api/envios/:id
 * @description Actualiza un envío existente
 * @param {number} id - ID del envío (path param)
 * @param {Object} body - Datos a actualizar
 * @returns {Object} Envío actualizado
 */
router.put('/:id', (req: Request, res: Response) => {
  void EnvioController.update(req, res);
});

/**
 * PATCH /api/envios/:id/estado
 * @description Actualiza el estado de un envío
 * @param {number} id - ID del envío (path param)
 * @param {Object} body - { estado: string, incidencia?: string }
 * @returns {Object} Envío actualizado
 */
router.patch('/:id/estado', (req: Request, res: Response) => {
  void EnvioController.updateEstado(req, res);
});

/**
 * DELETE /api/envios/:id
 * @description Elimina un envío
 * @param {number} id - ID del envío (path param)
 * @returns {Object} Confirmación de eliminación
 */
router.delete('/:id', (req: Request, res: Response) => {
  void EnvioController.delete(req, res);
});

export default router;