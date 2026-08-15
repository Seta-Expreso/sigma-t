/**
 * @fileoverview Servicio de Envíos
 * @module services/envio
 */

import { AppDataSource } from '../config/database.config.js';
import { Envio, EstadoEnvio } from '../models/envio.model.js';
import { Cliente } from '../models/cliente.model.js';
import { Between, Like } from 'typeorm';
import type { FindOptionsWhere } from 'typeorm';

interface EnvioFilters {
  estado?: EstadoEnvio;
  cliente_id?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  search?: string;
}

export class EnvioService {
  private envioRepository = AppDataSource.getRepository(Envio);
  private clienteRepository = AppDataSource.getRepository(Cliente);

  /**
   * Crear un nuevo envío
   */
  async create(data: Partial<Envio>): Promise<Envio> {
    // Validar que el cliente existe
    if (data.id_cliente) {
      const cliente = await this.clienteRepository.findOne({
        where: { id_cliente: data.id_cliente },
      });
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
    }

    const envio = this.envioRepository.create({
      ...data,
      estado: EstadoEnvio.PENDIENTE,
    });

    return await this.envioRepository.save(envio);
  }

  /**
   * Listar envíos con filtros
   */
  async findAll(filters: EnvioFilters = {}): Promise<Envio[]> {
    const where: FindOptionsWhere<Envio> = {};

    if (filters.estado) {
      where.estado = filters.estado;
    }

    if (filters.cliente_id) {
      where.id_cliente = filters.cliente_id;
    }

    if (filters.fecha_inicio && filters.fecha_fin) {
      where.created_at = Between(
        new Date(filters.fecha_inicio),
        new Date(filters.fecha_fin)
      );
    }

    if (filters.search) {
      where.house = Like(`%${filters.search}%`);
    }

    return await this.envioRepository.find({
      where,
      relations: ['cliente'],
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Obtener un envío por ID
   */
  async findById(id: number): Promise<Envio | null> {
    return await this.envioRepository.findOne({
      where: { id_envio: id },
      relations: ['cliente'],
    });
  }

  /**
   * Buscar envío por House
   */
  async findByHouse(house: string): Promise<Envio | null> {
    return await this.envioRepository.findOne({
      where: { house },
      relations: ['cliente'],
    });
  }

  /**
   * Actualizar un envío
   */
  async update(id: number, data: Partial<Envio>): Promise<Envio | null> {
    const envio = await this.findById(id);
    if (!envio) {
      return null;
    }

    // Si se actualiza el cliente, validar que existe
    if (data.id_cliente && data.id_cliente !== envio.id_cliente) {
      const cliente = await this.clienteRepository.findOne({
        where: { id_cliente: data.id_cliente },
      });
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
    }

    Object.assign(envio, data);
    return await this.envioRepository.save(envio);
  }

  /**
   * Eliminar un envío
   */
  async delete(id: number): Promise<boolean> {
    const envio = await this.findById(id);
    if (!envio) {
      return false;
    }

    await this.envioRepository.remove(envio);
    return true;
  }

  /**
   * Obtener estadísticas de envíos
   */
  async getEstadisticas(): Promise<{
    total: number;
    pendientes: number;
    en_bodega: number;
    en_ruta: number;
    entregados: number;
    incidencias: number;
  }> {
    const total = await this.envioRepository.count();
    const pendientes = await this.envioRepository.count({
      where: { estado: EstadoEnvio.PENDIENTE },
    });
    const en_bodega = await this.envioRepository.count({
      where: { estado: EstadoEnvio.EN_BODEGA },
    });
    const en_ruta = await this.envioRepository.count({
      where: { estado: EstadoEnvio.EN_RUTA },
    });
    const entregados = await this.envioRepository.count({
      where: { estado: EstadoEnvio.ENTREGADO },
    });
    const incidencias = await this.envioRepository.count({
      where: { estado: EstadoEnvio.INCIDENCIA },
    });

    return {
      total,
      pendientes,
      en_bodega,
      en_ruta,
      entregados,
      incidencias,
    };
  }
}