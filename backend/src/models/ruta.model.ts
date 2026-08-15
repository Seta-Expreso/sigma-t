/**
 * @fileoverview Modelo de Ruta para TypeORM
 * @module models/ruta.model
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vehiculo } from './vehiculo.model.js';
import { Chofer } from './chofer.model.js';

// ============================================================
// TIPOS Y ENUMS
// ============================================================

export type EstadoRuta = 'planificada' | 'en_curso' | 'completada' | 'cancelada';

export interface Parada {
  orden: number;
  envio_id: number;
  house: string;
  destinatario: string;
  direccion: string;
  lat?: number;
  lng?: number;
  eta?: string;
  tiempo_estimado?: number;
  distancia_estimada?: number;
}

export interface FichaCosto {
  resumen: {
    distancia: number;
    entregas: number;
    vehiculo: string;
    chofer: string;
    fecha: Date;
    ingresos: number;
  };
  costos_directos: {
    combustible: { monto: number; cantidad: number; unidad: string };
    peajes: { monto: number; cantidad: number; unidad: string };
    mantenimiento: { monto: number; cantidad: number; unidad: string };
    neumaticos: { monto: number; cantidad: number; unidad: string };
    salario: { monto: number; cantidad: number; unidad: string };
    subtotal: number;
  };
  costos_indirectos: {
    depreciacion: { monto: number; cantidad: number; unidad: string };
    seguro: { monto: number; cantidad: number; unidad: string };
    administrativo: { monto: number; cantidad: number; unidad: string };
    impuestos: { monto: number; cantidad: number; unidad: string };
    subtotal: number;
  };
  costos_importacion: {
    aduana: { monto: number; cantidad: number; unidad: string };
    subtotal: number;
  };
  totales: {
    total_general: number;
    utilidad_neta: number;
    margen_utilidad: number;
  };
}

export interface AnalisisPostRuta {
  distancia_planificada: number;
  distancia_real: number;
  tiempo_planificado: number;
  tiempo_real: number;
  combustible_estimado: number;
  combustible_real: number;
  desviacion_distancia: number;
  desviacion_tiempo: number;
  desviacion_combustible: number;
  eficiencia_chofer: number;
  eficiencia_vehiculo: number;
  entregas_a_tiempo: number;
  entregas_urgentes: number;
  reoptimizaciones: number;
  incidencias: Array<{
    tipo: string;
    descripcion: string;
    hora: string;
  }>;
  recomendaciones: string[];
}

// ============================================================
// ENTIDAD RUTA
// ============================================================

@Entity('rutas')
export class Ruta {
  // ============ IDENTIFICADOR ============
  @PrimaryGeneratedColumn()
  id_ruta!: number;

  // ============ RELACIONES ============
  @Column({ type: 'int' })
  id_vehiculo!: number;

  @ManyToOne(() => Vehiculo)
  @JoinColumn({ name: 'id_vehiculo' })
  vehiculo?: Vehiculo;

  @Column({ type: 'int' })
  id_chofer!: number;

  @ManyToOne(() => Chofer)
  @JoinColumn({ name: 'id_chofer' })
  chofer?: Chofer;

  // ============ INFORMACIÓN DE LA RUTA ============
  @Column({ type: 'date' })
  fecha!: Date;

  @Column({ type: 'jsonb' })
  secuencia_paradas!: Parada[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  distancia_total!: number;

  @Column({ type: 'int' })
  tiempo_estimado!: number; // Minutos

  // ============ COMBUSTIBLE ============
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  combustible_estimado?: number; // Litros

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  combustible_real?: number; // Litros

  // ============ COSTOS ============
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  costo_total_estimado!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_total_real?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  pago_chofer?: number;

  @Column({ type: 'jsonb', nullable: true })
  ficha_costo?: FichaCosto;

  // ============ FINANZAS ============
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  ingresos?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  utilidad_neta?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  margen_utilidad?: number;

  // ============ ANÁLISIS POST-RUTA (Sprint 2) ============
  @Column({ type: 'jsonb', nullable: true })
  analisis_post_ruta?: AnalisisPostRuta;

  // ============ ESTADO ============
  @Column({
    type: 'enum',
    enum: ['planificada', 'en_curso', 'completada', 'cancelada'],
    default: 'planificada',
  })
  estado!: EstadoRuta;

  // ============ AUDITORÍA ============
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}