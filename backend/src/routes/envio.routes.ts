/**
 * @fileoverview Rutas de Envíos
 * @module routes/envio
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Router } from 'express';
import { EnvioController } from '../controllers/envio.controller.js';
import { ImportacionController } from '../controllers/importacion.controller.js';
import { EnvioService } from '../services/envio.service.js';
import { ImportacionService } from '../services/importacion.service.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

const envioService = new EnvioService();
const importacionService = new ImportacionService();
const envioController = new EnvioController(envioService, importacionService);
const importacionController = new ImportacionController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Importar manifiesto
router.post('/importar', upload.single('file'), (req, res, next) => {
  void envioController.importarManifiesto(req, res, next);
});

// Vista previa de importación
router.post('/vista-previa', upload.single('file'), (req, res, next) => {
  void importacionController.vistaPrevia(req, res, next);
});

// CRUD de envíos
router.post('/', (req, res, next) => {
  void envioController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  void envioController.findAll(req, res, next);
});

router.get('/buscar/:house', (req, res, next) => {
  void envioController.findByHouse(req, res, next);
});

router.get('/estadisticas', (req, res, next) => {
  void envioController.getEstadisticas(req, res, next);
});

router.get('/:id', (req, res, next) => {
  void envioController.findById(req, res, next);
});

router.put('/:id', (req, res, next) => {
  void envioController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  void envioController.delete(req, res, next);
});

export default router;

/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-argument */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */