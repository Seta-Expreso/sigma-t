/**
 * @fileoverview Modelo de datos para Envíos
 * @module models/envio
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.model';

// Definición de enum para el estado del envío
export enum EstadoEnvio {
  PENDIENTE = 'pendiente',
  EN_BODEGA = 'en_bodega',
  EN_RUTA = 'en_ruta',
  ENTREGADO = 'entregado',
  INCIDENCIA = 'incidencia',
}

// Definición de enum para prioridad
export enum PrioridadEnvio {
  URGENTE = 'urgente',
  NORMAL = 'normal',
  ECONOMICO = 'economico',
}

// Definición de enum para estado de aduana
export enum EstadoAduana {
  PENDIENTE = 'pendiente',
  CONSULTADO = 'consultado',
  ERROR = 'error',
}

@Entity('envios')
export class Envio {
  @PrimaryGeneratedColumn()
  id_envio: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column()
  id_cliente: number;

  @Column({ nullable: true })
  id_chofer: number;

  @Column({ nullable: true })
  id_vehiculo: number;

  @Column({ nullable: true })
  id_ruta: number;

  @Column({ unique: true, length: 20 })
  house: string;

  @Column({ length: 20, nullable: true })
  awb: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  peso: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  volumen: number;

  @Column()
  bultos: number;

  @Column({ length: 150 })
  remitente_nombre: string;

  @Column({ length: 20, nullable: true })
  remitente_passport: string;

  @Column({ length: 150 })
  destinatario_nombre: string;

  @Column({ type: 'text' })
  destinatario_direccion: string;

  @Column({ length: 30 })
  destinatario_telefono: string;

  @Column({ default: false })
  cobrado_origen: boolean;

  @Column({ length: 10, nullable: true })
  unidad_destino: string;

  @Column({ type: 'enum', enum: PrioridadEnvio, default: PrioridadEnvio.NORMAL })
  prioridad: PrioridadEnvio;

  @Column({ type: 'date', nullable: true })
  fecha_limite: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_asignacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_entrega_real: Date;

  @Column({ type: 'enum', enum: EstadoEnvio, default: EstadoEnvio.PENDIENTE })
  estado: EstadoEnvio;

  @Column({ type: 'text', nullable: true })
  incidencia: string;

  @Column({ type: 'text', nullable: true })
  firma_digital: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_aduana: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_importacion: number;

  @Column({ type: 'timestamp', nullable: true })
  fecha_consulta_aduana: Date;

  @Column({ type: 'enum', enum: EstadoAduana, default: EstadoAduana.PENDIENTE })
  estado_aduana: EstadoAduana;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}