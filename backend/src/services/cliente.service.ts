/**
 * @fileoverview Servicio para la gestión de clientes
 * @module services/cliente
 */

import { AppDataSource } from '../config/database.config';
import { Cliente } from '../models/cliente.model';
import { Repository } from 'typeorm';

/**
 * Servicio para operaciones CRUD de clientes
 * @class ClienteService
 */
export class ClienteService {
  private clienteRepository: Repository<Cliente>;

  constructor() {
    this.clienteRepository = AppDataSource.getRepository(Cliente);
  }

  /**
   * Obtiene todos los clientes activos
   * @returns {Promise<Cliente[]>} Lista de clientes activos ordenados por nombre
   * @example
   * const clientes = await clienteService.findAll();
   */
  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      where: { activo: true },
      order: { nombre_empresa: 'ASC' },
    });
  }

  /**
   * Obtiene un cliente por su ID
   * @param {number} id - ID del cliente
   * @returns {Promise<Cliente | null>} Cliente encontrado o null
   * @example
   * const cliente = await clienteService.findById(1);
   */
  async findById(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.findOne({
      where: { id_cliente: id },
      relations: ['envios'],
    });
  }

  /**
   * Crea un nuevo cliente
   * @param {Partial<Cliente>} data - Datos del cliente
   * @returns {Promise<Cliente>} Cliente creado
   * @example
   * const nuevoCliente = await clienteService.create({
   *   nombre_empresa: 'CAC Paquetería',
   *   contacto_nombre: 'Juan Pérez'
   * });
   */
  async create(data: Partial<Cliente>): Promise<Cliente> {
    const cliente = this.clienteRepository.create(data);
    return await this.clienteRepository.save(cliente);
  }

  /**
   * Actualiza un cliente existente
   * @param {number} id - ID del cliente
   * @param {Partial<Cliente>} data - Datos a actualizar
   * @returns {Promise<Cliente | null>} Cliente actualizado o null
   * @example
   * const clienteActualizado = await clienteService.update(1, {
   *   nombre_empresa: 'CAC Paquetería Actualizada'
   * });
   */
  async update(id: number, data: Partial<Cliente>): Promise<Cliente | null> {
    const cliente = await this.findById(id);
    if (!cliente) return null;

    Object.assign(cliente, data);
    return await this.clienteRepository.save(cliente);
  }

  /**
   * Elimina un cliente (desactivación lógica)
   * @param {number} id - ID del cliente
   * @returns {Promise<boolean>} true si se eliminó, false si no existe
   * @example
   * const eliminado = await clienteService.delete(1);
   */
  async delete(id: number): Promise<boolean> {
    const cliente = await this.findById(id);
    if (!cliente) return false;

    cliente.activo = false;
    await this.clienteRepository.save(cliente);
    return true;
  }

  /**
   * Busca clientes por nombre de empresa o contacto
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Cliente[]>} Lista de clientes que coinciden
   * @example
   * const resultados = await clienteService.search('CAC');
   */
  async search(searchTerm: string): Promise<Cliente[]> {
    return await this.clienteRepository
      .createQueryBuilder('cliente')
      .where('cliente.nombre_empresa ILIKE :search', { search: `%${searchTerm}%` })
      .orWhere('cliente.contacto_nombre ILIKE :search', { search: `%${searchTerm}%` })
      .andWhere('cliente.activo = true')
      .orderBy('cliente.nombre_empresa', 'ASC')
      .getMany();
  }
}