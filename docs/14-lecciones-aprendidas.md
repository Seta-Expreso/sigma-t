## 📄 DOCUMENTO ACTUALIZADO COMPLETO

**`docs/14-lecciones-aprendidas.md`** - Versión 1.2

```markdown
## 📚 DOCUMENTO DE LECCIONES APRENDIDAS - SIGMA-T

**Fecha de Creación:** 15 de agosto de 2026
**Última Actualización:** 15 de agosto de 2026
**Versión:** 1.2

---

## 1. PROPÓSITO

Este documento recopila todos los errores, problemas y lecciones aprendidas durante el desarrollo del sistema SIGMA-T. Su objetivo es servir como referencia para evitar repetir los mismos errores y mejorar continuamente la calidad del desarrollo.

---

## 2. ERRORES POR CATEGORÍA

### 2.1 ESLint y Tipado (TypeScript)

| # | Error | Descripción | Solución | Fecha |
|---|-------|-------------|----------|-------|
| 1 | `@typescript-eslint/no-explicit-any` | Uso de `any` en tipos | Usar `unknown` o definir interfaces específicas | 15/08/2026 |
| 2 | `@typescript-eslint/no-unsafe-assignment` | Asignación de valores sin tipo | Tipar correctamente `req.body` con `as Record<string, unknown>` | 15/08/2026 |
| 3 | `@typescript-eslint/no-unsafe-member-access` | Acceso a propiedades sin tipo | Usar type assertion o `eslint-disable` cuando sea necesario | 15/08/2026 |
| 4 | `@typescript-eslint/consistent-type-imports` | Importar tipos sin `import type` | Usar `import type` para tipos y `import` para valores | 15/08/2026 |
| 5 | `@typescript-eslint/no-unused-vars` | Variables importadas no usadas | Eliminar imports no usados o prefijar con `_` | 15/08/2026 |
| 6 | `@typescript-eslint/array-type` | Uso incorrecto de arrays | Usar `T[]` para tipos simples, `Array<T>` para complejos | 15/08/2026 |
| 7 | `@typescript-eslint/consistent-type-definitions` | Uso de `type` en lugar de `interface` | Usar `interface` para objetos | 15/08/2026 |
| 8 | `@typescript-eslint/no-unsafe-call` | Llamada a constructor sin tipo (new TableColumn()) | Usar `eslint-disable` o tipar correctamente | 15/08/2026 |
| 9 | `@typescript-eslint/no-inferrable-types` | Tipo inferido trivialmente | Eliminar tipo explícito cuando es inferido (ej: `_dias = 7`) | 15/08/2026 |
| 10 | `@typescript-eslint/require-await` | Función async sin await | Quitar `async` si no hay `await` | 15/08/2026 |
| **🆕 11** | **`no-console`** | **Uso de `console.log`, `console.warn`, `console.error`** | **Usar `logger` importado desde `../utils/logger.js`** | **15/08/2026** |

### 2.2 Errores Comunes al Tipar Controladores

| # | Error | Código Incorrecto | Código Correcto |
|---|-------|-------------------|-----------------|
| 1 | **Tipar req.body** | `const { id } = req.body;` | `const body = req.body as Record<string, unknown>; const id = body.id as number;` |
| 2 | **Tipar req.params** | `const id = req.params.id;` | `const id = parseInt(req.params.id, 10);` |
| 3 | **Manejo de errores** | `catch (error) { next(error); }` | `catch (error) { next(error as Error); }` |
| 4 | **req.file** | `const file = req.file;` | Usar `req.file` directamente sin asignación |
| 5 | **Parámetros no usados** | `async metodo(dias: number = 7)` | `async metodo(_dias: number = 7)` o `async metodo(_dias = 7)` |
| **🆕 6** | **Variables de estado no usadas** | `const [selectedDay, setSelectedDay] = useState(...)` | **Eliminar si no se usa, no dejar con `_`** |

### 2.3 Errores con TypeORM y Relaciones

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `Unsafe member access .matricula` | Acceso a propiedad de relación sin tipar | Usar `as unknown as { vehiculo?: { matricula: string } }` |
| 2 | `EntityTarget<ObjectLiteral>` | Repositorio no reconocido | TypeORM lo maneja internamente, usar `eslint-disable` |
| 3 | Decoradores con ESLint | `@ManyToOne` interpretado como return de error | Deshabilitar ESLint para el archivo del modelo |
| 4 | `Unsafe member access .buffer` | `file.buffer` no reconocido | Usar `eslint-disable-next-line` |

### 2.4 Errores con Multer y Upload de Archivos

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `Unsafe member access .single` | upload.single no es reconocido | Usar directamente sin type assertion |
| 2 | `file.buffer` no reconocido | ESLint no reconoce el tipo de multer | Usar `eslint-disable-next-line` |

### 2.5 Errores con Migraciones de Base de Datos

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `@typescript-eslint/no-unsafe-call` | `new TableColumn()` no es reconocido | Importar `TableColumn` y usar `eslint-disable` si es necesario |
| 2 | `@typescript-eslint/consistent-type-imports` | Importar tipos sin `import type` | Usar `import type` para `MigrationInterface`, `QueryRunner` |

### 🆕 2.6 Errores en Frontend - Componentes React

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `@typescript-eslint/no-unused-vars` | Imports no usados (useEffect, Select) | Eliminar imports no usados |
| 2 | `@typescript-eslint/no-unused-vars` | Estado declarado pero no usado | Eliminar el estado completamente |
| 3 | `@typescript-eslint/no-explicit-any` | Tipos `any` en API (FichaCosto, AnalisisPostRuta) | Definir interfaces específicas |

### 🆕 2.7 Errores de Logging

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `no-console` | Uso de `console.log`, `console.warn`, `console.error` | Usar `logger` importado desde `../utils/logger.js` |

---

## 3. PATRONES CORRECTOS (BEST PRACTICES)

### 3.1 Controladores

```typescript
// ✅ PATRÓN CORRECTO PARA CONTROLADORES

