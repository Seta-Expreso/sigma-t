/**
 * @fileoverview Rutas para la importación de manifiestos
 * @module routes/importacion
 */

import { Router, Request, Response } from 'express';
import { ImportacionController } from '../controllers/importacion.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configurar multer para guardar archivos temporales
const uploadDir = path.join(__dirname, '../../uploads/temp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.xlsx' || ext === '.xls') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos Excel (.xlsx, .xls)'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const router = Router();

router.post(
  '/columnas',
  upload.single('file'),
  (req: Request, res: Response) => {
    void ImportacionController.getColumnas(req, res);
  }
);

router.post(
  '/vista-previa',
  upload.single('file'),
  (req: Request, res: Response) => {
    void ImportacionController.getVistaPrevia(req, res);
  }
);

router.post(
  '/importar',
  upload.single('file'),
  (req: Request, res: Response) => {
    void ImportacionController.importar(req, res);
  }
);

export default router;