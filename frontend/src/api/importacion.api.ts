/**
 * @fileoverview Servicio de API para importación de manifiestos
 * @module api/importacion
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ColumnaMapeo {
  house: string;
  descripcion: string;
  peso: string;
  bultos: string;
  remitente_nombre: string;
  remitente_passport: string;
  destinatario_nombre: string;
  destinatario_identificacion: string;
  destinatario_telefono: string;
  destinatario_direccion: string;
  cobrado_origen: string;
  unidad_destino: string;
}

export interface ImportacionResultado {
  total: number;
  importados: number;
  errores: Array<{
    fila: number;
    house?: string;
    errores: string[];
  }>;
  envios: Array<{
    house: string;
    destinatario: string;
    peso: number;
    estado: string;
  }>;
}

export interface VistaPreviaResponse {
  columnas: string[];
  filas: Array<Record<string, any>>;
  total: number;
}

class ImportacionApiService {
  private baseUrl = `${API_URL}/api/importacion`;

  /**
   * Obtiene las columnas del archivo Excel para mostrar en el mapeo
   */
  async obtenerColumnas(file: File): Promise<string[]> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${this.baseUrl}/columnas`, formData);
    return response.data.data;
  }

  /**
   * Obtiene vista previa de los datos con el mapeo seleccionado
   */
  async obtenerVistaPrevia(
    file: File,
    mapeo: ColumnaMapeo,
    clienteId: number
  ): Promise<{ filas: any[]; total: number; errores: any[] }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapeo', JSON.stringify(mapeo));
    formData.append('clienteId', String(clienteId));
    const response = await axios.post(`${this.baseUrl}/vista-previa`, formData);
    return response.data.data;
  }

  /**
   * Importa el archivo con el mapeo seleccionado
   */
  async importar(
    file: File,
    mapeo: ColumnaMapeo,
    clienteId: number
  ): Promise<ImportacionResultado> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapeo', JSON.stringify(mapeo));
    formData.append('clienteId', String(clienteId));
    const response = await axios.post(`${this.baseUrl}/importar`, formData);
    return response.data.data;
  }
}

export const importacionApi = new ImportacionApiService();