import type { Request, Response, NextFunction } from 'express';

export class MiController {
  async miMetodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Tipar req.body
      const body = req.body as Record<string, unknown>;
      const id = body.id as number | undefined;

      // Tipar req.params
      const paramId = parseInt(req.params.id, 10);

      // Llamar al servicio
      const resultado = await this.miServicio.hacerAlgo(id);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      next(error as Error);
    }
  }
}
```

### 3.2 Servicios con TypeORM

```typescript
// ✅ PATRÓN CORRECTO PARA SERVICIOS

import { AppDataSource } from '../config/database.config.js';
import { MiModelo } from '../models/mi-modelo.model.js';
import logger from '../utils/logger.js';

export class MiServicio {
  private repositorio = AppDataSource.getRepository(MiModelo);

  async findById(id: number): Promise<MiModelo | null> {
    return await this.repositorio.findOne({
      where: { id },
      relations: ['relacion1', 'relacion2'],
    });
  }

  // ✅ Para acceder a relaciones con tipado seguro
  async getRelacion(id: number): Promise<string> {
    const entity = await this.findById(id);
    interface EntityConRelacion {
      relacion?: { nombre: string };
    }
    const conRelacion = entity as unknown as EntityConRelacion;
    return conRelacion.relacion?.nombre || 'No asignado';
  }

  // ✅ Parámetros no usados con _
  async metodoConParametroNoUsado(_dias: number = 7): Promise<void> {
    // _dias no se usa pero está marcado con _
  }

  // ✅ Quitar async si no hay await
  metodoSincrono(): string {
    return 'resultado';
  }

  // ✅ Usar logger en lugar de console
  ejemploConLogger(): void {
    logger.info('Mensaje informativo');
    logger.warn('Advertencia');
    logger.error('Error');
  }
}
```

### 3.3 Rutas

```typescript
// ✅ PATRÓN CORRECTO PARA RUTAS

import { Router } from 'express';
import { MiController } from '../controllers/mi-controller.js';

const router = Router();
const controller = new MiController();

// ✅ Usar void para promesas
router.post('/ruta', (req, res, next) => {
  void controller.miMetodo(req, res, next);
});

export default router;
```

### 3.4 Modelos

```typescript
// ✅ PATRÓN CORRECTO PARA MODELOS CON ESLINT

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mi_tabla')
export class MiModelo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;
}

/* eslint-enable */
```

### 3.5 Migraciones de Base de Datos

```typescript
// ✅ PATRÓN CORRECTO PARA MIGRACIONES

import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table, TableForeignKey, TableColumn } from 'typeorm';

