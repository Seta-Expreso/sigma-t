/**
 * @fileoverview Migración para crear la tabla rutas
 * @module migrations/1723740000001-CreateRutasTable
 */

import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table, TableForeignKey, TableColumn } from 'typeorm';

export class CreateRutasTable1723740000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Crear tabla rutas
    await queryRunner.createTable(
      new Table({
        name: 'rutas',
        columns: [
          { name: 'id_ruta', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'id_vehiculo', type: 'int', isNullable: false },
          { name: 'id_chofer', type: 'int', isNullable: false },
          { name: 'fecha', type: 'date', isNullable: false },
          { name: 'secuencia_paradas', type: 'jsonb', isNullable: false },
          { name: 'distancia_total', type: 'decimal', precision: 10, scale: 2, isNullable: false },
          { name: 'tiempo_estimado', type: 'int', isNullable: false },
          { name: 'combustible_estimado', type: 'decimal', precision: 10, scale: 2, isNullable: true },
          { name: 'combustible_real', type: 'decimal', precision: 10, scale: 2, isNullable: true },
          { name: 'costo_total_estimado', type: 'decimal', precision: 12, scale: 2, isNullable: false },
          { name: 'costo_total_real', type: 'decimal', precision: 12, scale: 2, isNullable: true },
          { name: 'pago_chofer', type: 'decimal', precision: 12, scale: 2, isNullable: true },
          { name: 'ficha_costo', type: 'jsonb', isNullable: true },
          { name: 'ingresos', type: 'decimal', precision: 12, scale: 2, isNullable: true },
          { name: 'utilidad_neta', type: 'decimal', precision: 12, scale: 2, isNullable: true },
          { name: 'margen_utilidad', type: 'decimal', precision: 5, scale: 2, isNullable: true },
          { name: 'analisis_post_ruta', type: 'jsonb', isNullable: true },
          {
            name: 'estado',
            type: 'enum',
            enum: ['planificada', 'en_curso', 'completada', 'cancelada'],
            default: `'planificada'`,
            isNullable: false,
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
      true
    );

    // 2. Agregar columna id_ruta a envios (relación)
    await queryRunner.addColumn(
      'envios',
      new TableColumn({
        name: 'id_ruta',
        type: 'int',
        isNullable: true,
      })
    );

    // 3. Agregar foreign key a envios
    await queryRunner.createForeignKey(
      'envios',
      new TableForeignKey({
        columnNames: ['id_ruta'],
        referencedColumnNames: ['id_ruta'],
        referencedTableName: 'rutas',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar foreign key
    const table = await queryRunner.getTable('envios');
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('id_ruta'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('envios', foreignKey);
    }

    // Eliminar columna
    await queryRunner.dropColumn('envios', 'id_ruta');

    // Eliminar tabla
    await queryRunner.dropTable('rutas');
  }
}