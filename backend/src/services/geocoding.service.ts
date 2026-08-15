/**
 * @fileoverview Servicio de geocodificación de direcciones
 * @module services/geocoding
 */

import axios from 'axios';
import logger from '../utils/logger.js';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

// 🆕 Definir tipo específico para la respuesta de Nominatim
export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  place_id: number;
  class: string;
  type: string;
  importance: number;
}

export interface GeocodingResult {
  lat: number;
  lng: number;
  display_name: string;
  place_id: number;
}

/**
 * Convierte una dirección en coordenadas (lat, lng)
 */
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // ✅ Array type corregido: NominatimResult[]
    const response = await axios.get<NominatimResult[]>(NOMINATIM_URL, {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        countrycodes: 'cu', // Priorizar Cuba
      },
      headers: {
        'User-Agent': 'SIGMA-T/1.0',
      },
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        display_name: result.display_name,
        place_id: result.place_id,
      };
    }

    return null;
  } catch (error) {
    logger.error('Error en geocodificación:', error);
    return null;
  }
}

/**
 * Geocodifica múltiples direcciones
 */
export async function geocodeAddresses(
  addresses: string[]
): Promise<Array<GeocodingResult | null>> {
  const results: Array<GeocodingResult | null> = [];

  for (const address of addresses) {
    const result = await geocodeAddress(address);
    results.push(result);
    // Pequeña pausa para no sobrecargar Nominatim
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}