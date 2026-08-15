/**
 * @fileoverview Modelo de Envío para TypeORM
 * @module models/envio.model
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
import { Cliente } from './cliente.model.js';
import type { Ruta } from './ruta.model.js';

// ============================================================
// ENUMS
// ============================================================

export enum EstadoEnvio {
  PENDIENTE = 'pendiente',
  EN_BODEGA = 'en_bodega',
  EN_RUTA = 'en_ruta',
  ENTREGADO = 'entregado',
  INCIDENCIA = 'incidencia',
}

export enum EstadoAerovaradero {
  FALTANTE_ORIGEN = 'faltante_origen',
  PRESENCIAL = 'presencial',
  ARRIBADO = 'arribado',
  FACTURADO = 'facturado',
  ENTREGADO_AEROVARADERO = 'entregado_aerovaradero',
}

export enum EstadoSetaExpreso {
  CLASIFICACION = 'clasificacion',
  PROCESO_ENTREGA = 'proceso_entrega',
  ENTREGADO = 'entregado',
  NO_ENTREGADO = 'no_entregado',
}

export enum EstadoAduana {
  PENDIENTE = 'pendiente',
  CONSULTADO = 'consultado',
  ERROR = 'error',
}

export type PrioridadEnvio = 'urgente' | 'normal' | 'economico';

// ============================================================
// ENTIDAD ENVIO
// ============================================================

@Entity('envios')
export class Envio {
  // ============ IDENTIFICADOR ============
  @PrimaryGeneratedColumn()
  id_envio!: number;

  // ============ RELACIONES ============
  @Column({ type: 'int' })
  id_cliente!: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente;

  // 🆕 Relación con Ruta (Sprint 2)
  @Column({ type: 'int', nullable: true })
  id_ruta?: number;

  @ManyToOne(() => Ruta, { nullable: true })
  @JoinColumn({ name: 'id_ruta' })
  ruta?: Ruta;

  // ============ CAMPOS PENDIENTES (Futuros Sprints) ============
  @Column({ type: 'int', nullable: true })
  id_chofer?: number;

  @Column({ type: 'int', nullable: true })
  id_vehiculo?: number;

  // ============ IDENTIFICACIÓN DEL ENVÍO ============
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  house!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  awb?: string;

  @Column({ type: 'text', nullable: false })
  descripcion!: string;

  // ============ DIMENSIONES ============
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  peso!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  volumen!: number;

  @Column({ type: 'int', nullable: false })
  bultos!: number;

  // ============ REMITENTE ============
  @Column({ type: 'varchar', length: 150, nullable: false })
  remitente_nombre!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  remitente_passport?: string;

  // ============ DESTINATARIO ============
  @Column({ type: 'varchar', length: 150, nullable: false })
  destinatario_nombre!: string;

  @Column({ type: 'text', nullable: false })
  destinatario_direccion!: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  destinatario_telefono!: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  destinatario_identificacion!: string; // Carnet de Identidad (11 dígitos)

  // ============ INFORMACIÓN DE ORIGEN ============
  @Column({ type: 'boolean', default: false })
  cobrado_origen!: boolean;

  @Column({ type: 'varchar', length: 10, nullable: false })
  unidad_destino!: string; // Código de provincia

  // ============ PRIORIDAD (Sprint 2) ============
  @Column({
    type: 'enum',
    enum: ['urgente', 'normal', 'economico'],
    default: 'normal',
  })
  prioridad!: PrioridadEnvio;

  // ============ FECHAS ============
  @Column({ type: 'date', nullable: true })
  fecha_limite?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_asignacion?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_entrega_real?: Date;

  // ============ ESTADO EN SISTEMA ============
  @Column({
    type: 'enum',
    enum: EstadoEnvio,
    default: EstadoEnvio.PENDIENTE,
  })
  estado!: EstadoEnvio;

  // ============ ESTADOS AEROVARADERO (9 estados del paquete) ============
  @Column({
    type: 'enum',
    enum: EstadoAerovaradero,
    nullable: true,
  })
  estado_aerovaradero?: EstadoAerovaradero;

  @Column({
    type: 'enum',
    enum: EstadoSetaExpreso,
    nullable: true,
  })
  estado_seta_expreso?: EstadoSetaExpreso;

  // ============ FECHAS POR ESTADO ============
  @Column({ type: 'timestamp', nullable: true })
  fecha_arribado?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_facturado?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_recogido?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_clasificacion?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_proceso_entrega?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_entregado?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_no_entregado?: Date;

  // ============ INCIDENCIAS ============
  @Column({ type: 'text', nullable: true })
  incidencia?: string;

  @Column({ type: 'text', nullable: true })
  motivo_no_entrega?: string;

  // ============ EVIDENCIA ============
  @Column({ type: 'text', nullable: true })
  firma_digital?: string; // Base64

  @Column({ type: 'text', nullable: true })
  foto_evidencia?: string; // Base64

  // ============ ADUANA ============
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  importe_aduana?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_aduana?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_importacion?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numero_factura_aduana?: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_ultima_consulta_aduana?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_consulta_aduana?: Date;

  @Column({ type: 'int', default: 0 })
  intentos_consulta_aduana!: number;

  @Column({
    type: 'enum',
    enum: EstadoAduana,
    default: EstadoAduana.PENDIENTE,
  })
  estado_aduana!: EstadoAduana;

  // ============ 🆕 IA - ESTIMACIÓN DE TIEMPOS (Sprint 5) ============
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tiempo_estimado_ia?: number; // Minutos estimados por IA

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tiempo_real_entrega?: number; // Minutos reales de entrega

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  precision_estimacion?: number; // Precisión de la estimación (%)

  // ============ AUDITORÍA ============
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}