/**
 * @fileoverview Rutas para importación de manifiestos
 * @module routes/importacion
 */

import { Router, Request, Response } from 'express';
import multer from 'multer';
import { ImportacionController } from '../controllers/importacion.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Obtener formato esperado
router.get('/formato', (req: Request, res: Response) => {
  void ImportacionController.getFormato(req, res);
});

// Importar Excel
router.post('/excel', upload.single('file'), (req: Request, res: Response) => {
  void ImportacionController.importarExcel(req, res);
});

export default router;