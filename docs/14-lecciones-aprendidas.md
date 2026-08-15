## 🎯 ESTRATEGIA PROPUESTA

### 1. Crear un Documento de Lecciones Aprendidas

**Archivo:** `docs/14-lecciones-aprendidas.md`

```markdown
## 📚 DOCUMENTO DE LECCIONES APRENDIDAS - SIGMA-T

**Fecha de Creación:** 15 de agosto de 2026
**Última Actualización:** 15 de agosto de 2026
**Versión:** 1.0

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

### 2.2 Errores Comunes al Tipar Controladores

| # | Error | Código Incorrecto | Código Correcto |
|---|-------|-------------------|-----------------|
| 1 | **Tipar req.body** | `const { id } = req.body;` | `const body = req.body as Record<string, unknown>; const id = body.id as number;` |
| 2 | **Tipar req.params** | `const id = req.params.id;` | `const id = parseInt(req.params.id, 10);` |
| 3 | **Manejo de errores** | `catch (error) { next(error); }` | `catch (error) { next(error as Error); }` |
| 4 | **req.file** | `const file = req.file;` | Usar `req.file` directamente sin asignación |

### 2.3 Errores con TypeORM y Relaciones

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `Unsafe member access .matricula` | Acceso a propiedad de relación sin tipar | Usar `as unknown as { vehiculo?: { matricula: string } }` |
| 2 | `EntityTarget<ObjectLiteral>` | Repositorio no reconocido | TypeORM lo maneja internamente, usar `eslint-disable` |
| 3 | Decoradores con ESLint | `@ManyToOne` interpretado como return de error | Deshabilitar ESLint para el archivo del modelo |

### 2.4 Errores con Multer y Upload de Archivos

| # | Error | Descripción | Solución |
|---|-------|-------------|----------|
| 1 | `Unsafe member access .single` | upload.single no es reconocido | Usar directamente sin type assertion |
| 2 | `file.buffer` no reconocido | ESLint no reconoce el tipo de multer | Usar `eslint-disable-next-line` |

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

export class MiServicio {
  private repositorio = AppDataSource.getRepository(MiModelo);

  async findById(id: number): Promise<MiModelo | null> {
    return await this.repositorio.findOne({
      where: { id },
      relations: ['relacion1', 'relacion2'],
    });
  }

  // Para acceder a relaciones con tipado seguro
  async getRelacion(id: number): Promise<string> {
    const entity = await this.findById(id);
    // ✅ Usar type assertion con interfaz
    interface EntityConRelacion {
      relacion?: { nombre: string };
    }
    const conRelacion = entity as unknown as EntityConRelacion;
    return conRelacion.relacion?.nombre || 'No asignado';
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

### 5.1 Antes de Hacer un Commit

- [ ] ¿Usé `import type` para tipos?
- [ ] ¿Tipé `req.body` correctamente?
- [ ] ¿Tipé `req.params` correctamente?
- [ ] ¿Manejo los errores con `as Error`?
- [ ] ¿No hay `console.log` (usar `logger`)?
- [ ] ¿No hay `any` (usar `unknown` o interfaces)?
- [ ] ¿El código pasa `npm run lint`?
- [ ] ¿Los commits siguen Conventional Commits?

### 5.2 Antes de un Pull Request

- [ ] ¿El pipeline de CI/CD pasa?
- [ ] ¿Hay pruebas para el código nuevo?
- [ ] ¿La documentación está actualizada?
- [ ] ¿Se actualizó el `estado-actual-del-proyecto.md`?

---

## 6. RECURSOS Y REFERENCIAS

| Recurso | Enlace |
|---------|--------|
| ESLint Rules | https://eslint.org/docs/latest/rules/ |
| TypeScript Handbook | https://www.typescriptlang.org/docs/ |
| TypeORM Docs | https://typeorm.io/ |
| Conventional Commits | https://www.conventionalcommits.org/ |

---

## 7. CONTRIBUIR A ESTE DOCUMENTO

**Cada vez que se detecte un nuevo error o se aprenda una lección importante:**

1. Agregar el error a la sección correspondiente
2. Documentar la solución
3. Actualizar la fecha de última modificación
4. Hacer un commit con `docs: actualizar lecciones aprendidas`

---

**Última actualización:** 15 de agosto de 2026
```

---

## 📋 COMMIT DEL DOCUMENTO

```bash
git add docs/14-lecciones-aprendidas.md

git commit -m "docs: crear documento de lecciones aprendidas

- Recopilar todos los errores de ESLint y TypeScript
- Documentar patrones correctos
- Crear checklist de revisión de código
- Incluir comandos útiles para debug

Este documento debe actualizarse con cada nuevo error detectado"
```

---

## 🎯 BENEFICIOS DE ESTE DOCUMENTO

| # | Beneficio | Descripción |
|---|-----------|-------------|
| 1 | **No repetir errores** | Referencia rápida de errores comunes |
| 2 | **Onboarding más rápido** | Nuevos miembros aprenden de los errores pasados |
| 3 | **Mejora continua** | Cada error es una oportunidad de aprendizaje |
| 4 | **Calidad de código** | Los patrones correctos están documentados |
| 5 | **Eficiencia** | Menos tiempo debugging errores conocidos |

---
