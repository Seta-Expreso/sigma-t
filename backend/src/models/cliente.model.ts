/**
 * @fileoverview Modelo de datos para Clientes
 * @module models/cliente
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Envio } from './envio.model';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ length: 150 })
  nombre_empresa: string;

  @Column({ length: 150 })
  contacto_nombre: string;

  @Column({ length: 30 })
  contacto_telefono: string;

  @Column({ length: 100, nullable: true })
  contacto_email: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  tarifa_preferencial: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Envio, envio => envio.cliente)
  envios: Envio[];
}