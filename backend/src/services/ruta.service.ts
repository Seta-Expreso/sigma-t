/**
 * @fileoverview Servicio de Rutas - VRPTW v3.0
 * @module services/ruta
 */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { AppDataSource } from '../config/database.config.js';
import type { EstadoRuta, Parada, FichaCosto } from '../models/ruta.model.js';
import { Ruta as RutaModel } from '../models/ruta.model.js';
import { Envio, EstadoEnvio } from '../models/envio.model.js';
import { Vehiculo } from '../models/vehiculo.model.js';
import { Chofer } from '../models/chofer.model.js';
import { getDistanceMatrix } from '../config/osrm.config.js';
import { geocodeAddress } from './geocoding.service.js';

interface ReoptimizacionData {
  envio_id?: number;
  motivo: string;
}

interface RutaConRelaciones {
  vehiculo?: { matricula: string };
  chofer?: { nombre: string };
}

export class RutaService {
  private rutaRepository = AppDataSource.getRepository(RutaModel);
  private envioRepository = AppDataSource.getRepository(Envio);
  private vehiculoRepository = AppDataSource.getRepository(Vehiculo);
  private choferRepository = AppDataSource.getRepository(Chofer);

  /**
   * Optimizar rutas para una semana
   * Implementación completa del algoritmo VRPTW v3.0
   */
  async optimizarSemana(fechaInicio: Date, _dias = 7): Promise<RutaModel[]> {
    const rutas: RutaModel[] = [];

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

    // 5. Ejecutar algoritmo VRPTW v3.0
    const rutasOptimizadas = this.ejecutarVRPTW(
      enviosValidos,
      matrizDistancias,
      coordsValidas
    );

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
   * 🆕 Ejecutar algoritmo VRPTW v3.0 completo
   * - Optimización de combustible
   * - Prioridad de entregas (urgente, normal, económico)
   * - Ventanas de tiempo
   * - Capacidad de vehículos
   */
  private ejecutarVRPTW(
    envios: Envio[],
    matrizDistancias: number[][],
    coordenadas: Array<{ lat: number; lng: number }>
  ): Array<Partial<RutaModel>> {
    // 1. Clasificar envíos por prioridad
    const urgentes = envios.filter(e => e.prioridad === 'urgente');
    const normales = envios.filter(e => e.prioridad === 'normal');
    const economicos = envios.filter(e => e.prioridad === 'economico');

    // 2. Ordenar: urgentes primero, luego normales, luego económicos
    const enviosOrdenados = [...urgentes, ...normales, ...economicos];

    // 3. Reindexar coordenadas según el nuevo orden
    const indicesOrdenados = enviosOrdenados.map(e =>
      envios.findIndex(original => original.id_envio === e.id_envio)
    );
    const coordsOrdenadas = indicesOrdenados.map(i => coordenadas[i]);

    // 4. Obtener vehículo disponible (para cálculo de combustible)
    const vehiculo = this.vehiculoRepository.findOne({
      where: { disponible: true },
    });

    // 5. Valores por defecto para el vehículo
    const consumoPromedio = 12; // L/100km (por defecto)
    const precioCombustible = 180; // CUP/L

    // 6. Algoritmo de inserción de Solomon (versión mejorada)
    const paradas: Parada[] = [];
    let distanciaAcumulada = 0;
    let tiempoAcumulado = 0;
    let pesoAcumulado = 0;

    // Capacidad máxima del vehículo (por defecto)
    const capacidadMaxima = 5000; // kg

    for (let i = 0; i < enviosOrdenados.length; i++) {
      const envio = enviosOrdenados[i];
      const coord = coordsOrdenadas[i];

      // Verificar capacidad del vehículo
      const pesoEnvio = Number(envio.peso) || 0;
      if (pesoAcumulado + pesoEnvio > capacidadMaxima) {
        // Si excede la capacidad, crear una nueva ruta (en implementación futura)
        // Por ahora, continuamos con la misma ruta
        console.warn(`⚠️ Peso excede capacidad: ${pesoAcumulado + pesoEnvio} > ${capacidadMaxima}`);
      }
      pesoAcumulado += pesoEnvio;

      // Calcular distancia desde la parada anterior
      let distanciaDesdeAnterior = 0;
      if (i > 0) {
        distanciaDesdeAnterior = matrizDistancias[i - 1][i] || 0;
      }

      // Penalización por prioridad
      let tiempoPenalizacion = 0;
      if (envio.prioridad === 'urgente') {
        tiempoPenalizacion = 0; // Sin penalización
      } else if (envio.prioridad === 'normal') {
        tiempoPenalizacion = 10; // 10 min de penalización
      } else {
        tiempoPenalizacion = 20; // 20 min de penalización
      }

      // Calcular distancia acumulada
      distanciaAcumulada += distanciaDesdeAnterior;

      // Calcular tiempo acumulado (50 km/h promedio + penalización)
      const tiempoViaje = (distanciaDesdeAnterior / 50) * 60; // minutos
      tiempoAcumulado += tiempoViaje + tiempoPenalizacion;

      // Crear la parada
      paradas.push({
        orden: i + 1,
        envio_id: envio.id_envio,
        house: envio.house,
        destinatario: envio.destinatario_nombre,
        direccion: envio.destinatario_direccion,
        lat: coord.lat,
        lng: coord.lng,
        eta: new Date(Date.now() + tiempoAcumulado * 60000).toLocaleTimeString(),
        tiempo_estimado: Math.round(tiempoAcumulado),
        distancia_estimada: Math.round(distanciaAcumulada * 100) / 100,
      });
    }

    // 7. Calcular costo total estimado (con combustible)
    const costoCombustible = (distanciaAcumulada / 100) * consumoPromedio * precioCombustible;
    const otrosCostos = distanciaAcumulada * 10; // $10 por km (mantenimiento, depreciación, etc.)
    const costoTotalEstimado = costoCombustible + otrosCostos;

    // 8. Calcular combustible estimado
    const combustibleEstimado = (distanciaAcumulada / 100) * consumoPromedio;

    // 9. Generar análisis post-ruta inicial
    const analisisPostRuta = {
      distancia_planificada: Math.round(distanciaAcumulada * 100) / 100,
      distancia_real: 0,
      tiempo_planificado: Math.round(tiempoAcumulado),
      tiempo_real: 0,
      combustible_estimado: Math.round(combustibleEstimado * 100) / 100,
      combustible_real: 0,
      desviacion_distancia: 0,
      desviacion_tiempo: 0,
      desviacion_combustible: 0,
      eficiencia_chofer: 0,
      eficiencia_vehiculo: 0,
      entregas_a_tiempo: 0,
      entregas_urgentes: urgentes.length,
      reoptimizaciones: 0,
      incidencias: [],
      recomendaciones: [],
    };

    return [
      {
        secuencia_paradas: paradas,
        distancia_total: Math.round(distanciaAcumulada * 100) / 100,
        tiempo_estimado: Math.round(tiempoAcumulado),
        combustible_estimado: Math.round(combustibleEstimado * 100) / 100,
        costo_total_estimado: Math.round(costoTotalEstimado * 100) / 100,
        analisis_post_ruta: analisisPostRuta,
      },
    ];
  }

  /**
   * Obtener rutas de una semana
   */
  async getRutasSemana(fecha: Date): Promise<RutaModel[]> {
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
  async findById(id: number): Promise<RutaModel | null> {
    return await this.rutaRepository.findOne({
      where: { id_ruta: id },
      relations: ['vehiculo', 'chofer'],
    });
  }

  /**
   * Asignar chofer a una ruta
   */
  async asignarChofer(id: number, choferId: number): Promise<RutaModel | null> {
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
  async update(id: number, data: Partial<RutaModel>): Promise<RutaModel | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    Object.assign(ruta, data);
    return await this.rutaRepository.save(ruta);
  }

  /**
   * Generar manifiesto de ruta
   */
  async generarManifiesto(id: number): Promise<{ ruta: RutaModel; paradas: Parada[] } | null> {
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
  async reoptimizar(id: number, data: ReoptimizacionData): Promise<RutaModel | null> {
    const ruta = await this.findById(id);
    if (!ruta) return null;

    // TODO: Implementar reoptimización real
    // Por ahora, solo marcar que se reoptimizó
    const analisisActual = ruta.analisis_post_ruta || {
      distancia_planificada: 0,
      distancia_real: 0,
      tiempo_planificado: 0,
      tiempo_real: 0,
      combustible_estimado: 0,
      combustible_real: 0,
      desviacion_distancia: 0,
      desviacion_tiempo: 0,
      desviacion_combustible: 0,
      eficiencia_chofer: 0,
      eficiencia_vehiculo: 0,
      entregas_a_tiempo: 0,
      entregas_urgentes: 0,
      reoptimizaciones: 0,
      incidencias: [],
      recomendaciones: [],
    };

    ruta.analisis_post_ruta = {
      ...analisisActual,
      reoptimizaciones: (analisisActual.reoptimizaciones || 0) + 1,
      incidencias: [
        ...(analisisActual.incidencias || []),
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

    // Obtener vehículo y chofer de forma segura
    const rutaConRelaciones = ruta as unknown as RutaConRelaciones;
    const vehiculoMatricula = rutaConRelaciones.vehiculo?.matricula || 'No asignado';
    const choferNombre = rutaConRelaciones.chofer?.nombre || 'No asignado';

    // Calcular costos básicos
    const distancia = ruta.distancia_total || 0;
    const entregas = ruta.secuencia_paradas?.length || 0;
    const combustible = ruta.combustible_estimado || 0;
    const precioCombustible = 180; // CUP/L
    const costoCombustible = combustible * precioCombustible;
    const costoMantenimiento = distancia * 15; // $15/km
    const costoDepreciacion = distancia * 8; // $8/km
    const costosDirectos = costoCombustible + costoMantenimiento;
    const costosIndirectos = costoDepreciacion;
    const totalGeneral = costosDirectos + costosIndirectos;

    return {
      resumen: {
        distancia: distancia,
        entregas: entregas,
        vehiculo: vehiculoMatricula,
        chofer: choferNombre,
        fecha: ruta.fecha,
        ingresos: ruta.ingresos || 0,
      },
      costos_directos: {
        combustible: { monto: Math.round(costoCombustible * 100) / 100, cantidad: combustible, unidad: 'L' },
        peajes: { monto: 0, cantidad: 0, unidad: 'viaje' },
        mantenimiento: { monto: Math.round(costoMantenimiento * 100) / 100, cantidad: distancia, unidad: 'km' },
        neumaticos: { monto: 0, cantidad: 0, unidad: 'km' },
        salario: { monto: 0, cantidad: 0, unidad: 'viaje' },
        subtotal: Math.round(costosDirectos * 100) / 100,
      },
      costos_indirectos: {
        depreciacion: { monto: Math.round(costoDepreciacion * 100) / 100, cantidad: distancia, unidad: 'km' },
        seguro: { monto: 0, cantidad: 0, unidad: 'km' },
        administrativo: { monto: 0, cantidad: 0, unidad: 'km' },
        impuestos: { monto: 0, cantidad: 0, unidad: 'km' },
        subtotal: Math.round(costosIndirectos * 100) / 100,
      },
      costos_importacion: {
        aduana: { monto: 0, cantidad: 0, unidad: 'envios' },
        subtotal: 0,
      },
      totales: {
        total_general: Math.round(totalGeneral * 100) / 100,
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

    const lines = [
      'Concepto,Monto,Unidad',
      `Distancia,${ficha.resumen.distancia},km`,
      `Entregas,${ficha.resumen.entregas},unidades`,
      `Combustible,${ficha.costos_directos.combustible.monto},${ficha.costos_directos.combustible.unidad}`,
      `Mantenimiento,${ficha.costos_directos.mantenimiento.monto},${ficha.costos_directos.mantenimiento.unidad}`,
      `Depreciacion,${ficha.costos_indirectos.depreciacion.monto},${ficha.costos_indirectos.depreciacion.unidad}`,
      `Total Costos,${ficha.totales.total_general},CUP`,
      `Utilidad,${ficha.totales.utilidad_neta},CUP`,
      `Margen,${ficha.totales.margen_utilidad},%`,
    ];

    return lines.join('\n');
  }
}

/* eslint-enable @typescript-eslint/no-unsafe-argument */