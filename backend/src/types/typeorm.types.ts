/**
 * @fileoverview Tipos personalizados para TypeORM
 * @module types/typeorm.types
 */

import type { Repository, FindOptionsWhere, FindManyOptions, DeepPartial } from 'typeorm';

/**
 * Tipo para el repositorio de una entidad
 * @template T - Tipo de la entidad
 */
export type EntityRepository<T> = Repository<T>;

/**
 * Tipo para las opciones de búsqueda
 * @template T - Tipo de la entidad
 */
export type EntityFindOptions<T> = FindOptionsWhere<T> | FindManyOptions<T>;

/**
 * Tipo para datos parciales de una entidad
 * @template T - Tipo de la entidad
 */
export type EntityData<T> = DeepPartial<T>;

/**
 * Tipo para el resultado de una consulta paginada
 * @template T - Tipo de la entidad
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Tipo para los parámetros de paginación
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * Tipo para los filtros de búsqueda de envíos
 */
export interface EnvioFilters {
  clienteId?: number;
  estado?: string;
  house?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  unidadDestino?: string;
}

/**
 * Tipo para los filtros de búsqueda de clientes
 */
export interface ClienteFilters {
  nombre?: string;
  activo?: boolean;
  telefono?: string;
}