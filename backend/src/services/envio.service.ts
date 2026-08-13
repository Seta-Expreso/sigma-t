/**
 * @fileoverview Servicio para la gestión de envíos
 * @module services/envio
 */

import { AppDataSource } from '../config/database.config';
import { Envio, EstadoEnvio, PrioridadEnvio, EstadoAduana } from '../models/envio.model';
import { Repository, Between, FindOptionsWhere } from 'typeorm';

export class EnvioService {
  private envioRepository: Repository<Envio>;

  constructor() {
    this.envioRepository = AppDataSource.getRepository(Envio);
  }

  /**
   * Obtiene todos los envíos con filtros opcionales
   * @param {Object} filters - Filtros para la búsqueda
   * @returns {Promise<Envio[]>} Lista de envíos
   */
  async findAll(filters?: {
    estado?: EstadoEnvio;
    clienteId?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    search?: string;
  }): Promise<Envio[]> {
    const where: FindOptionsWhere<Envio> = {};

    if (filters?.estado) {
      where.estado = filters.estado;
    }

    if (filters?.clienteId) {
      where.id_cliente = filters.clienteId;
    }

    if (filters?.fechaInicio && filters?.fechaFin) {
      where.created_at = Between(filters.fechaInicio, filters.fechaFin);
    }

    const queryBuilder = this.envioRepository
      .createQueryBuilder('envio')
      .leftJoinAndSelect('envio.cliente', 'cliente')
      .where(where);

    if (filters?.search) {
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
   */
  async findByHouse(house: string): Promise<Envio | null> {
    return await this.envioRepository.findOne({
      where: { house },
      relations: ['cliente'],
    });
  }

  /**
   * Crea un nuevo envío
   * @param {Partial<Envio>} data - Datos del envío
   * @returns {Promise<Envio>} Envío creado
   */
  async create(data: Partial<Envio>): Promise<Envio> {
    // Verificar que el house no exista
    const existing = await this.findByHouse(data.house as string);
    if (existing) {
      throw new Error(`El House "${data.house}" ya está registrado`);
    }

    const envio = this.envioRepository.create(data);
    return await this.envioRepository.save(envio);
  }

  /**
   * Actualiza un envío existente
   * @param {number} id - ID del envío
   * @param {Partial<Envio>} data - Datos a actualizar
   * @returns {Promise<Envio | null>} Envío actualizado o null
   */
  async update(id: number, data: Partial<Envio>): Promise<Envio | null> {
    const envio = await this.findById(id);
    if (!envio) return null;

    // Si se está actualizando el house, verificar que no exista otro
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
   * @param {string} incidencia - Descripción de incidencia (opcional)
   * @returns {Promise<Envio | null>} Envío actualizado o null
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
   * @param {number} costoAduana - Costo de aduana
   * @param {EstadoAduana} estadoAduana - Estado de la consulta
   * @returns {Promise<Envio | null>} Envío actualizado o null
   */
  async updateAduana(id: number, costoAduana: number, estadoAduana: EstadoAduana): Promise<Envio | null> {
    const envio = await this.findById(id);
    if (!envio) return null;

    envio.costo_aduana = costoAduana;
    envio.estado_aduana = estadoAduana;
    envio.fecha_consulta_aduana = new Date();

    return await this.envioRepository.save(envio);
  }

  /**
   * Obtiene estadísticas de envíos
   * @param {number} clienteId - ID del cliente (opcional)
   * @returns {Promise<Object>} Estadísticas
   */
  async getEstadisticas(clienteId?: number): Promise<{
    total: number;
    pendientes: number;
    enRuta: number;
    entregados: number;
    incidencias: number;
  }> {
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
}