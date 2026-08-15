/**
 * @fileoverview Servicio de API para rutas
 * @module api/ruta
 */

import api from './axios.config';

export interface Parada {
  orden: number;
  envio_id: number;
  house: string;
  destinatario: string;
  direccion: string;
  lat?: number;
  lng?: number;
  eta?: string;
  tiempo_estimado?: number;
  distancia_estimada?: number;
}

export interface Ruta {
  id_ruta: number;
  id_vehiculo: number;
  id_chofer: number;
  fecha: string;
  secuencia_paradas: Parada[];
  distancia_total: number;
  tiempo_estimado: number;
  combustible_estimado?: number;
  combustible_real?: number;
  costo_total_estimado: number;
  costo_total_real?: number;
  pago_chofer?: number;
  ficha_costo?: any;
  ingresos?: number;
  utilidad_neta?: number;
  margen_utilidad?: number;
  analisis_post_ruta?: any;
  estado: 'planificada' | 'en_curso' | 'completada' | 'cancelada';
  created_at: string;
  updated_at: string;
}

class RutaApiService {
  private baseUrl = '/api/rutas';

  async optimizarSemana(fechaInicio: Date, dias: number = 7): Promise<Ruta[]> {
    const response = await api.post(`${this.baseUrl}/optimizar`, {
      fechaInicio: fechaInicio.toISOString().split('T')[0],
      dias,
    });
    return response.data.data;
  }

  async getRutasSemana(fecha: Date): Promise<Ruta[]> {
    const fechaStr = fecha.toISOString().split('T')[0];
    const response = await api.get(`${this.baseUrl}/semana/${fechaStr}`);
    return response.data.data;
  }

  async getById(id: number): Promise<Ruta> {
    const response = await api.get(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  async asignarChofer(id: number, choferId: number): Promise<Ruta> {
    const response = await api.post(`${this.baseUrl}/${id}/asignar`, { id_chofer: choferId });
    return response.data.data;
  }

  async reoptimizar(id: number, envioId?: number, motivo?: string): Promise<Ruta> {
    const response = await api.post(`${this.baseUrl}/${id}/reoptimizar`, {
      envio_id: envioId,
      motivo: motivo || 'Reoptimización manual',
    });
    return response.data.data;
  }

  async getFichaCosto(id: number): Promise<any> {
    const response = await api.get(`${this.baseUrl}/${id}/ficha-costo`);
    return response.data.data;
  }
}

export const rutaApi = new RutaApiService();