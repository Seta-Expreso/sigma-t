/**
 * @fileoverview Página de gestión de envíos
 * @module pages/EnviosPage
 */

import React, { useState, useEffect } from 'react';
import { envioApi, Envio, EnvioFilters } from '../api/envio.api';
import { importacionApi } from '../api/importacion.api';

export const EnviosPage: React.FC = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EnvioFilters>({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clienteId, setClienteId] = useState<number>(1);
  const [importResult, setImportResult] = useState<any>(null);
  const [estadisticas, setEstadisticas] = useState<any>(null);

  // Cargar envíos al montar el componente
  useEffect(() => {
    cargarEnvios();
    cargarEstadisticas();
  }, [filters]);

  const cargarEnvios = async () => {
    try {
      setLoading(true);
      const data = await envioApi.getAll(filters);
      setEnvios(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los envíos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const data = await envioApi.getEstadisticas();
      setEstadisticas(data);
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert('Seleccione un archivo Excel');
      return;
    }

    try {
      setLoading(true);
      const result = await importacionApi.importarExcel(selectedFile, clienteId);
      setImportResult(result);
      await cargarEnvios();
      await cargarEstadisticas();
      setShowImportModal(false);
      setSelectedFile(null);
    } catch (err) {
      alert('Error al importar el archivo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este envío?')) return;

    try {
      await envioApi.delete(id);
      await cargarEnvios();
      await cargarEstadisticas();
    } catch (err) {
      alert('Error al eliminar el envío');
      console.error(err);
    }
  };

  const handleUpdateEstado = async (id: number, estado: string) => {
    try {
      await envioApi.updateEstado(id, estado);
      await cargarEnvios();
      await cargarEstadisticas();
    } catch (err) {
      alert('Error al actualizar el estado');
      console.error(err);
    }
  };

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

  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      urgente: 'text-red-600 font-bold',
      normal: 'text-blue-600',
      economico: 'text-gray-500',
    };
    return colors[prioridad] || 'text-gray-600';
  };

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 Gestión de Envíos</h1>
        <button
          onClick={() => setShowImportModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>📤</span> Importar Excel
        </button>
      </div>

      {/* Estadísticas */}
      {estadisticas && (
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold">{estadisticas.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Pendientes</div>
            <div className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">En Ruta</div>
            <div className="text-2xl font-bold text-purple-600">{estadisticas.enRuta}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Entregados</div>
            <div className="text-2xl font-bold text-green-600">{estadisticas.entregados}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Incidencias</div>
            <div className="text-2xl font-bold text-red-600">{estadisticas.incidencias}</div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por House, destinatario..."
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setFilters({ ...filters, estado: e.target.value || undefined })}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_bodega">En Bodega</option>
            <option value="en_ruta">En Ruta</option>
            <option value="entregado">Entregado</option>
            <option value="incidencia">Incidencia</option>
          </select>
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value || undefined })}
          />
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value || undefined })}
          />
        </div>
        <button
          onClick={() => setFilters({})}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Tabla de envíos */}
      {loading ? (
        <div className="text-center py-12">Cargando envíos...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : envios.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay envíos registrados. Importe un manifiesto desde Excel o cree uno manualmente.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">House</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinatario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {envios.map((envio) => (
                <tr key={envio.id_envio} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{envio.house}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{envio.destinatario_nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{envio.destinatario_direccion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{envio.peso} kg</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(envio.estado)}`}>
                      {envio.estado.replace('_', ' ')}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPrioridadColor(envio.prioridad)}`}>
                    {envio.prioridad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <select
                        className="text-xs border rounded px-2 py-1"
                        onChange={(e) => handleUpdateEstado(envio.id_envio, e.target.value)}
                        value={envio.estado}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_bodega">En Bodega</option>
                        <option value="en_ruta">En Ruta</option>
                        <option value="entregado">Entregado</option>
                        <option value="incidencia">Incidencia</option>
                      </select>
                      <button
                        onClick={() => handleDelete(envio.id_envio)}
                        className="text-red-600 hover:text-red-800"
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
      )}

      {/* Modal de importación */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">📤 Importar Manifiesto</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="ID del cliente"
                value={clienteId}
                onChange={(e) => setClienteId(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Archivo Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                className="w-full border rounded-lg px-3 py-2"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">Formatos aceptados: .xlsx, .xls</p>
            </div>

            {importResult && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">Importados:</span> {importResult.importados} de {importResult.total}
                </p>
                {importResult.errores.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-red-600">Errores: {importResult.errores.length}</p>
                    <div className="max-h-32 overflow-y-auto text-xs text-gray-600">
                      {importResult.errores.map((err: any, i: number) => (
                        <div key={i}>Fila {err.fila}: {err.error}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Importando...' : 'Importar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};