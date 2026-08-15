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

// ============================================
// ✅ VALIDACIÓN DE CONFIGURACIÓN EN PRODUCCIÓN
// ============================================

if (process.env.NODE_ENV === 'production') {
  // Validación crítica: DB_PASSWORD es obligatoria
  if (!process.env.DB_PASSWORD) {
    logger.error('❌ ERROR CRÍTICO: DB_PASSWORD no está configurada en .env');
    logger.error('   El servidor no puede iniciar sin una contraseña de base de datos segura.');
    logger.error('   Por favor, configure DB_PASSWORD en el archivo .env');
    process.exit(1);
  }

  // Advertencias: otros parámetros con valores por defecto
  if (!process.env.DB_USER) {
    logger.warn('⚠️ ADVERTENCIA: DB_USER no está configurado, usando valor por defecto "admin".');
    logger.warn('   Recomendamos configurar DB_USER en el archivo .env');
  }

  if (!process.env.DB_HOST) {
    logger.warn('⚠️ ADVERTENCIA: DB_HOST no está configurado, usando valor por defecto "localhost".');
    logger.warn('   Recomendamos configurar DB_HOST en el archivo .env');
  }

  // Validación de synchronize en producción (debe estar desactivado)
  if (process.env.synchronize === 'true' || process.env.synchronize === '1') {
    logger.warn('⚠️ ADVERTENCIA: synchronize está activado en producción.');
    logger.warn('   Esto puede causar pérdida de datos. Use migraciones en su lugar.');
    logger.warn('   Para desactivar, asegure que NODE_ENV=production');
  }
}

// ============================================
// INFORMACIÓN DE CONEXIÓN
// ============================================

logger.info(`📦 Base de datos: ${process.env.DB_NAME || 'sigma_t'} en ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}`);
logger.info(`🔧 Modo synchronize: ${process.env.NODE_ENV !== 'production' ? 'ACTIVADO (desarrollo)' : 'DESACTIVADO (producción)'}`);
logger.info(`🔐 Entorno: ${process.env.NODE_ENV || 'development'}`);