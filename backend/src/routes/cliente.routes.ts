/**
 * @fileoverview Rutas para la gestión de clientes
 * @module routes/cliente
 */

import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();

// Usamos funciones flecha que llaman a los controladores
// Esto mantiene el contexto y maneja las promesas correctamente
router.get('/', (req: Request, res: Response) => {
  void ClienteController.getAll(req, res);
});

router.get('/buscar', (req: Request, res: Response) => {
  void ClienteController.search(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
  void ClienteController.getById(req, res);
});

router.post('/', (req: Request, res: Response) => {
  void ClienteController.create(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
  void ClienteController.update(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
  void ClienteController.delete(req, res);
});

export default router;