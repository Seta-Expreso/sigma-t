/**
 * @fileoverview Servicio de Rutas
 * @module services/ruta
 */

import { AppDataSource } from '../config/database.config.js';
import { Ruta, EstadoRuta, Parada, FichaCosto } from '../models/ruta.model.js';
import { Envio, EstadoEnvio } from '../models/envio.model.js';
import { Vehiculo } from '../models/vehiculo.model.js';
import { Chofer } from '../models/chofer.model.js';
import { getRoute, getDistanceMatrix } from '../config/osrm.config.js';
import { geocodeAddress } from './geocoding.service.js';

interface ReoptimizacionData {
  envio_id?: number;
  motivo: string;
}

export class RutaService {
  private rutaRepository = AppDataSource.getRepository(Ruta);
  private envioRepository = AppDataSource.getRepository(Envio);
  private vehiculoRepository = AppDataSource.getRepository(Vehiculo);
  private choferRepository = AppDataSource.getRepository(Chofer);

  /**
   * Optimizar rutas para una semana
   */
  async optimizarSemana(fechaInicio: Date, dias: number = 7): Promise<Ruta[]> {
    const rutas: Ruta[] = [];

    // 1. Obtener envíos pendientes
    const envios = await this.envioRepository.find({
      where: { estado: EstadoEnvio.PENDIENTE },
      relations: ['cliente'],
    });

    if (envios.length === 0) {
      return rutas;
    }

    // 2. Geocodificar direcciones
    const direcciones = envios.map(e => e.destinatario_direccion);
    const coordenadas = await Promise.all(
      direcciones.map(async (dir) => {
        const result = await geocodeAddress(dir);
        return result ? { lat: result.lat, lng: result.lng } : null;
      })
    );

    // 3. Filtrar envíos con coordenadas válidas
    const enviosValidos = envios.filter((_, i) => coordenadas[i] !== null);
    const coordsValidas = coordenadas.filter(c => c !== null) as Array<{ lat: number; lng: number }>;

    if (enviosValidos.length === 0) {
      return rutas;
    }

    // 4. Calcular matriz de distancias
    const matrizDistancias = await getDistanceMatrix(coordsValidas, coordsValidas);

    // 5. Optimizar rutas (VRPTW simplificado)
    const rutasOptimizadas = await this.ejecutarVRPTW(enviosValidos, matrizDistancias, coordsValidas);

    // 6. Guardar rutas
    for (const rutaData of rutasOptimizadas) {
      const ruta = this.rutaRepository.create({
        ...rutaData,
        estado: 'planificada' as EstadoRuta,
      });
      const saved = await this.rutaRepository.save(ruta);
      rutas.push(saved);

      // 7. Actualizar envíos con la ruta asignada
      for (const parada of rutaData.secuencia_paradas) {
        await this.envioRepository.update(
          { id_envio: parada.envio_id },
          { id_ruta: saved.id_ruta, estado: EstadoEnvio.EN_RUTA }
        );
      }
    }

    return rutas;
  }

  /**
   * Ejecutar algoritmo VRPTW
   */
  private async ejecutarVRPTW(
    envios: Envio[],
    matrizDistancias: number[][],
    coordenadas: Array<{ lat: number; lng: number }>
  ): Promise<Array<Partial<Ruta>>> {
    // TODO: Implementar algoritmo VRPTW completo
    // Por ahora, asignación simple (1 ruta con todos los envíos)
    const paradas: Parada[] = envios.map((envio, index) => ({
      orden: index + 1,
      envio_id: envio.id_envio,
      house: envio.house,
      destinatario: envio.destinatario_nombre,
      direccion: envio.destinatario_direccion,
      lat: coordenadas[index].lat,
      lng: coordenadas[index].lng,
    }));

    const distanciaTotal = matrizDistancias.reduce((sum, row) => {
      const rowSum = row.reduce((s, d) => s + d, 0);
      return sum + rowSum;
    }, 0);

    return [
      {
        secuencia_paradas: paradas,
        distancia_total: distanciaTotal,
        tiempo_estimado: Math.round(distanciaTotal / 50 * 60), // 50 km/h promedio
        costo_total_estimado: distanciaTotal * 10, // $10 por km
      },
    ];
  }

  /**
   * Obtener rutas de una semana
   */
  async getRutasSemana(fecha: Date): Promise<Ruta[]> {
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 6);
    fin.setHours(23, 59, 59, 999);

