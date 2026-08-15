/**
 * @fileoverview Rutas de Rutas
 * @module routes/ruta
 */

import { Router } from 'express';
import { RutaController } from '../controllers/ruta.controller.js';
import { RutaService } from '../services/ruta.service.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

const rutaService = new RutaService();
const rutaController = new RutaController(rutaService);

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Optimización
router.post('/optimizar', (req, res, next) => {
  void rutaController.optimizarSemana(req, res, next);
});

router.get('/semana/:fecha', (req, res, next) => {
  void rutaController.getRutasSemana(req, res, next);
});

// CRUD de rutas
router.get('/:id', (req, res, next) => {
  void rutaController.findById(req, res, next);
});

router.put('/:id', (req, res, next) => {
  void rutaController.update(req, res, next);
});

// Asignación
router.post('/:id/asignar', (req, res, next) => {
  void rutaController.asignarChofer(req, res, next);
});

// Manifiesto
router.get('/:id/manifiesto', (req, res, next) => {
  void rutaController.generarManifiesto(req, res, next);
});

// Reoptimización
router.post('/:id/reoptimizar', (req, res, next) => {
  void rutaController.reoptimizar(req, res, next);
});

// Ficha de costo
router.get('/:id/ficha-costo', (req, res, next) => {
  void rutaController.getFichaCosto(req, res, next);
});

router.get('/:id/ficha-costo/exportar/pdf', (req, res, next) => {
  void rutaController.exportarFichaCostoPDF(req, res, next);
});

router.get('/:id/ficha-costo/exportar/csv', (req, res, next) => {
  void rutaController.exportarFichaCostoCSV(req, res, next);
});

export default router;