/**
 * @fileoverview Servicio para la gestión de envíos
 * @module services/envio
 */

import { AppDataSource } from '../config/database.config.js';
import { Envio, EstadoEnvio } from '../models/envio.model.js';
// ✅ CORREGIDO: Importar EstadoAduana como tipo
import type { EstadoAduana } from '../models/envio.model.js';
import type { EnvioCreateData, EnvioUpdateData } from '../models/envio.model.js';
import type { EnvioFilters } from '../types/typeorm.types.js';
import type { Repository, Between, FindOptionsWhere } from 'typeorm';

/**
 * Estadísticas de envíos
 * @interface EnvioEstadisticas
 */
export interface EnvioEstadisticas {
  total: number;
  pendientes: number;
  enRuta: number;
  entregados: number;
  incidencias: number;
}

/**
 * Servicio para operaciones CRUD de envíos
 * @class EnvioService
 */
export class EnvioService {
  private envioRepository: Repository<Envio>;

  constructor() {
    this.envioRepository = AppDataSource.getRepository(Envio);
  }

  /**
   * Obtiene todos los envíos con filtros opcionales
   * @param {EnvioFilters} filters - Filtros para la búsqueda
   * @returns {Promise<Envio[]>} Lista de envíos
   * @example
   * const envios = await envioService.findAll({ estado: EstadoEnvio.EN_RUTA });
   */
  async findAll(filters: EnvioFilters = {}): Promise<Envio[]> {
    const where: FindOptionsWhere<Envio> = {};

    if (filters.estado) {
      where.estado = filters.estado as EstadoEnvio;
    }

    if (filters.clienteId) {
      where.id_cliente = filters.clienteId;
    }

    if (filters.fechaInicio && filters.fechaFin) {
      where.created_at = Between(filters.fechaInicio, filters.fechaFin);
    }

    const queryBuilder = this.envioRepository
      .createQueryBuilder('envio')
      .leftJoinAndSelect('envio.cliente', 'cliente')
      .where(where);

    if (filters.search) {
      queryBuilder.andWhere(
        '(envio.house ILIKE :search OR envio.destinatario_nombre ILIKE :search OR envio.destinatario_direccion ILIKE :search)',
        { search: `%${filters.search}%` }
      );
    }

    return await queryBuilder
      .orderBy('envio.created_at', 'DESC')
      .getMany();
  }

  /**
   * Obtiene un envío por su ID
   * @param {number} id - ID del envío
   * @returns {Promise<Envio | null>} Envío encontrado o null
   * @example
   * const envio = await envioService.findById(1);
   */
  async findById(id: number): Promise<Envio | null> {
    return await this.envioRepository.findOne({
      where: { id_envio: id },
      relations: ['cliente'],
    });
  }

  /**
   * Obtiene un envío por su número de House
   * @param {string} house - Número de House
   * @returns {Promise<Envio | null>} Envío encontrado o null
   * @example
   * const envio = await envioService.findByHouse('CACC-24014926');
   */
  async findByHouse(house: string): Promise<Envio | null> {
    return await this.envioRepository.findOne({
      where: { house },
      relations: ['cliente'],
    });
  }

  /**
   * Crea un nuevo envío
   * @param {EnvioCreateData} data - Datos del envío
   * @returns {Promise<Envio>} Envío creado
   * @throws {Error} Si el House ya está registrado
   * @example
   * const nuevoEnvio = await envioService.create({
   *   house: 'CACC-24014926',
   *   destinatario_nombre: 'Juan Pérez'
   * });
   */
  async create(data: EnvioCreateData): Promise<Envio> {
    const existing = await this.findByHouse(data.house);
    if (existing) {
      throw new Error(`El House "${data.house}" ya está registrado`);
    }

    const envio = this.envioRepository.create(data);
    return await this.envioRepository.save(envio);
  }

  /**
   * Actualiza un envío existente
   * @param {number} id - ID del envío
   * @param {EnvioUpdateData} data - Datos a actualizar
   * @returns {Promise<Envio | null>} Envío actualizado o null
   * @throws {Error} Si el House ya está registrado por otro envío
   * @example
   * const envioActualizado = await envioService.update(1, {
   *   estado: EstadoEnvio.ENTREGADO
   * });
   */
  async update(id: number, data: EnvioUpdateData): Promise<Envio | null> {
    const envio = await this.findById(id);
    if (!envio) return null;

    if (data.house && data.house !== envio.house) {
      const existing = await this.findByHouse(data.house);
      if (existing && existing.id_envio !== id) {
        throw new Error(`El House "${data.house}" ya está registrado`);
      }
    }

    Object.assign(envio, data);
    return await this.envioRepository.save(envio);
  }

