/**
 * @fileoverview Rutas de Envíos
 * @module routes/envio
 */

import { Router } from 'express';
import { EnvioController } from '../controllers/envio.controller.js';
import { EnvioService } from '../services/envio.service.js';
import { ImportacionService } from '../services/importacion.service.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const envioService = new EnvioService();
const importacionService = new ImportacionService();
const envioController = new EnvioController(envioService, importacionService);

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Importar manifiesto
router.post('/importar', upload.single('file'), (req, res, next) => {
  envioController.importarManifiesto(req, res, next);
});

// CRUD de envíos
router.post('/', (req, res, next) => {
  envioController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  envioController.findAll(req, res, next);
});

router.get('/buscar/:house', (req, res, next) => {
  envioController.findByHouse(req, res, next);
});

router.get('/estadisticas', (req, res, next) => {
  envioController.getEstadisticas(req, res, next);
});

router.get('/:id', (req, res, next) => {
  envioController.findById(req, res, next);
});

router.put('/:id', (req, res, next) => {
  envioController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  envioController.delete(req, res, next);
});

export default router;