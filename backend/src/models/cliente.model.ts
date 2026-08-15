/**
 * @fileoverview Modelo de datos para Clientes
 * @module models/cliente
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Envio } from './envio.model';

/**
 * Entidad que representa un cliente en el sistema
 * @class Cliente
 */
@Entity('clientes')
export class Cliente {
  /**
   * Identificador único del cliente
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id_cliente: number;

  /**
   * Nombre de la empresa del cliente
   * @type {string}
   */
  @Column({ length: 150 })
  nombre_empresa: string;

  /**
   * Nombre de la persona de contacto en la empresa
   * @type {string}
   */
  @Column({ length: 150 })
  contacto_nombre: string;

  /**
   * Teléfono de contacto del cliente
   * @type {string}
   */
  @Column({ length: 30 })
  contacto_telefono: string;

  /**
   * Email de contacto del cliente (opcional)
   * @type {string}
   */
  @Column({ length: 100, nullable: true })
  contacto_email: string;

  /**
   * Tarifa preferencial negociada con el cliente (opcional)
   * @type {number}
   */
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  tarifa_preferencial: number;

  /**
   * Estado activo del cliente (true = activo, false = inactivo)
   * @type {boolean}
   * @default true
   */
  @Column({ default: true })
  activo: boolean;

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

  /**
   * Relación OneToMany con envíos
   * @type {Envio[]}
   */
  @OneToMany(() => Envio, envio => envio.cliente)
  envios: Envio[];
}