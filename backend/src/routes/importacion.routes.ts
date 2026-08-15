/**
 * @fileoverview Rutas para la importación de manifiestos
 * @module routes/importacion
 */

import { Router } from 'express';
import { ImportacionController } from '../controllers/importacion.controller.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configurar multer para guardar archivos temporales
const uploadDir = path.join(__dirname, '../../uploads/temp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
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

/**
 * POST /api/importacion/columnas
 * @description Obtiene las columnas de un archivo Excel
 * @param {File} file - Archivo Excel (multipart/form-data)
 * @returns {Object} Lista de nombres de columnas
 */
router.post('/columnas', upload.single('file'), ImportacionController.getColumnas);

/**
 * POST /api/importacion/vista-previa
 * @description Obtiene vista previa de los datos con el mapeo seleccionado
 * @param {File} file - Archivo Excel (multipart/form-data)
 * @param {Object} mapeo - Configuración de mapeo de columnas
 * @param {number} clienteId - ID del cliente
 * @returns {Object} Vista previa de los datos
 */
router.post('/vista-previa', upload.single('file'), ImportacionController.getVistaPrevia);

/**
 * POST /api/importacion/importar
 * @description Importa el archivo con el mapeo seleccionado
 * @param {File} file - Archivo Excel (multipart/form-data)
 * @param {Object} mapeo - Configuración de mapeo de columnas
 * @param {number} clienteId - ID del cliente
 * @returns {Object} Resultado de la importación
 */
router.post('/importar', upload.single('file'), ImportacionController.importar);

export default router;