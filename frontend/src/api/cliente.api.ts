/**
 * @fileoverview Servicio de API para la gestión de clientes
 * @module api/cliente
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Interfaz que representa un cliente en el sistema
 * @interface Cliente
 */
export interface Cliente {
  id_cliente: number;
  nombre_empresa: string;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_email?: string;
  tarifa_preferencial?: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Filtros para la búsqueda de clientes
 * @interface ClienteFilters
 */
export interface ClienteFilters {
  search?: string;
  activo?: boolean;
}

/**
 * Clase para interactuar con la API de clientes
 * @class ClienteApiService
 */
class ClienteApiService {
  private baseUrl = `${API_URL}/api/clientes`;

  /**
   * Obtiene todos los clientes activos
   * @returns {Promise<Cliente[]>} Lista de clientes
   * @example
   * const clientes = await clienteApi.getAll();
   */
  async getAll(): Promise<Cliente[]> {
    const response = await axios.get(this.baseUrl);
    return response.data.data;
  }

  /**
   * Obtiene un cliente por su ID
   * @param {number} id - ID del cliente
   * @returns {Promise<Cliente>} Datos del cliente
   * @example
   * const cliente = await clienteApi.getById(1);
   */
  async getById(id: number): Promise<Cliente> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  /**
   * Busca clientes por término de búsqueda (nombre de empresa o contacto)
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Cliente[]>} Lista de clientes que coinciden
   * @example
   * const resultados = await clienteApi.search('CAC');
   */
  async search(searchTerm: string): Promise<Cliente[]> {
    const response = await axios.get(`${this.baseUrl}/buscar`, { params: { q: searchTerm } });
    return response.data.data;
  }

  /**
   * Crea un nuevo cliente
   * @param {Partial<Cliente>} data - Datos del cliente
   * @returns {Promise<Cliente>} Cliente creado
   * @example
   * const nuevoCliente = await clienteApi.create({
   *   nombre_empresa: 'CAC Paquetería',
   *   contacto_nombre: 'Juan Pérez'
   * });
   */
  async create(data: Partial<Cliente>): Promise<Cliente> {
    const response = await axios.post(this.baseUrl, data);
    return response.data.data;
  }

  /**
   * Actualiza un cliente existente
   * @param {number} id - ID del cliente
   * @param {Partial<Cliente>} data - Datos a actualizar
   * @returns {Promise<Cliente>} Cliente actualizado
   * @example
   * const clienteActualizado = await clienteApi.update(1, {
   *   nombre_empresa: 'CAC Paquetería Actualizada'
   * });
   */
  async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
    const response = await axios.put(`${this.baseUrl}/${id}`, data);
    return response.data.data;
  }

  /**
   * Elimina un cliente (desactivación lógica)
   * @param {number} id - ID del cliente
   * @returns {Promise<void>}
   * @example
   * await clienteApi.delete(1);
   */
  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
}

export const clienteApi = new ClienteApiService();