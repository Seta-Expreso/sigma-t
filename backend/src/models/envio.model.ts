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

/**
 * Estados del envío en Seta Expreso
 */
export enum EstadoEnvio {
  PENDIENTE = 'pendiente',
  EN_BODEGA = 'en_bodega',
  EN_RUTA = 'en_ruta',
  ENTREGADO = 'entregado',
  INCIDENCIA = 'incidencia',
}

/**
 * Prioridades del envío
 */
export enum PrioridadEnvio {
  URGENTE = 'urgente',
  NORMAL = 'normal',
  ECONOMICO = 'economico',
}

/**
 * Estados de consulta de aduana
 */
export enum EstadoAduana {
  PENDIENTE = 'pendiente',
  CONSULTADO = 'consultado',
  ERROR = 'error',
}

/**
 * Entidad Envío - Representa un paquete o envío gestionado por el sistema
 */
@Entity('envios')
export class Envio {
  @PrimaryGeneratedColumn()
  id_envio!: number;

  // Relación con Cliente
  @Column({ type: 'integer', nullable: true })
  id_cliente!: number | null;

  @ManyToOne(() => Cliente, (cliente) => cliente.envios, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente | null;

  // Campos del manifiesto
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  house!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  awb!: string | null;

  @Column({ type: 'text', nullable: false })
  descripcion!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  peso!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  volumen!: number;

  @Column({ type: 'integer', nullable: false })
  bultos!: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  remitente_nombre!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  remitente_passport!: string | null;

  @Column({ type: 'varchar', length: 150, nullable: false })
  destinatario_nombre!: string;

  @Column({ type: 'text', nullable: false })
  destinatario_direccion!: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  destinatario_telefono!: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  destinatario_identificacion!: string;

  @Column({ type: 'boolean', default: false })
  cobrado_origen!: boolean;

  @Column({ type: 'varchar', length: 10, nullable: false })
  unidad_destino!: string;

  // Campos adicionales
  @Column({ type: 'enum', enum: PrioridadEnvio, default: PrioridadEnvio.NORMAL })
  prioridad!: PrioridadEnvio;

  @Column({ type: 'date', nullable: true })
  fecha_limite!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  fecha_asignacion!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  fecha_entrega_real!: Date | null;

  @Column({ type: 'enum', enum: EstadoEnvio, default: EstadoEnvio.PENDIENTE })
  estado!: EstadoEnvio;

  @Column({ type: 'text', nullable: true })
  incidencia!: string | null;

  @Column({ type: 'text', nullable: true })
  firma_digital!: string | null;

  @Column({ type: 'text', nullable: true })
  foto_evidencia!: string | null;

  // Campos de Aduana
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  importe_aduana!: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numero_factura_aduana!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  fecha_ultima_consulta_aduana!: Date | null;

  @Column({ type: 'integer', default: 0 })
  intentos_consulta_aduana!: number;

  @Column({ type: 'enum', enum: EstadoAduana, default: EstadoAduana.PENDIENTE })
  estado_aduana!: EstadoAduana;

  // Timestamps
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}

/**
 * Tipo para los datos de creación de un envío
 */
export type EnvioCreateData = Omit<Envio, 'id_envio' | 'created_at' | 'updated_at' | 'cliente'>;

/**
 * Tipo para los datos de actualización de un envío
 */
export type EnvioUpdateData = Partial<EnvioCreateData>;

/**
 * Tipo para el estado de un envío (respuesta simplificada)
 */
export interface EnvioEstadoResponse {
  house: string;
  estado: EstadoEnvio;
  estado_aduana: EstadoAduana;
  importe_aduana: number | null;
  fecha_actualizacion: Date;
}