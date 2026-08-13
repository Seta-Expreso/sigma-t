/**
 * @fileoverview Rutas para la gestión de clientes
 * @module routes/cliente
 */

import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();

// Rutas públicas (dentro del módulo)
// Usamos un wrapper para manejar las promesas correctamente
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(ClienteController.getAll));
router.get('/buscar', asyncHandler(ClienteController.search));
router.get('/:id', asyncHandler(ClienteController.getById));
router.post('/', asyncHandler(ClienteController.create));
router.put('/:id', asyncHandler(ClienteController.update));
router.delete('/:id', asyncHandler(ClienteController.delete));

export default router;