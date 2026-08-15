/**
 * @fileoverview Modelo de Cliente para TypeORM
 * @module models/cliente.model
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Envio } from './envio.model.js';

/**
 * Entidad Cliente - Representa una empresa o persona que contrata servicios de envío
 */
@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente!: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nombre_empresa!: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  contacto_nombre!: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  contacto_telefono!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contacto_email!: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  tarifa_preferencial!: number | null;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  // Relaciones
  @OneToMany(() => Envio, (envio) => envio.cliente)
  envios!: Envio[];
}

/**
 * Tipo para los datos de creación de un cliente
 */
export type ClienteCreateData = Omit<Cliente, 'id_cliente' | 'created_at' | 'updated_at' | 'envios'>;

/**
 * Tipo para los datos de actualización de un cliente
 */
export type ClienteUpdateData = Partial<ClienteCreateData>;