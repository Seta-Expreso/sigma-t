/**
 * @fileoverview Servicio de Importación de Manifiestos
 * @module services/importacion
 */

import * as XLSX from 'xlsx';
import { AppDataSource } from '../config/database.config.js';
import { Envio, EstadoEnvio } from '../models/envio.model.js';
import { Cliente } from '../models/cliente.model.js';

interface RegistroError {
  fila: number;
  house?: string;
  errores: string[];
}

interface ImportacionResultado {
  total: number;
  importados: number;
  errores: RegistroError[];
  envios: Envio[];
}

export class ImportacionService {
  private envioRepository = AppDataSource.getRepository(Envio);
  private clienteRepository = AppDataSource.getRepository(Cliente);

  async importarManifiesto(
    file: Express.Multer.File,
    mapeo: Record<string, string> | null
  ): Promise<ImportacionResultado> {
    if (!mapeo) {
      throw new Error('Se requiere el mapeo de columnas');
    }

    // ✅ Usar file.buffer correctamente
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const datos: Array<Record<string, unknown>> = XLSX.utils.sheet_to_json(worksheet);

    if (!datos || datos.length === 0) {
      throw new Error('El archivo no contiene datos');
    }

    const cliente = await this.clienteRepository.findOne({
      where: { activo: true },
      order: { id_cliente: 'ASC' },
    });

    if (!cliente) {
      throw new Error('No hay clientes activos en el sistema');
    }

    const enviosValidos: Array<Partial<Envio>> = [];
    const errores: RegistroError[] = [];

    for (let i = 0; i < datos.length; i++) {
      const fila = datos[i];
      const erroresFila: string[] = [];
      const envioData: Partial<Envio> = {
        id_cliente: cliente.id_cliente,
        estado: EstadoEnvio.PENDIENTE,
      };

      try {
        // House
        const house = this.obtenerValor(fila, mapeo.house);
        if (!house) {
          erroresFila.push('House es obligatorio');
        } else if (!/^CACC-[0-9]{8}$/.test(house)) {
          erroresFila.push('House debe tener formato CACC-XXXXXXXX');
        } else {
          const existente = await this.envioRepository.findOne({ where: { house } });
          if (existente) {
            erroresFila.push(`House "${house}" ya existe en el sistema`);
          }
          envioData.house = house;
        }

        // Descripción
        const descripcion = this.obtenerValor(fila, mapeo.descripcion);
        if (!descripcion) {
          erroresFila.push('Descripción es obligatoria');
        } else {
          envioData.descripcion = descripcion;
        }

        // Peso
        const peso = parseFloat(this.obtenerValor(fila, mapeo.peso));
        if (isNaN(peso) || peso <= 0) {
          erroresFila.push('Peso debe ser mayor a 0');
        } else {
          envioData.peso = peso;
        }

        // Bultos
        const bultos = parseInt(this.obtenerValor(fila, mapeo.bultos), 10);
        if (isNaN(bultos) || bultos <= 0) {
          erroresFila.push('Bultos debe ser mayor a 0');
        } else {
          envioData.bultos = bultos;
        }

        // Remitente
        const remitente = this.obtenerValor(fila, mapeo.remitente_nombre);
        if (!remitente) {
          erroresFila.push('Remitente es obligatorio');
        } else {
          envioData.remitente_nombre = remitente;
        }

        if (mapeo.remitente_passport) {
          const passport = this.obtenerValor(fila, mapeo.remitente_passport);
          if (passport) envioData.remitente_passport = passport;
        }

        // Destinatario
        const destinatario = this.obtenerValor(fila, mapeo.destinatario_nombre);
        if (!destinatario) {
          erroresFila.push('Destinatario es obligatorio');
        } else {
          envioData.destinatario_nombre = destinatario;
        }

        // Carnet
        const carnet = this.obtenerValor(fila, mapeo.destinatario_identificacion);
        if (!carnet) {
          erroresFila.push('Carnet de Identidad es obligatorio');
        } else if (!/^[0-9]{11}$/.test(carnet)) {
          erroresFila.push('Carnet de Identidad debe tener exactamente 11 dígitos');
        } else {
          envioData.destinatario_identificacion = carnet;
        }

        // Teléfono
        const telefono = this.obtenerValor(fila, mapeo.destinatario_telefono);
        if (!telefono) {
          erroresFila.push('Teléfono es obligatorio');
        } else {
          envioData.destinatario_telefono = telefono;
        }

        // Dirección
        const direccion = this.obtenerValor(fila, mapeo.destinatario_direccion);
        if (!direccion) {
          erroresFila.push('Dirección es obligatoria');
        } else {
          envioData.destinatario_direccion = direccion;
        }

        if (mapeo.cobrado_origen) {
          const cobrado = this.obtenerValor(fila, mapeo.cobrado_origen);
          envioData.cobrado_origen = cobrado === 'Si' || cobrado === 'Sí' || cobrado === 'true' || cobrado === 'TRUE';
        }

        // Unidad Destino
        const unidadDestino = this.obtenerValor(fila, mapeo.unidad_destino);
        if (!unidadDestino) {
          erroresFila.push('Unidad de Destino es obligatoria');
        } else {
          envioData.unidad_destino = unidadDestino;
        }

        if (mapeo.prioridad) {
          const prioridad = this.obtenerValor(fila, mapeo.prioridad)?.toLowerCase();
          if (prioridad && ['urgente', 'normal', 'economico'].includes(prioridad)) {
            envioData.prioridad = prioridad as 'urgente' | 'normal' | 'economico';
          }
        }
      } catch (error) {
        erroresFila.push(`Error procesando datos: ${(error as Error).message}`);
      }

      if (erroresFila.length === 0 && envioData.house) {
        enviosValidos.push(envioData);
      } else {
        errores.push({
          fila: i + 2,
          house: envioData.house || undefined,
          errores: erroresFila,
        });
      }
    }

    const enviosGuardados: Envio[] = [];
    for (const envioData of enviosValidos) {
      try {
        const envio = this.envioRepository.create(envioData);
        const guardado = await this.envioRepository.save(envio);
        enviosGuardados.push(guardado);
      } catch (error) {
        errores.push({
          fila: 0,
          house: envioData.house || undefined,
          errores: [`Error al guardar: ${(error as Error).message}`],
        });
      }
    }

    return {
      total: datos.length,
      importados: enviosGuardados.length,
      errores,
      envios: enviosGuardados,
    };
  }

  // ✅ Eliminar async si no tiene await, o usar async con await
  vistaPrevia(
    file: Express.Multer.File,
    mapeo: Record<string, string> | null
  ): { total: number; registros: Array<{ fila: number; datos: Record<string, unknown> }> } {
    if (!mapeo) {
      throw new Error('Se requiere el mapeo de columnas');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const datos: Array<Record<string, unknown>> = XLSX.utils.sheet_to_json(worksheet);

    const registros = datos.map((fila, index) => ({
      fila: index + 2,
      datos: fila,
    }));

    return {
      total: datos.length,
      registros,
    };
  }

  // ✅ Marcar parámetro no usado con _
  obtenerReporteErrores(_archivoId: string): { errores: string[] } {
    return {
      errores: ['Funcionalidad en desarrollo'],
    };
  }

  private obtenerValor(fila: Record<string, unknown>, columna: string | undefined): string {
    if (!columna) return '';
    const valor = fila[columna];
    if (valor === undefined || valor === null) return '';
    return String(valor).trim();
  }
}