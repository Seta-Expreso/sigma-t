/**
 * @fileoverview Rutas para la gestión de clientes
 * @module routes/cliente
 */

import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();

// Rutas públicas (dentro del módulo)
router.get('/', ClienteController.getAll);
router.get('/buscar', ClienteController.search);
router.get('/:id', ClienteController.getById);
router.post('/', ClienteController.create);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);

export default router;