/**
 * @fileoverview Página de gestión de envíos
 * @module pages/EnviosPage
 */

import React, { useState, useEffect } from 'react';
import { envioApi, Envio, EnvioFilters } from '../api/envio.api';
import { EnvioList } from '../components/envios/EnvioList';
import { EnvioFilters as EnvioFiltersComponent } from '../components/envios/EnvioFilters';
import { EnvioDetail, EnvioDetailData } from '../components/envios/EnvioDetail';
import { HistorialCliente } from '../components/envios/HistorialCliente';
import { ImportarManifiesto } from '../components/envios/ImportarManifiesto';

export const EnviosPage: React.FC = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EnvioFilters>({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [clienteHistorialId, setClienteHistorialId] = useState<number>(1);
  const [selectedEnvio, setSelectedEnvio] = useState<EnvioDetailData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [estadisticas, setEstadisticas] = useState<{
    total: number;
    pendientes: number;
    enRuta: number;
    entregados: number;
    incidencias: number;
  } | null>(null);

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

  useEffect(() => {
    cargarEnvios();
    cargarEstadisticas();
  }, [filters]);

  const handleFilterChange = (newFilters: EnvioFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleViewDetail = async (id: number) => {
    try {
      setDetailLoading(true);
      const data = await envioApi.getById(id);
      setSelectedEnvio(data as EnvioDetailData);
      setShowDetailModal(true);
    } catch (err) {
      alert('Error al cargar el detalle del envío');
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedEnvio(null);
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
      if (showDetailModal && selectedEnvio) {
        const updated = await envioApi.getById(id);
        setSelectedEnvio(updated as EnvioDetailData);
      }
    } catch (err) {
      alert('Error al actualizar el estado');
      console.error(err);
    }
  };

  const handleImportComplete = () => {
    cargarEnvios();
    cargarEstadisticas();
  };

  const handleHistorialConfirm = () => {
    if (clienteHistorialId > 0) {
      setShowHistorialModal(false);
      setTimeout(() => {
        setShowHistorialModal(true);
      }, 100);
    } else {
      alert('Ingrese un ID de cliente válido');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 Gestión de Envíos</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHistorialModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <span>📋</span> Historial por Cliente
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>📤</span> Importar Excel
          </button>
        </div>
      </div>

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

      <EnvioFiltersComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <EnvioList
          envios={envios}
          onUpdateEstado={handleUpdateEstado}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
          loading={loading}
        />
      )}

      <ImportarManifiesto
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportComplete={handleImportComplete}
      />

      {showHistorialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">📋 Ver Historial por Cliente</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID del Cliente
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ingrese el ID del cliente"
                value={clienteHistorialId}
                onChange={(e) => setClienteHistorialId(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowHistorialModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleHistorialConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ver Historial
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistorialModal && clienteHistorialId > 0 && (
        <HistorialCliente
          clienteId={clienteHistorialId}
          clienteNombre={`Cliente ID: ${clienteHistorialId}`}
          onClose={() => {
            setShowHistorialModal(false);
            setClienteHistorialId(1);
          }}
        />
      )}

      {showDetailModal && selectedEnvio && (
        <EnvioDetail
          envio={selectedEnvio}
          onClose={handleCloseDetail}
          onUpdateEstado={handleUpdateEstado}
          loading={detailLoading}
        />
      )}
    </div>
  );
};