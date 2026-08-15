/**
 * @fileoverview Componente de detalle de un envío
 * @module components/envios/EnvioDetail
 */

import React from 'react';

export interface EnvioDetailData {
  id_envio: number;
  house: string;
  awb?: string;
  descripcion: string;
  peso: number;
  volumen: number;
  bultos: number;
  remitente_nombre: string;
  remitente_passport?: string;
  destinatario_nombre: string;
  destinatario_direccion: string;
  destinatario_telefono: string;
  destinatario_identificacion?: string;
  cobrado_origen: boolean;
  unidad_destino?: string;
  prioridad: 'urgente' | 'normal' | 'economico';
  estado: 'pendiente' | 'en_bodega' | 'en_ruta' | 'entregado' | 'incidencia';
  incidencia?: string;
  costo_aduana?: number;
  costo_importacion?: number;
  estado_aduana: 'pendiente' | 'consultado' | 'error';
  fecha_entrega_real?: string;
  created_at: string;
  cliente?: {
    id_cliente: number;
    nombre_empresa: string;
  };
}

export interface EnvioDetailProps {
  envio: EnvioDetailData;
  onClose: () => void;
  onEdit?: (id: number) => void;
  onUpdateEstado?: (id: number, estado: string) => void;
  loading?: boolean;
}

export const EnvioDetail: React.FC<EnvioDetailProps> = ({
  envio,
  onClose,
  onEdit,
  onUpdateEstado,
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

  const getPrioridadLabel = (prioridad: string) => {
    const labels: Record<string, string> = {
      urgente: 'Urgente',
      normal: 'Normal',
      economico: 'Económico',
    };
    return labels[prioridad] || prioridad;
  };

  const getAduanaColor = (estado: string) => {
    const colors: Record<string, string> = {
      pendiente: 'text-yellow-600',
      consultado: 'text-green-600',
      error: 'text-red-600',
    };
    return colors[estado] || 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">Cargando detalle...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Encabezado */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            📦 Envío {envio.house}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información del envío */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Información del Envío</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">House:</span>
                <span className="font-medium">{envio.house}</span>
                <span className="text-gray-500">AWB:</span>
                <span>{envio.awb || 'N/A'}</span>
                <span className="text-gray-500">Descripción:</span>
                <span>{envio.descripcion}</span>
                <span className="text-gray-500">Peso:</span>
                <span>{envio.peso} kg</span>
                <span className="text-gray-500">Volumen:</span>
                <span>{envio.volumen} m³</span>
                <span className="text-gray-500">Bultos:</span>
                <span>{envio.bultos}</span>
                <span className="text-gray-500">Prioridad:</span>
                <span>{getPrioridadLabel(envio.prioridad)}</span>
                <span className="text-gray-500">Estado:</span>
                <span className={`px-2 py-1 text-xs rounded-full inline-block ${getEstadoColor(envio.estado)}`}>
                  {getEstadoLabel(envio.estado)}
                </span>
                <span className="text-gray-500">Unidad destino:</span>
                <span>{envio.unidad_destino || 'N/A'}</span>
                <span className="text-gray-500">Cobrado origen:</span>
                <span>{envio.cobrado_origen ? '✅ Sí' : '❌ No'}</span>
              </div>
            </div>

            {/* Cliente */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Cliente</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">ID:</span>
                <span>{envio.cliente?.id_cliente || 'N/A'}</span>
                <span className="text-gray-500">Empresa:</span>
                <span className="font-medium">{envio.cliente?.nombre_empresa || 'N/A'}</span>
              </div>
            </div>

            {/* Remitente */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Remitente</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">Nombre:</span>
                <span className="font-medium">{envio.remitente_nombre}</span>
                <span className="text-gray-500">Passport:</span>
                <span>{envio.remitente_passport || 'N/A'}</span>
              </div>
            </div>

            {/* Destinatario */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Destinatario</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">Nombre:</span>
                <span className="font-medium">{envio.destinatario_nombre}</span>
                <span className="text-gray-500">Identificación:</span>
                <span>{envio.destinatario_identificacion || 'N/A'}</span>
                <span className="text-gray-500">Teléfono:</span>
                <span>{envio.destinatario_telefono}</span>
                <span className="text-gray-500">Dirección:</span>
                <span className="col-span-1">{envio.destinatario_direccion}</span>
              </div>
            </div>

            {/* Costos */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Costos</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">Costo Aduana:</span>
                <span className="font-medium">
                  {envio.costo_aduana ? `$${envio.costo_aduana.toFixed(2)}` : 'Pendiente'}
                </span>
                <span className="text-gray-500">Estado Aduana:</span>
                <span className={getAduanaColor(envio.estado_aduana)}>
                  {envio.estado_aduana === 'pendiente' ? '⏳ Pendiente' :
                   envio.estado_aduana === 'consultado' ? '✅ Consultada' :
                   '❌ Error'}
                </span>
                <span className="text-gray-500">Costo Importación:</span>
                <span>{envio.costo_importacion ? `$${envio.costo_importacion.toFixed(2)}` : 'N/A'}</span>
              </div>
            </div>

            {/* Fechas */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 border-b pb-2">Fechas</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">Creado:</span>
                <span>{new Date(envio.created_at).toLocaleString()}</span>
                <span className="text-gray-500">Entrega real:</span>
                <span>
                  {envio.fecha_entrega_real
                    ? new Date(envio.fecha_entrega_real).toLocaleString()
                    : 'Pendiente'}
                </span>
              </div>
            </div>

            {/* Incidencia */}
            {envio.incidencia && (
              <div className="col-span-full space-y-2">
                <h3 className="font-semibold text-gray-700 border-b pb-2">⚠️ Incidencia</h3>
                <p className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg">
                  {envio.incidencia}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
          {onUpdateEstado && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Cambiar estado:</label>
              <select
                className="border rounded-lg px-3 py-1 text-sm"
                onChange={(e) => onUpdateEstado(envio.id_envio, e.target.value)}
                value={envio.estado}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_bodega">En Bodega</option>
                <option value="en_ruta">En Ruta</option>
                <option value="entregado">Entregado</option>
                <option value="incidencia">Incidencia</option>
              </select>
            </div>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(envio.id_envio)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ✏️ Editar
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};