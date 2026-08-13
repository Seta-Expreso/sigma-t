/**
 * @fileoverview Rutas para la gestión de envíos
 * @module routes/envio
 */

import { Router, Request, Response } from 'express';
import { EnvioController } from '../controllers/envio.controller';

const router = Router();

// Usamos funciones flecha que llaman a los controladores
// Esto mantiene el contexto y maneja las promesas correctamente
router.get('/', (req: Request, res: Response) => {
  void EnvioController.getAll(req, res);
});

router.get('/estadisticas', (req: Request, res: Response) => {
  void EnvioController.getEstadisticas(req, res);
});

router.get('/house/:house', (req: Request, res: Response) => {
  void EnvioController.getByHouse(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
  void EnvioController.getById(req, res);
});

router.post('/', (req: Request, res: Response) => {
  void EnvioController.create(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
  void EnvioController.update(req, res);
});

router.patch('/:id/estado', (req: Request, res: Response) => {
  void EnvioController.updateEstado(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
  void EnvioController.delete(req, res);
});

export default router;