    return await this.rutaRepository.find({
      where: {
        fecha: {
          between: [inicio, fin],
        },
      },
      relations: ['vehiculo', 'chofer'],
      order: { fecha: 'ASC' },
    });
  }

  /**
   * Obtener detalle de una ruta
   */
  async findById(id: number): Promise<Ruta | null> {
    return await this.rutaRepository.findOne({
      where: { id_ruta: id },
      relations: ['vehiculo', 'chofer'],
    });
  }

  /**
   * Asignar chofer a una ruta
   */
  async asignarChofer(id: number, choferId: number): Promise<Ruta | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    const chofer = await this.choferRepository.findOne({
      where: { id_chofer: choferId },
    });

    if (!chofer) {
      throw new Error('Chofer no encontrado');
    }

    ruta.id_chofer = choferId;
    return await this.rutaRepository.save(ruta);
  }

  /**
   * Actualizar ruta
   */
  async update(id: number, data: Partial<Ruta>): Promise<Ruta | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    Object.assign(ruta, data);
    return await this.rutaRepository.save(ruta);
  }

  /**
   * Generar manifiesto de ruta
   */
  async generarManifiesto(id: number): Promise<{ ruta: Ruta; paradas: Parada[] } | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    return {
      ruta,
      paradas: ruta.secuencia_paradas,
    };
  }

  /**
   * Reoptimizar ruta ante incidencia
   */
  async reoptimizar(id: number, data: ReoptimizacionData): Promise<Ruta | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    // TODO: Implementar reoptimización real
    // Por ahora, solo marcar que se reoptimizó
    ruta.analisis_post_ruta = {
      ...ruta.analisis_post_ruta,
      reoptimizaciones: (ruta.analisis_post_ruta?.reoptimizaciones || 0) + 1,
      incidencias: [
        ...(ruta.analisis_post_ruta?.incidencias || []),
        {
          tipo: 'reoptimizacion',
          descripcion: data.motivo,
          hora: new Date().toISOString(),
        },
      ],
    };

    return await this.rutaRepository.save(ruta);
  }

  /**
   * Obtener ficha de costo de una ruta
   */
  async getFichaCosto(id: number): Promise<FichaCosto | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    if (ruta.ficha_costo) {
      return ruta.ficha_costo;
    }

    // TODO: Calcular ficha de costo completa
    return {
      resumen: {
        distancia: ruta.distancia_total,
        entregas: ruta.secuencia_paradas.length,
        vehiculo: ruta.vehiculo?.matricula || 'No asignado',
        chofer: ruta.chofer?.nombre || 'No asignado',
        fecha: ruta.fecha,
        ingresos: ruta.ingresos || 0,
      },
      costos_directos: {
        combustible: { monto: 0, cantidad: 0, unidad: 'L' },
        peajes: { monto: 0, cantidad: 0, unidad: 'viaje' },
        mantenimiento: { monto: 0, cantidad: 0, unidad: 'km' },
        neumaticos: { monto: 0, cantidad: 0, unidad: 'km' },
        salario: { monto: 0, cantidad: 0, unidad: 'viaje' },
        subtotal: 0,
      },
      costos_indirectos: {
        depreciacion: { monto: 0, cantidad: 0, unidad: 'km' },
        seguro: { monto: 0, cantidad: 0, unidad: 'km' },
        administrativo: { monto: 0, cantidad: 0, unidad: 'km' },
        impuestos: { monto: 0, cantidad: 0, unidad: 'km' },
        subtotal: 0,
      },
      costos_importacion: {
        aduana: { monto: 0, cantidad: 0, unidad: 'envios' },
        subtotal: 0,
      },
      totales: {
        total_general: 0,
        utilidad_neta: 0,
        margen_utilidad: 0,
      },
    };
  }

  /**
   * Exportar ficha de costo a PDF
   */
  async exportarFichaCostoPDF(id: number): Promise<Buffer | null> {
    const ficha = await this.getFichaCosto(id);
    if (!ficha) return null;

    // TODO: Generar PDF con PDFKit
    return Buffer.from('PDF generado');
  }

  /**
   * Exportar ficha de costo a CSV
   */
  async exportarFichaCostoCSV(id: number): Promise<string | null> {
    const ficha = await this.getFichaCosto(id);
    if (!ficha) return null;

    // Generar CSV simple
    const lines = [
      'Concepto,Monto,Unidad',
      `Distancia,${ficha.resumen.distancia},km`,
      `Entregas,${ficha.resumen.entregas},unidades`,
      `Combustible,${ficha.costos_directos.combustible.monto},${ficha.costos_directos.combustible.unidad}`,
      `Mantenimiento,${ficha.costos_directos.mantenimiento.monto},${ficha.costos_directos.mantenimiento.unidad}`,
      `Total Costos,${ficha.totales.total_general},CUP`,
      `Utilidad,${ficha.totales.utilidad_neta},CUP`,
      `Margen,${ficha.totales.margen_utilidad},%`,
    ];

    return lines.join('\n');
  }
}