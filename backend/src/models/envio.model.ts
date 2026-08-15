/**
 * @fileoverview Modelo de datos para Envíos
 * @module models/envio
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.model';

/**
 * Estados posibles de un envío
 * @enum {string}
 */
export enum EstadoEnvio {
  /** Envío pendiente de procesamiento */
  PENDIENTE = 'pendiente',
  /** Envío almacenado en bodega */
  EN_BODEGA = 'en_bodega',
  /** Envío en ruta de entrega */
  EN_RUTA = 'en_ruta',
  /** Envío entregado al destinatario */
  ENTREGADO = 'entregado',
  /** Envío con incidencia reportada */
  INCIDENCIA = 'incidencia',
}

/**
 * Prioridades posibles de un envío
 * @enum {string}
 */
export enum PrioridadEnvio {
  /** Envío urgente - entrega prioritaria */
  URGENTE = 'urgente',
  /** Envío normal - entrega estándar */
  NORMAL = 'normal',
  /** Envío económico - entrega de bajo costo */
  ECONOMICO = 'economico',
}

/**
 * Estados de consulta de aduana
 * @enum {string}
 */
export enum EstadoAduana {
  /** Pendiente de consulta */
  PENDIENTE = 'pendiente',
  /** Costo de aduana consultado exitosamente */
  CONSULTADO = 'consultado',
  /** Error en la consulta de aduana */
  ERROR = 'error',
}

/**
 * Entidad que representa un envío en el sistema
 * @class Envio
 */
@Entity('envios')
export class Envio {
  /**
   * Identificador único del envío
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id_envio: number;

  /**
   * Relación ManyToOne con Cliente
   * @type {Cliente}
   */
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  /**
   * ID del cliente asociado al envío
   * @type {number}
   */
  @Column()
  id_cliente: number;

  /**
   * ID del chofer asignado (opcional)
   * @type {number}
   */
  @Column({ nullable: true })
  id_chofer: number;

  /**
   * ID del vehículo asignado (opcional)
   * @type {number}
   */
  @Column({ nullable: true })
  id_vehiculo: number;

  /**
   * ID de la ruta asignada (opcional)
   * @type {number}
   */
  @Column({ nullable: true })
  id_ruta: number;

  /**
   * Número único de House del envío
   * @type {string}
   */
  @Column({ unique: true, length: 20 })
  house: string;

  /**
   * Air Way Bill (AWB) del envío - código de seguimiento aéreo
   * @type {string}
   */
  @Column({ length: 20, nullable: true })
  awb: string;

  /**
   * Descripción de la naturaleza y cantidad del paquete
   * @type {string}
   */
  @Column({ type: 'text' })
  descripcion: string;

  /**
   * Peso del envío en kilogramos
   * @type {number}
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  peso: number;

  /**
   * Volumen del envío en metros cúbicos
   * @type {number}
   * @default 0
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  volumen: number;

  /**
   * Cantidad de bultos del envío
   * @type {number}
   */
  @Column()
  bultos: number;

  /**
   * Nombre del remitente del envío
   * @type {string}
   */
  @Column({ length: 150 })
  remitente_nombre: string;

  /**
   * Número de Passport del remitente (opcional)
   * @type {string}
   */
  @Column({ length: 20, nullable: true })
  remitente_passport: string;

  /**
   * Nombre del destinatario del envío
   * @type {string}
   */
  @Column({ length: 150 })
  destinatario_nombre: string;

  /**
   * Dirección completa del destinatario
   * @type {string}
   */
  @Column({ type: 'text' })
  destinatario_direccion: string;

  /**
   * Teléfono del destinatario
   * @type {string}
   */
  @Column({ length: 30 })
  destinatario_telefono: string;

  /**
   * Carnet de Identidad del destinatario (11 dígitos)
   * @type {string}
   */
  @Column({ length: 11 })
  destinatario_identificacion: string;

  /**
   * Indica si el envío fue cobrado en origen
   * @type {boolean}
   * @default false
   */
  @Column({ default: false })
  cobrado_origen: boolean;

  /**
   * Código de la unidad de destino (provincia)
   * @type {string}
   */
  @Column({ length: 10 })
  unidad_destino: string;

  /**
   * Prioridad del envío (urgente, normal, económico)
   * @type {PrioridadEnvio}
   * @default PrioridadEnvio.NORMAL
   */
  @Column({ type: 'enum', enum: PrioridadEnvio, default: PrioridadEnvio.NORMAL })
  prioridad: PrioridadEnvio;

  /**
   * Fecha límite de entrega del envío
   * @type {Date}
   */
  @Column({ type: 'date', nullable: true })
  fecha_limite: Date;

  /**
   * Fecha de asignación del envío a una ruta
   * @type {Date}
   */
  @Column({ type: 'timestamp', nullable: true })
  fecha_asignacion: Date;

  /**
   * Fecha real de entrega del envío
   * @type {Date}
   */
  @Column({ type: 'timestamp', nullable: true })
  fecha_entrega_real: Date;

  /**
   * Estado actual del envío
   * @type {EstadoEnvio}
   * @default EstadoEnvio.PENDIENTE
   */
  @Column({ type: 'enum', enum: EstadoEnvio, default: EstadoEnvio.PENDIENTE })
  estado: EstadoEnvio;

  /**
   * Descripción de la incidencia (si aplica)
   * @type {string}
   */
  @Column({ type: 'text', nullable: true })
  incidencia: string;

  /**
   * Firma digital del cliente (Base64)
   * @type {string}
   */
  @Column({ type: 'text', nullable: true })
  firma_digital: string;

  /**
   * Foto de evidencia de la entrega (Base64)
   * @type {string}
   */
  @Column({ type: 'text', nullable: true })
  foto_evidencia: string;

  /**
   * Costo de aduana del envío (obtenido de Aerovaradero)
   * @type {number}
   */
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_aduana: number;

  /**
   * Otros costos de importación del envío
   * @type {number}
   */
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  costo_importacion: number;

  /**
   * Fecha de última consulta de aduana
   * @type {Date}
   */
  @Column({ type: 'timestamp', nullable: true })
  fecha_consulta_aduana: Date;

  /**
   * Estado de la consulta de aduana
   * @type {EstadoAduana}
   * @default EstadoAduana.PENDIENTE
   */
  @Column({ type: 'enum', enum: EstadoAduana, default: EstadoAduana.PENDIENTE })
  estado_aduana: EstadoAduana;

  /**
   * Fecha de creación del registro
   * @type {Date}
   */
  @CreateDateColumn()
  created_at: Date;

  /**
   * Fecha de última actualización del registro
   * @type {Date}
   */
  @UpdateDateColumn()
  updated_at: Date;
}