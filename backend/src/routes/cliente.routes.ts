/**
 * @fileoverview Rutas para la gestión de clientes
 * @module routes/cliente
 */

import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller.js';

const router = Router();

/**
 * GET /api/clientes
 * @description Obtiene todos los clientes activos
 * @returns {Object} Lista de clientes
 */
router.get('/', ClienteController.getAll);

/**
 * GET /api/clientes/buscar
 * @description Busca clientes por término
 * @param {string} q - Término de búsqueda (query param)
 * @returns {Object} Lista de clientes que coinciden
 */
router.get('/buscar', ClienteController.search);

/**
 * GET /api/clientes/:id
 * @description Obtiene un cliente por su ID
 * @param {number} id - ID del cliente (path param)
 * @returns {Object} Datos del cliente
 */
router.get('/:id', ClienteController.getById);

/**
 * POST /api/clientes
 * @description Crea un nuevo cliente
 * @param {Object} body - Datos del cliente
 * @returns {Object} Cliente creado
 */
router.post('/', ClienteController.create);

/**
 * PUT /api/clientes/:id
 * @description Actualiza un cliente existente
 * @param {number} id - ID del cliente (path param)
 * @param {Object} body - Datos a actualizar
 * @returns {Object} Cliente actualizado
 */
router.put('/:id', ClienteController.update);

/**
 * DELETE /api/clientes/:id
 * @description Elimina un cliente (desactivación lógica)
 * @param {number} id - ID del cliente (path param)
 * @returns {Object} Confirmación de eliminación
 */
router.delete('/:id', ClienteController.delete);

export default router;