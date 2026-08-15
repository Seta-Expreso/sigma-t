/**
 * @fileoverview Rutas para la gestión de clientes
 * @module routes/cliente
 */

import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();

/**
 * GET /api/clientes
 * @description Obtiene todos los clientes activos
 * @returns {Object} Lista de clientes
 */
router.get('/', (req: Request, res: Response) => {
  void ClienteController.getAll(req, res);
});

/**
 * GET /api/clientes/buscar
 * @description Busca clientes por término
 * @param {string} q - Término de búsqueda (query param)
 * @returns {Object} Lista de clientes que coinciden
 */
router.get('/buscar', (req: Request, res: Response) => {
  void ClienteController.search(req, res);
});

/**
 * GET /api/clientes/:id
 * @description Obtiene un cliente por su ID
 * @param {number} id - ID del cliente (path param)
 * @returns {Object} Datos del cliente
 */
router.get('/:id', (req: Request, res: Response) => {
  void ClienteController.getById(req, res);
});

/**
 * POST /api/clientes
 * @description Crea un nuevo cliente
 * @param {Object} body - Datos del cliente
 * @returns {Object} Cliente creado
 */
router.post('/', (req: Request, res: Response) => {
  void ClienteController.create(req, res);
});

/**
 * PUT /api/clientes/:id
 * @description Actualiza un cliente existente
 * @param {number} id - ID del cliente (path param)
 * @param {Object} body - Datos a actualizar
 * @returns {Object} Cliente actualizado
 */
router.put('/:id', (req: Request, res: Response) => {
  void ClienteController.update(req, res);
});

/**
 * DELETE /api/clientes/:id
 * @description Elimina un cliente (desactivación lógica)
 * @param {number} id - ID del cliente (path param)
 * @returns {Object} Confirmación de eliminación
 */
router.delete('/:id', (req: Request, res: Response) => {
  void ClienteController.delete(req, res);
});

export default router;