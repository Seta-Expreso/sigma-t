/**
 * @fileoverview Punto de entrada de la aplicación backend SIGMA-T
 * @module app
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import winston from 'winston';

// Cargar variables de entorno
dotenv.config();

// Configurar logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Crear aplicación Express
const app: Express = express();
const port = process.env.API_PORT || 3000;

// Middlewares de seguridad
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por IP
  message: 'Demasiadas peticiones desde esta IP, intente de nuevo más tarde.',
});
app.use('/api', limiter);

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'sigma-t-backend',
    version: '0.1.0',
  });
});

// Ruta de prueba
app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    message: 'API SIGMA-T funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// Iniciar servidor
app.listen(port, () => {
  logger.info(`🚀 Servidor SIGMA-T backend iniciado en puerto ${port}`);
  logger.info(`📊 Health check disponible en http://localhost:${port}/health`);
  logger.info(`🧪 Test endpoint disponible en http://localhost:${port}/api/test`);
});

export default app;