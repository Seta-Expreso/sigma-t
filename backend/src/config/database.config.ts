/**
 * @fileoverview Configuración de TypeORM para la conexión a PostgreSQL
 * @module config/database
 */

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Cliente } from '../models/cliente.model';
import { Envio } from '../models/envio.model';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'sigma2026',
  database: process.env.DB_NAME || 'sigma_t',
  synchronize: true, // Solo para desarrollo. En producción usar migraciones
  logging: process.env.NODE_ENV === 'development',
  entities: [Cliente, Envio],
  subscribers: [],
  migrations: [],
});