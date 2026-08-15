/**
 * @fileoverview Custom hook para gestión de rutas
 * @module hooks/useRutas
 */

import { useState, useCallback } from 'react';
import { rutaApi } from '../api/ruta.api';
import type { Ruta } from '../api/ruta.api'; // ✅ Usar import type

export const useRutas = () => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimizarSemana = useCallback(async (fechaInicio: Date) => {
    setLoading(true);
    setError(null);
    try {
      const result = await rutaApi.optimizarSemana(fechaInicio);
      setRutas(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al optimizar rutas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRutasSemana = useCallback(async (fecha: Date) => {
    setLoading(true);
    setError(null);
    try {
      const result = await rutaApi.getRutasSemana(fecha);
      setRutas(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar rutas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRutaById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await rutaApi.getById(id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar ruta');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    rutas,
    loading,
    error,
    optimizarSemana,
    getRutasSemana,
    getRutaById,
  };
};