  /**
   * Elimina un envío (eliminación física)
   * @param {number} id - ID del envío
   * @returns {Promise<boolean>} true si se eliminó, false si no existe
   * @example
   * const eliminado = await envioService.delete(1);
   */
  async delete(id: number): Promise<boolean> {
    const envio = await this.findById(id);
    if (!envio) return false;

    await this.envioRepository.remove(envio);
    return true;
  }

  /**
   * Actualiza el estado de un envío
   * @param {number} id - ID del envío
   * @param {EstadoEnvio} estado - Nuevo estado
   * @param {string} [incidencia] - Descripción de incidencia (opcional)
   * @returns {Promise<Envio | null>} Envío actualizado o null
   * @example
   * const envio = await envioService.updateEstado(1, EstadoEnvio.ENTREGADO);
   */
  async updateEstado(id: number, estado: EstadoEnvio, incidencia?: string): Promise<Envio | null> {
    const envio = await this.findById(id);
    if (!envio) return null;

    envio.estado = estado;
    if (incidencia) {
      envio.incidencia = incidencia;
    }

    if (estado === EstadoEnvio.ENTREGADO) {
      envio.fecha_entrega_real = new Date();
    }

    return await this.envioRepository.save(envio);
  }

  /**
   * Actualiza el costo de aduana de un envío
   * @param {number} id - ID del envío
   * @param {number} importeAduana - Importe de aduana
   * @param {string} numeroFactura - Número de factura
   * @param {EstadoAduana} estadoAduana - Estado de la consulta
   * @returns {Promise<Envio | null>} Envío actualizado o null
   * @example
   * const envio = await envioService.updateAduana(1, 1250.00, 'FAC-001', EstadoAduana.CONSULTADO);
   */
  async updateAduana(
    id: number,
    importeAduana: number,
    numeroFactura: string,
    estadoAduana: EstadoAduana
  ): Promise<Envio | null> {
    const envio = await this.findById(id);
    if (!envio) return null;

    envio.importe_aduana = importeAduana;
    envio.numero_factura_aduana = numeroFactura;
    envio.estado_aduana = estadoAduana;
    envio.fecha_ultima_consulta_aduana = new Date();
    envio.intentos_consulta_aduana = 0;

    return await this.envioRepository.save(envio);
  }

  /**
   * Obtiene estadísticas de envíos
   * @param {number} [clienteId] - ID del cliente (opcional)
   * @returns {Promise<EnvioEstadisticas>} Estadísticas
   * @example
   * const stats = await envioService.getEstadisticas(1);
   */
  async getEstadisticas(clienteId?: number): Promise<EnvioEstadisticas> {
    const where: FindOptionsWhere<Envio> = {};
    if (clienteId) {
      where.id_cliente = clienteId;
    }

    const [total, pendientes, enRuta, entregados, incidencias] = await Promise.all([
      this.envioRepository.count({ where }),
      this.envioRepository.count({ where: { ...where, estado: EstadoEnvio.PENDIENTE } }),
      this.envioRepository.count({ where: { ...where, estado: EstadoEnvio.EN_RUTA } }),
      this.envioRepository.count({ where: { ...where, estado: EstadoEnvio.ENTREGADO } }),
      this.envioRepository.count({ where: { ...where, estado: EstadoEnvio.INCIDENCIA } }),
    ]);

    return { total, pendientes, enRuta, entregados, incidencias };
  }

  /**
   * Obtiene el historial completo de envíos de un cliente
   * @param {number} clienteId - ID del cliente
   * @returns {Promise<Envio[]>} Lista de envíos del cliente ordenados por fecha descendente
   * @example
   * const historial = await envioService.getHistorialByCliente(1);
   */
  async getHistorialByCliente(clienteId: number): Promise<Envio[]> {
    return await this.envioRepository.find({
      where: { id_cliente: clienteId },
      relations: ['cliente'],
      order: { created_at: 'DESC' },
    });
  }
}