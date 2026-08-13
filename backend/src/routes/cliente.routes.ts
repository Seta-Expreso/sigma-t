/**
 * @fileoverview Rutas para la gestión de clientes
 * @module routes/cliente
 */

import { Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();

// Rutas públicas (dentro del módulo)
// Usamos funciones flecha para mantener el contexto de `this`
router.get('/', (req, res) => ClienteController.getAll(req, res));
router.get('/buscar', (req, res) => ClienteController.search(req, res));
router.get('/:id', (req, res) => ClienteController.getById(req, res));
router.post('/', (req, res) => ClienteController.create(req, res));
router.put('/:id', (req, res) => ClienteController.update(req, res));
router.delete('/:id', (req, res) => ClienteController.delete(req, res));

export default router;