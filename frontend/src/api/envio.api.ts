/**
 * @fileoverview Servicio de API para la gestión de envíos
 * @module api/envio
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Envio {
  id_envio: number;
  id_cliente: number;
  id_chofer?: number;
  id_vehiculo?: number;
  id_ruta?: number;
  house: string;
  awb?: string;
  descripcion: string;
  peso: number;
  volumen: number;
  bultos: number;
  remitente_nombre: string;
  remitente_passport?: string;
  destinatario_nombre: string;
  destinatario_direccion: string;
  destinatario_telefono: string;
  cobrado_origen: boolean;
  unidad_destino?: string;
  prioridad: 'urgente' | 'normal' | 'economico';
  fecha_limite?: string;
  fecha_asignacion?: string;
  fecha_entrega_real?: string;
  estado: 'pendiente' | 'en_bodega' | 'en_ruta' | 'entregado' | 'incidencia';
  incidencia?: string;
  firma_digital?: string;
  costo_aduana?: number;
  costo_importacion?: number;
  fecha_consulta_aduana?: string;
  estado_aduana: 'pendiente' | 'consultado' | 'error';
  created_at: string;
  updated_at: string;
  cliente?: {
    id_cliente: number;
    nombre_empresa: string;
  };
}

export interface EnvioFilters {
  estado?: string;
  clienteId?: number;
  fechaInicio?: string;
  fechaFin?: string;
  search?: string;
}

export interface EstadisticasEnvios {
  total: number;
  pendientes: number;
  enRuta: number;
  entregados: number;
  incidencias: number;
}

class EnvioApiService {
  private baseUrl = `${API_URL}/api/envios`;

  /**
   * Obtiene todos los envíos con filtros
   */
  async getAll(filters?: EnvioFilters): Promise<Envio[]> {
    const response = await axios.get(this.baseUrl, { params: filters });
    return response.data.data;
  }

  /**
   * Obtiene un envío por ID
   */
  async getById(id: number): Promise<Envio> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  /**
   * Obtiene un envío por House
   */
  async getByHouse(house: string): Promise<Envio> {
    const response = await axios.get(`${this.baseUrl}/house/${house}`);
    return response.data.data;
  }

  /**
   * Crea un nuevo envío
   */
  async create(data: Partial<Envio>): Promise<Envio> {
    const response = await axios.post(this.baseUrl, data);
    return response.data.data;
  }

  /**
   * Actualiza un envío
   */
  async update(id: number, data: Partial<Envio>): Promise<Envio> {
    const response = await axios.put(`${this.baseUrl}/${id}`, data);
    return response.data.data;
  }

  /**
   * Elimina un envío
   */
  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Actualiza el estado de un envío
   */
  async updateEstado(id: number, estado: string, incidencia?: string): Promise<Envio> {
    const response = await axios.patch(`${this.baseUrl}/${id}/estado`, { estado, incidencia });
    return response.data.data;
  }

  /**
   * Obtiene estadísticas de envíos
   */
  async getEstadisticas(clienteId?: number): Promise<EstadisticasEnvios> {
    const response = await axios.get(`${this.baseUrl}/estadisticas`, { params: { clienteId } });
    return response.data.data;
  }
}

export const envioApi = new EnvioApiService();