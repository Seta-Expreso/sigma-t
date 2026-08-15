/**
 * @fileoverview Componente de filtros para la lista de envíos
 * @module components/envios/EnvioFilters
 */

import React, { useState } from 'react';

export interface EnvioFiltersState {
  search?: string;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  clienteId?: number;
}

export interface EnvioFiltersProps {
  filters: EnvioFiltersState;
  onFilterChange: (filters: EnvioFiltersState) => void;
  onClearFilters: () => void;
  showClienteFilter?: boolean;
}

export const EnvioFilters: React.FC<EnvioFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  showClienteFilter = false,
}) => {
  const [search, setSearch] = useState(filters.search || '');
  const [estado, setEstado] = useState(filters.estado || '');
  const [fechaInicio, setFechaInicio] = useState(filters.fechaInicio || '');
  const [fechaFin, setFechaFin] = useState(filters.fechaFin || '');
  const [clienteId, setClienteId] = useState(filters.clienteId?.toString() || '');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({
      ...filters,
      search: value || undefined,
    });
  };

  const handleEstadoChange = (value: string) => {
    setEstado(value);
    onFilterChange({
      ...filters,
      estado: value || undefined,
    });
  };

  const handleFechaInicioChange = (value: string) => {
    setFechaInicio(value);
    onFilterChange({
      ...filters,
      fechaInicio: value || undefined,
    });
  };

  const handleFechaFinChange = (value: string) => {
    setFechaFin(value);
    onFilterChange({
      ...filters,
      fechaFin: value || undefined,
    });
  };

  const handleClienteChange = (value: string) => {
    setClienteId(value);
    onFilterChange({
      ...filters,
      clienteId: value ? parseInt(value) : undefined,
    });
  };

  const handleClear = () => {
    setSearch('');
    setEstado('');
    setFechaInicio('');
    setFechaFin('');
    setClienteId('');
    onClearFilters();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            placeholder="House, destinatario..."
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={estado}
            onChange={(e) => handleEstadoChange(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_bodega">En Bodega</option>
            <option value="en_ruta">En Ruta</option>
            <option value="entregado">Entregado</option>
            <option value="incidencia">Incidencia</option>
          </select>
        </div>

        {/* Fecha Inicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Desde
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={fechaInicio}
            onChange={(e) => handleFechaInicioChange(e.target.value)}
          />
        </div>

        {/* Fecha Fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Hasta
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={fechaFin}
            onChange={(e) => handleFechaFinChange(e.target.value)}
          />
        </div>

        {/* Filtro por Cliente (opcional) */}
        {showClienteFilter && (
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente ID
            </label>
            <input
              type="number"
              placeholder="ID del cliente"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={clienteId}
              onChange={(e) => handleClienteChange(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Botón limpiar */}
      <div className="mt-3 flex justify-end">
        <button
          onClick={handleClear}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};