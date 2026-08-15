/**
 * @fileoverview Rutas para la gestión de envíos
 * @module routes/envio
 */

import { Router } from 'express';
import { EnvioController } from '../controllers/envio.controller.js';

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
router.get('/', EnvioController.getAll);

/**
 * GET /api/envios/estadisticas
 * @description Obtiene estadísticas de envíos
 * @param {number} clienteId - Filtrar por cliente (query param, opcional)
 * @returns {Object} Estadísticas de envíos
 */
router.get('/estadisticas', EnvioController.getEstadisticas);

/**
 * GET /api/envios/house/:house
 * @description Obtiene un envío por su número de House
 * @param {string} house - Número de House (path param)
 * @returns {Object} Datos del envío
 */
router.get('/house/:house', EnvioController.getByHouse);

/**
 * GET /api/envios/cliente/:id/historial
 * @description Obtiene el historial de envíos de un cliente
 * @param {number} id - ID del cliente (path param)
 * @returns {Object} Lista de envíos del cliente
 */
router.get('/cliente/:id/historial', EnvioController.getHistorialByCliente);

/**
 * GET /api/envios/:id
 * @description Obtiene un envío por su ID
 * @param {number} id - ID del envío (path param)
 * @returns {Object} Datos del envío
 */
router.get('/:id', EnvioController.getById);

/**
 * POST /api/envios
 * @description Crea un nuevo envío manualmente
 * @param {Object} body - Datos del envío
 * @returns {Object} Envío creado
 */
router.post('/', EnvioController.create);

/**
 * PUT /api/envios/:id
 * @description Actualiza un envío existente
 * @param {number} id - ID del envío (path param)
 * @param {Object} body - Datos a actualizar
 * @returns {Object} Envío actualizado
 */
router.put('/:id', EnvioController.update);

/**
 * PATCH /api/envios/:id/estado
 * @description Actualiza el estado de un envío
 * @param {number} id - ID del envío (path param)
 * @param {Object} body - { estado: string, incidencia?: string }
 * @returns {Object} Envío actualizado
 */
router.patch('/:id/estado', EnvioController.updateEstado);

/**
 * DELETE /api/envios/:id
 * @description Elimina un envío
 * @param {number} id - ID del envío (path param)
 * @returns {Object} Confirmación de eliminación
 */
router.delete('/:id', EnvioController.delete);

export default router;