export class MiMigracion1723740000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear tabla
    await queryRunner.createTable(
      new Table({
        name: 'mi_tabla',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'nombre', type: 'varchar', isNullable: false },
        ],
      }),
      true
    );

    // Agregar columna
    await queryRunner.addColumn(
      'otra_tabla',
      new TableColumn({
        name: 'mi_columna',
        type: 'int',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mi_tabla');
  }
}
```

### 🆕 3.6 Componentes React

```typescript
// ✅ PATRÓN CORRECTO PARA COMPONENTES REACT

import React, { useState } from 'react';
import { Button, Card } from '../common';

interface MiComponenteProps {
  fechaInicio?: Date;
  onSeleccionar?: (id: number) => void;
}

export const MiComponente: React.FC<MiComponenteProps> = ({
  fechaInicio = new Date(),
  onSeleccionar,
}) => {
  // ✅ Solo estado que realmente se usa
  const [fecha, setFecha] = useState<Date>(fechaInicio);
  const { datos, loading } = useMiHook();

  // ✅ Si no se usa un estado, NO se declara
  // const [noUsado, setNoUsado] = useState(null); // ❌ MAL

  // ✅ Imports solo de lo que se usa
  // import { useEffect } from 'react'; // ❌ Si no se usa, no importar

  return (
    <div>
      {/* Contenido */}
    </div>
  );
};
```

---

## 4. COMMANDS ÚTILES PARA DEBUG

### 4.1 ESLint

```bash
# Ver errores de ESLint
cd backend && npm run lint

# Corregir automáticamente errores de ESLint
cd backend && npm run lint -- --fix

# Ver solo errores de un archivo
npx eslint src/controllers/mi-controller.ts
```

### 4.2 TypeScript

```bash
# Compilar para ver errores de tipo
cd backend && npx tsc --noEmit

# Ver tipos de una variable
npx tsc --showConfig
```

---

## 5. CHECKLIST DE REVISIÓN DE CÓDIGO

### 5.1 Antes de Hacer un Commit (BACKEND)

- [ ] ¿Usé `import type` para tipos?
- [ ] ¿Tipé `req.body` correctamente?
- [ ] ¿Tipé `req.params` correctamente?
- [ ] ¿Manejo los errores con `as Error`?
- [ ] ¿No hay `console.log` (usar `logger`)?
- [ ] ¿No hay `any` (usar `unknown` o interfaces)?
- [ ] ¿El código pasa `npm run lint`?
- [ ] ¿Los commits siguen Conventional Commits?
- [ ] ¿Los parámetros no usados tienen `_`?
- [ ] ¿Las funciones sin `await` no son `async`?

### 5.2 Antes de Hacer un Commit (FRONTEND)

- [ ] ¿Usé `import type` para tipos?
- [ ] ¿No hay `any` en tipos de API?
- [ ] ¿No hay imports no usados?
- [ ] ¿No hay estados declarados pero no usados?
- [ ] ¿El código pasa `npm run lint`?
- [ ] ¿Los commits siguen Conventional Commits?

### 5.3 Antes de un Pull Request

- [ ] ¿El pipeline de CI/CD pasa?
- [ ] ¿Hay pruebas para el código nuevo?
- [ ] ¿La documentación está actualizada?
- [ ] ¿Se actualizó el `estado-actual-del-proyecto.md`?

---

## 6. REGISTRO DE CAMBIOS

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 15/08/2026 | Creación del documento | Equipo SIGMA-T |
| 1.1 | 15/08/2026 | Agregar errores del Sprint 2 (Día 2) | Equipo SIGMA-T |
| **1.2** | **15/08/2026** | **Agregar errores del Sprint 2 (Día 3)** | **Equipo SIGMA-T** |

### 🆕 Cambios en v1.2

| # | Cambio | Descripción |
|---|--------|-------------|
| 1 | Agregar error `no-console` | Uso de console en lugar de logger |
| 2 | Agregar sección 2.6 | Errores en Frontend - Componentes React |
| 3 | Agregar sección 2.7 | Errores de Logging |
| 4 | Agregar sección 3.6 | Patrón correcto para componentes React |
| 5 | Agregar checklist de Frontend | Separar backend y frontend |

---

## 7. RECURSOS Y REFERENCIAS

| Recurso | Enlace |
|---------|--------|
| ESLint Rules | https://eslint.org/docs/latest/rules/ |
| TypeScript Handbook | https://www.typescriptlang.org/docs/ |
| TypeORM Docs | https://typeorm.io/ |
| React Docs | https://react.dev/ |
| Conventional Commits | https://www.conventionalcommits.org/ |

---

## 8. CONTRIBUIR A ESTE DOCUMENTO

**Cada vez que se detecte un nuevo error o se aprenda una lección importante:**

1. Agregar el error a la sección correspondiente
2. Documentar la solución
3. Actualizar la fecha de última modificación
4. Hacer un commit con `docs: actualizar lecciones aprendidas`

---
