/**
 * @fileoverview Servicio de API para importación de manifiestos
 * @module api/importacion
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ImportResult {
  success: boolean;
  total: number;
  importados: number;
  errores: Array<{
    fila: number;
    house: string;
    error: string;
  }>;
  envios: any[];
}

export interface FormatoColumnas {
  columnas: Array<{
    nombre: string;
    requerido: boolean;
    ejemplo: string;
  }>;
}

class ImportacionApiService {
  private baseUrl = `${API_URL}/api/importacion`;

  /**
   * Obtiene el formato esperado del Excel
   */
  async getFormato(): Promise<FormatoColumnas> {
    const response = await axios.get(`${this.baseUrl}/formato`);
    return response.data.data;
  }

  /**
   * Importa envíos desde un archivo Excel
   * @param file - Archivo Excel
   * @param clienteId - ID del cliente
   */
  async importarExcel(file: File, clienteId: number): Promise<ImportResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clienteId', String(clienteId));

    const response = await axios.post(`${this.baseUrl}/excel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  }
}

export const importacionApi = new ImportacionApiService();