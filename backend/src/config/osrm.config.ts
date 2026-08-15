/**
 * @fileoverview Configuración de OSRM (Open Source Routing Machine)
 * @module config/osrm
 */

import axios from 'axios';

const OSRM_URL = process.env.OSRM_URL || 'http://osrm:5000';

export interface OSRMResponse {
  code: string;
  routes?: Array<{
    geometry: string;
    legs: Array<{
      steps: any[];
      summary: string;
      weight: number;
      duration: number;
      distance: number;
    }>;
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
  }>;
  waypoints: Array<{
    hint: string;
    distance: number;
    name: string;
    location: [number, number];
  }>;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

/**
 * Obtiene la distancia y tiempo entre dos puntos
 */
export async function getRoute(
  origin: Coordinate,
  destination: Coordinate
): Promise<{ distance: number; duration: number }> {
  const url = `${OSRM_URL}/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;

  try {
    const response = await axios.get<OSRMResponse>(url, {
      params: {
        overview: 'false',
        steps: 'false',
        geometries: 'geojson',
      },
    });

    if (response.data.code === 'Ok' && response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      return {
        distance: route.distance / 1000, // Convertir metros a kilómetros
        duration: route.duration / 60, // Convertir segundos a minutos
      };
    }

    throw new Error('No se encontró ruta entre los puntos');
  } catch (error) {
    console.error('Error en OSRM:', error);
    throw new Error('Error al calcular la ruta');
  }
}

/**
 * Calcula la matriz de distancias entre múltiples puntos
 */
export async function getDistanceMatrix(
  origins: Coordinate[],
  destinations: Coordinate[]
): Promise<number[][]> {
  const matrix: number[][] = [];

  for (const origin of origins) {
    const row: number[] = [];
    for (const destination of destinations) {
      if (origin === destination) {
        row.push(0);
      } else {
        try {
          const result = await getRoute(origin, destination);
          row.push(result.distance);
        } catch {
          row.push(999999); // Distancia muy grande si hay error
        }
      }
    }
    matrix.push(row);
  }

  return matrix;
}