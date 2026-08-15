/**
 * @fileoverview Componente para importar manifiesto con mapeo flexible de columnas
 * @module components/envios/ImportarManifiesto
 */

import React, { useState } from 'react';
import { importacionApi, ColumnaMapeo } from '../../api/importacion.api';

export interface ImportarManifiestoProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export const ImportarManifiesto: React.FC<ImportarManifiestoProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [file, setFile] = useState<File | null>(null);
  const [columnasExcel, setColumnasExcel] = useState<string[]>([]);
  const [clienteId, setClienteId] = useState<number>(1);
  const [mapeo, setMapeo] = useState<ColumnaMapeo>({
    house: '',
    descripcion: '',
    peso: '',
    bultos: '',
    remitente_nombre: '',
    remitente_passport: '',
    destinatario_nombre: '',
    destinatario_identificacion: '',
    destinatario_telefono: '',
    destinatario_direccion: '',
    cobrado_origen: '',
    unidad_destino: '',
  });
  const [vistaPrevia, setVistaPrevia] = useState<Record<string, string | number>[]>([]);
  const [erroresVista, setErroresVista] = useState<{ fila: number; errores: string[] }[]>([]);
  const [loading, setLoading] = useState(false);

  const camposRequeridos: Array<{ key: keyof ColumnaMapeo; label: string }> = [
    { key: 'house', label: 'House' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'peso', label: 'Peso (kg)' },
    { key: 'bultos', label: 'Bultos' },
    { key: 'remitente_nombre', label: 'Remitente' },
    { key: 'destinatario_nombre', label: 'Destinatario' },
    { key: 'destinatario_identificacion', label: 'Carnet de Identidad' },
    { key: 'destinatario_telefono', label: 'Teléfono' },
    { key: 'destinatario_direccion', label: 'Dirección' },
    { key: 'unidad_destino', label: 'Unidad de destino' },
  ];

  const camposOpcionales: Array<{ key: keyof ColumnaMapeo; label: string }> = [
    { key: 'remitente_passport', label: 'Passport' },
    { key: 'cobrado_origen', label: 'Cobrado/No Cobrado' },
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    try {
      const columnas = await importacionApi.obtenerColumnas(selectedFile);
      setColumnasExcel(columnas);
      const autoMapeo: Partial<ColumnaMapeo> = {};
      camposRequeridos.forEach(({ key, label }) => {
        const match = columnas.find((col) =>
          col.toLowerCase().includes(label.toLowerCase()) ||
          label.toLowerCase().includes(col.toLowerCase())
        );
        if (match) autoMapeo[key] = match as ColumnaMapeo[typeof key];
      });
      camposOpcionales.forEach(({ key, label }) => {
        const match = columnas.find((col) =>
          col.toLowerCase().includes(label.toLowerCase()) ||
          label.toLowerCase().includes(col.toLowerCase())
        );
        if (match) autoMapeo[key] = match as ColumnaMapeo[typeof key];
      });
      setMapeo({ ...mapeo, ...autoMapeo });
      setStep(2);
    } catch (error) {
      alert('Error al leer el archivo. Verifique que sea un Excel válido.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerVistaPrevia = async () => {
    const camposFaltantes = camposRequeridos.filter(
      ({ key }) => !mapeo[key]
    );
    if (camposFaltantes.length > 0) {
      alert(
        `Faltan mapear los siguientes campos obligatorios:\n${camposFaltantes
          .map(({ label }) => `- ${label}`)
          .join('\n')}`
      );
      return;
    }

    if (!file) return;

    setLoading(true);
    try {
      const result = await importacionApi.obtenerVistaPrevia(file, mapeo, clienteId);
      setVistaPrevia(result.filas);
      setErroresVista(result.errores);
      setStep(3);
    } catch (error) {
      alert('Error al generar la vista previa');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarImportacion = async () => {
    if (!file) return;

    setLoading(true);
    try {
      await importacionApi.importar(file, mapeo, clienteId);
      alert('✅ Importación completada exitosamente');
      onImportComplete();
      onClose();
    } catch (error) {
      alert('Error al importar el archivo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFile(null);
    setColumnasExcel([]);
    setVistaPrevia([]);
    setErroresVista([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">📂 Importar Manifiesto</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="ID del cliente"
                  value={clienteId}
                  onChange={(e) => setClienteId(parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo Excel
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="w-full border rounded-lg px-3 py-2"
                  onChange={handleFileSelect}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceptados: .xlsx, .xls
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  📌 Asigne cada campo del sistema a la columna correspondiente del Excel.
                  Los campos marcados con * son obligatorios.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {camposRequeridos.map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                      value={mapeo[key] || ''}
                      onChange={(e) =>
                        setMapeo({ ...mapeo, [key]: e.target.value as ColumnaMapeo[typeof key] })
                      }
                    >
                      <option value="">Seleccionar columna...</option>
                      {columnasExcel.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {camposOpcionales.map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label} <span className="text-gray-400">(opcional)</span>
                    </label>
                    <select
                      className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                      value={mapeo[key] || ''}
                      onChange={(e) =>
                        setMapeo({ ...mapeo, [key]: e.target.value as ColumnaMapeo[typeof key] })
                      }
                    >
                      <option value="">Seleccionar columna...</option>
                      {columnasExcel.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600">
                    Total: {vistaPrevia.length} registros
                  </span>
                  {erroresVista.length > 0 && (
                    <span className="ml-4 text-sm text-red-600">
                      ⚠️ {erroresVista.length} con errores
                    </span>
                  )}
                </div>
                <button
                  onClick={handleVerVistaPrevia}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  🔄 Actualizar vista previa
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left">#</th>
                      <th className="px-3 py-2 text-left">House</th>
                      <th className="px-3 py-2 text-left">Destinatario</th>
                      <th className="px-3 py-2 text-left">Peso</th>
                      <th className="px-3 py-2 text-left">Estado</th>
                      <th className="px-3 py-2 text-left">Errores</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vistaPrevia.map((fila, index) => {
                      const erroresFila = erroresVista.filter((e) => e.fila === index + 1);
                      const hasError = erroresFila.length > 0;
                      return (
                        <tr key={index} className={hasError ? 'bg-red-50' : ''}>
                          <td className="px-3 py-2">{index + 1}</td>
                          <td className="px-3 py-2 font-mono">{fila.house || '-'}</td>
                          <td className="px-3 py-2">{fila.destinatario_nombre || '-'}</td>
                          <td className="px-3 py-2">{fila.peso || '-'}</td>
                          <td className="px-3 py-2">
                            {hasError ? (
                              <span className="text-red-600">❌ Error</span>
                            ) : (
                              <span className="text-green-600">✅ Válido</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-xs text-red-600 max-w-xs">
                            {erroresFila.map((e, i) => (
                              <div key={i}>• {e.errores.join(', ')}</div>
                            ))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-between">
          <button
            onClick={step > 1 ? () => setStep(step - 1 as 1 | 2) : handleClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {step > 1 ? '⬅ Atrás' : 'Cancelar'}
          </button>

          <div className="flex gap-2">
            {step === 1 && (
              <button
                onClick={() => { if (file) setStep(2); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!file || loading}
              >
                {loading ? 'Cargando...' : 'Siguiente ➡'}
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleVerVistaPrevia}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Generando...' : 'Ver vista previa ➡'}
              </button>
            )}

            {step === 3 && (
              <button
                onClick={handleConfirmarImportacion}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                disabled={loading || erroresVista.length > 0}
              >
                {loading ? 'Importando...' : '✅ Confirmar importación'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};