/**
 * @fileoverview Componente para visualizar el historial de envíos de un cliente
 * @module components/envios/HistorialCliente
 */

import React, { useState, useEffect, useCallback } from 'react';
import { envioApi, Envio } from '../../api/envio.api';

export interface HistorialClienteProps {
  clienteId: number;
  clienteNombre?: string;
  onClose: () => void;
}

export const HistorialCliente: React.FC<HistorialClienteProps> = ({
  clienteId,
  clienteNombre,
  onClose,
}) => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState<string>('');
  const [filtroFechaFin, setFiltroFechaFin] = useState<string>('');

  const cargarHistorial = useCallback(async () => {
    try {
      setLoading(true);
      const data = await envioApi.getHistorialByCliente(clienteId);
      setEnvios(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar el historial del cliente');
      console.error('Error al cargar historial:', err);
    } finally {
      setLoading(false);
    }
  }, [clienteId]);

  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

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

  const getEstadoAduanaLabel = (estado: string) => {
    const labels: Record<string, string> = {
      pendiente: '⏳ Pendiente',
      consultado: '✅ Consultada',
      error: '❌ Error',
    };
    return labels[estado] || estado;
  };

  const enviosFiltrados = envios.filter((envio) => {
    let match = true;
    if (filtroEstado && envio.estado !== filtroEstado) match = false;
    if (filtroFechaInicio && new Date(envio.created_at) < new Date(filtroFechaInicio)) match = false;
    if (filtroFechaFin && new Date(envio.created_at) > new Date(filtroFechaFin)) match = false;
    return match;
  });

  const estadisticas = {
    total: envios.length,
    entregados: envios.filter((e) => e.estado === 'entregado').length,
    enRuta: envios.filter((e) => e.estado === 'en_ruta').length,
    pendientes: envios.filter((e) => e.estado === 'pendiente').length,
    incidencias: envios.filter((e) => e.estado === 'incidencia').length,
  };

  const exportarCSV = () => {
    const headers = [
      'House',
      'Destinatario',
      'Dirección',
      'Peso (kg)',
      'Estado',
      'Prioridad',
      'Costo Aduana',
      'Fecha Creación',
    ];

    const rows = enviosFiltrados.map((envio) => [
      envio.house,
      envio.destinatario_nombre,
      envio.destinatario_direccion,
      envio.peso,
      getEstadoLabel(envio.estado),
      envio.prioridad,
      envio.costo_aduana ? envio.costo_aduana.toFixed(2) : 'N/A',
      new Date(envio.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_cliente_${clienteId}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportarPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">Cargando historial...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            📋 Historial de Envíos
            {clienteNombre && <span className="text-sm font-normal text-gray-500 ml-2">- {clienteNombre}</span>}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Mostrar error si existe */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-2xl font-bold">{estadisticas.total}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Entregados</div>
              <div className="text-2xl font-bold text-green-600">{estadisticas.entregados}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">En Ruta</div>
              <div className="text-2xl font-bold text-purple-600">{estadisticas.enRuta}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Pendientes</div>
              <div className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Incidencias</div>
              <div className="text-2xl font-bold text-red-600">{estadisticas.incidencias}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_bodega">En Bodega</option>
                <option value="en_ruta">En Ruta</option>
                <option value="entregado">Entregado</option>
                <option value="incidencia">Incidencia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={filtroFechaInicio}
                onChange={(e) => setFiltroFechaInicio(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={filtroFechaFin}
                onChange={(e) => setFiltroFechaFin(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={() => {
                  setFiltroEstado('');
                  setFiltroFechaInicio('');
                  setFiltroFechaFin('');
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
              >
                Limpiar
              </button>
            </div>
          </div>

          {enviosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay envíos en el historial
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">House</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinatario</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aduana</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enviosFiltrados.map((envio) => (
                    <tr key={envio.id_envio} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-sm font-medium text-gray-900">
                        {envio.house}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {envio.destinatario_nombre}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">
                        {envio.destinatario_direccion}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {envio.peso} kg
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(envio.estado)}`}>
                          {getEstadoLabel(envio.estado)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {envio.costo_aduana ? `$${envio.costo_aduana.toFixed(2)}` : 'N/A'}
                        <span className="ml-1 text-xs text-gray-400">
                          {getEstadoAduanaLabel(envio.estado_aduana)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(envio.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <div className="text-sm text-gray-500">
              Mostrando {enviosFiltrados.length} de {envios.length} envíos
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportarCSV}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2"
              >
                📄 Exportar CSV
              </button>
              <button
                onClick={exportarPDF}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2"
              >
                📄 Exportar PDF
              </button>
              <button
                onClick={cargarHistorial}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};