/**
 * @fileoverview Componente de lista de envíos en tabla
 * @module components/envios/EnvioList
 */

import React from 'react';

export interface Envio {
  id_envio: number;
  house: string;
  destinatario_nombre: string;
  destinatario_direccion: string;
  peso: number;
  estado: 'pendiente' | 'en_bodega' | 'en_ruta' | 'entregado' | 'incidencia';
  prioridad: 'urgente' | 'normal' | 'economico';
  costo_aduana?: number;
  created_at: string;
}

export interface EnvioListProps {
  envios: Envio[];
  onUpdateEstado: (id: number, estado: string) => void;
  onDelete: (id: number) => void;
  onViewDetail?: (id: number) => void;
  loading?: boolean;
}

export const EnvioList: React.FC<EnvioListProps> = ({
  envios,
  onUpdateEstado,
  onDelete,
  onViewDetail,
  loading = false,
}) => {
  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_bodega: 'bg-blue-100 text-blue-800',
      en_ruta: 'bg-purple-100 text-purple-800',
      entregado: 'bg-green-100 text-green-800',
      incidencia: 'bg-red-100 text-red-800',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  const getEstadoLabel = (estado: string) => {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      en_bodega: 'En Bodega',
      en_ruta: 'En Ruta',
      entregado: 'Entregado',
      incidencia: 'Incidencia',
    };
    return labels[estado] || estado;
  };

  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      urgente: 'text-red-600 font-bold',
      normal: 'text-blue-600',
      economico: 'text-gray-500',
    };
    return colors[prioridad] || 'text-gray-600';
  };

  const getPrioridadLabel = (prioridad: string) => {
    const labels: Record<string, string> = {
      urgente: 'Urgente',
      normal: 'Normal',
      economico: 'Económico',
    };
    return labels[prioridad] || prioridad;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center text-gray-500">Cargando envíos...</div>
      </div>
    );
  }

  if (envios.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center text-gray-500">
          No hay envíos registrados. Importe un manifiesto desde Excel o cree uno manualmente.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              House
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destinatario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dirección
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Peso
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioridad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {envios.map((envio) => (
            <tr key={envio.id_envio} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {envio.house}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {envio.destinatario_nombre}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                {envio.destinatario_direccion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {envio.peso} kg
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(envio.estado)}`}>
                  {getEstadoLabel(envio.estado)}
                </span>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPrioridadColor(envio.prioridad)}`}>
                {getPrioridadLabel(envio.prioridad)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center gap-2">
                  {onViewDetail && (
                    <button
                      onClick={() => onViewDetail(envio.id_envio)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Ver detalle"
                    >
                      👁️
                    </button>
                  )}
                  <select
                    className="text-xs border rounded px-2 py-1"
                    onChange={(e) => onUpdateEstado(envio.id_envio, e.target.value)}
                    value={envio.estado}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_bodega">En Bodega</option>
                    <option value="en_ruta">En Ruta</option>
                    <option value="entregado">Entregado</option>
                    <option value="incidencia">Incidencia</option>
                  </select>
                  <button
                    onClick={() => onDelete(envio.id_envio)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};