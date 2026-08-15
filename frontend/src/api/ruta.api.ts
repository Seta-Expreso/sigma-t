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

export interface FichaCosto {
  resumen: {
    distancia: number;
    entregas: number;
    vehiculo: string;
    chofer: string;
    fecha: string;
    ingresos: number;
  };
  costos_directos: {
    combustible: { monto: number; cantidad: number; unidad: string };
    peajes: { monto: number; cantidad: number; unidad: string };
    mantenimiento: { monto: number; cantidad: number; unidad: string };
    neumaticos: { monto: number; cantidad: number; unidad: string };
    salario: { monto: number; cantidad: number; unidad: string };
    subtotal: number;
  };
  costos_indirectos: {
    depreciacion: { monto: number; cantidad: number; unidad: string };
    seguro: { monto: number; cantidad: number; unidad: string };
    administrativo: { monto: number; cantidad: number; unidad: string };
    impuestos: { monto: number; cantidad: number; unidad: string };
    subtotal: number;
  };
  costos_importacion: {
    aduana: { monto: number; cantidad: number; unidad: string };
    subtotal: number;
  };
  totales: {
    total_general: number;
    utilidad_neta: number;
    margen_utilidad: number;
  };
}

export interface AnalisisPostRuta {
  distancia_planificada: number;
  distancia_real: number;
  tiempo_planificado: number;
  tiempo_real: number;
  combustible_estimado: number;
  combustible_real: number;
  desviacion_distancia: number;
  desviacion_tiempo: number;
  desviacion_combustible: number;
  eficiencia_chofer: number;
  eficiencia_vehiculo: number;
  entregas_a_tiempo: number;
  entregas_urgentes: number;
  reoptimizaciones: number;
  incidencias: Array<{
    tipo: string;
    descripcion: string;
    hora: string;
  }>;
  recomendaciones: string[];
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
  ficha_costo?: FichaCosto;           // ✅ Usar tipo FichaCosto
  ingresos?: number;
  utilidad_neta?: number;
  margen_utilidad?: number;
  analisis_post_ruta?: AnalisisPostRuta; // ✅ Usar tipo AnalisisPostRuta
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

  // ✅ Usar tipo FichaCosto en lugar de any
  async getFichaCosto(id: number): Promise<FichaCosto> {
    const response = await api.get(`${this.baseUrl}/${id}/ficha-costo`);
    return response.data.data;
  }
}

export const rutaApi = new RutaApiService();