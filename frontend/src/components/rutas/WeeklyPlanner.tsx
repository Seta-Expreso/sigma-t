/**
 * @fileoverview Componente de planificación semanal de rutas
 * @module components/rutas/WeeklyPlanner
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, LoadingSpinner, Select } from '../common';
import { useRutas } from '../../hooks/useRutas';

interface WeeklyPlannerProps {
  fechaInicio?: Date;
  onRutaSeleccionada?: (rutaId: number) => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  fechaInicio = new Date(),
  onRutaSeleccionada,
}) => {
  const [semana, setSemana] = useState<Date>(fechaInicio);
  const { rutas, loading, optimizarSemana, error } = useRutas();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Generar días de la semana
  const getDiasSemana = (fecha: Date) => {
    const inicio = new Date(fecha);
    inicio.setDate(inicio.getDate() - inicio.getDay() + 1); // Lunes
    const dias = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicio);
      dia.setDate(dia.getDate() + i);
      dias.push(dia);
    }
    return dias;
  };

  const diasSemana = getDiasSemana(semana);

  // Formatear fecha
  const formatFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getNombreDia = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', { weekday: 'long' });
  };

  // Optimizar semana
  const handleOptimizar = async () => {
    await optimizarSemana(semana);
  };

  // Navegar semana
  const navegarSemana = (direccion: number) => {
    const nueva = new Date(semana);
    nueva.setDate(nueva.getDate() + direccion * 7);
    setSemana(nueva);
  };

  // Filtrar rutas por día
  const getRutasDelDia = (fecha: Date) => {
    const fechaStr = fecha.toDateString();
    return rutas.filter(r => new Date(r.fecha).toDateString() === fechaStr);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" message="Cargando rutas..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          📅 Planificación Semanal
        </h2>
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navegarSemana(-1)}>
            ◀ Semana anterior
          </Button>
          <span className="text-sm font-medium text-gray-600">
            {formatFecha(diasSemana[0])} - {formatFecha(diasSemana[6])}
          </span>
          <Button variant="secondary" onClick={() => navegarSemana(1)}>
            Semana siguiente ▶
          </Button>
          <Button onClick={handleOptimizar}>
            🔄 Optimizar VRPTW v3
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-4">
        {diasSemana.map((dia, index) => {
          const rutasDelDia = getRutasDelDia(dia);
          const isToday = dia.toDateString() === new Date().toDateString();

          return (
            <Card
              key={index}
              className={`p-4 ${isToday ? 'border-2 border-primaryLight' : ''}`}
              onClick={() => setSelectedDay(dia.toDateString())}
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">
                  {getNombreDia(dia).toUpperCase()}
                </p>
                <p className={`text-lg font-bold ${isToday ? 'text-primaryLight' : 'text-gray-900'}`}>
                  {dia.getDate()}
                </p>
              </div>

              <div className="mt-3 space-y-2">
                {rutasDelDia.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center">Sin rutas</p>
                ) : (
                  rutasDelDia.map((ruta) => (
                    <div
                      key={ruta.id_ruta}
                      className="text-xs p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRutaSeleccionada?.(ruta.id_ruta);
                      }}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">
                          🚚 Ruta {ruta.id_ruta}
                        </span>
                        <span className={`
                          px-1.5 py-0.5 rounded text-xs
                          ${ruta.estado === 'planificada' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${ruta.estado === 'en_curso' ? 'bg-blue-100 text-blue-800' : ''}
                          ${ruta.estado === 'completada' ? 'bg-green-100 text-green-800' : ''}
                        `}>
                          {ruta.estado}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        {ruta.secuencia_paradas?.length || 0} entregas • {ruta.distancia_total || 0} km
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Resumen de carga semanal */}
      <Card title="📊 Resumen de carga semanal">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primaryLight">
              {rutas.length}
            </p>
            <p className="text-sm text-gray-500">Total rutas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">
              {rutas.filter(r => r.estado === 'completada').length}
            </p>
            <p className="text-sm text-gray-500">Completadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {rutas.filter(r => r.estado === 'planificada').length}
            </p>
            <p className="text-sm text-gray-500">Planificadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">
              {rutas.filter(r => r.estado === 'en_curso').length}
            </p>
            <p className="text-sm text-gray-500">En curso</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeeklyPlanner;