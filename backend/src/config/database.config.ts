/**
 * @fileoverview Configuración de TypeORM para la conexión a PostgreSQL
 * @module config/database
 */

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Cliente } from '../models/cliente.model.js';
import { Envio } from '../models/envio.model.js';
import winston from 'winston';

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

/**
 * Configuración de la conexión a PostgreSQL
 *
 * @remarks
 * - En desarrollo: synchronize: true (crea/actualiza tablas automáticamente)
 * - En producción: synchronize: false (usar migraciones)
 *
 * @see https://typeorm.io/migrations
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '', // ⚠️ DEBE configurarse en .env
  database: process.env.DB_NAME || 'sigma_t',
  synchronize: process.env.NODE_ENV !== 'production', // Solo desarrollo
  logging: process.env.NODE_ENV === 'development',
  entities: [Cliente, Envio],
  subscribers: [],
  migrations: [],
});

// Validación de configuración en producción
if (process.env.NODE_ENV === 'production') {
  if (!process.env.DB_PASSWORD) {
    logger.error('❌ ERROR CRÍTICO: DB_PASSWORD no está configurada en .env');
    logger.error('   El servidor no puede iniciar sin una contraseña de base de datos segura.');
    process.exit(1);
  }

  if (!process.env.DB_USER || !process.env.DB_HOST) {
    logger.warn('⚠️ ADVERTENCIA: DB_USER o DB_HOST no están configurados, usando valores por defecto.');
  }
}

logger.info(`📦 Base de datos: ${process.env.DB_NAME || 'sigma_t'} en ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}`);
logger.info(`🔧 Modo synchronize: ${process.env.NODE_ENV !== 'production' ? 'ACTIVADO (desarrollo)' : 'DESACTIVADO (producción)'}`);