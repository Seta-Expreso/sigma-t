## 📋 COMPROMISO DEL ASISTENTE IA - SIGMA-T

**Fecha:** 15 de agosto de 2026  
**Versión:** 1.1  
**Propósito:** Documentar formalmente el compromiso del Asistente IA para no repetir errores ya documentados.

---

## 1. DECLARACIÓN DE COMPROMISO

Yo, **Asistente IA del proyecto SIGMA-T**, me comprometo solemnemente a:

### 1.1 Antes de Escribir Código

- [ ] **Revisar** el documento `14-lecciones-aprendidas.md`
- [ ] **Recordar** los errores comunes y sus soluciones
- [ ] **Aplicar** los patrones correctos desde el principio

### 1.2 Durante la Escritura de Código

| # | Regla | ¿La aplico? |
|---|-------|-------------|
| 1 | Usar `import type` para tipos | ✅ |
| 2 | Tipar `req.body` con `as Record<string, unknown>` | ✅ |
| 3 | Tipar `req.params` con `parseInt` | ✅ |
| 4 | Usar `logger` en lugar de `console` | ✅ |
| 5 | Usar `_` para variables no usadas | ✅ |
| 6 | No usar `any` (usar `unknown` o interfaces) | ✅ |
| 7 | Usar `interface` para objetos, no `type` | ✅ |
| 8 | Manejar errores con `as Error` | ✅ |
| 9 | Usar `import type` para `MigrationInterface`, `QueryRunner` | ✅ |
| 10 | Quitar `async` si no hay `await` | ✅ |
| 11 | Definir tipos específicos para `ficha_costo` y `analisis_post_ruta` | ✅ |
| **🆕 12** | **No declarar estados que no se usan en React** | **✅** |
| **🆕 13** | **Eliminar imports no usados** | **✅** |

### 1.3 Antes de Entregar Código

- [ ] **Verificar** que el código pasa ESLint
- [ ] **Revisar** que no haya `any`
- [ ] **Confirmar** que los imports de tipo usan `import type`
- [ ] **Revisar** que no haya variables/estados no usados
- [ ] **Verificar** que no haya `console.log` (usar `logger`)

---

## 2. CONSECUENCIAS

Si vuelvo a cometer errores ya documentados:

1. El Líder me lo señalará inmediatamente
2. Actualizaré el documento de lecciones aprendidas
3. Reforzaré mi compromiso
4. No volveré a cometer el mismo error

---

## 3. REGISTRO DE INCUMPLIMIENTOS

| # | Fecha | Error | Archivo | Acción Correctiva |
|---|-------|-------|---------|-------------------|
| 1 | 15/08/2026 | `_selectedDay` no usado | `WeeklyPlanner.tsx` | Eliminar variable, reforzar checklist |
| 2 | 15/08/2026 | `useEffect` importado no usado | `WeeklyPlanner.tsx` | Eliminar import no usado |
| 3 | 15/08/2026 | `Select` importado no usado | `WeeklyPlanner.tsx` | Eliminar import no usado |
| 4 | 15/08/2026 | `any` en tipos de API | `ruta.api.ts` | Definir `FichaCosto` y `AnalisisPostRuta` |

---

## 4. LECCIONES APRENDIDAS DE ESTOS INCUMPLIMIENTOS

| # | Lección | Aplicación Futura |
|---|---------|-------------------|
| 1 | **Revisar el checklist ANTES de entregar** | Siempre revisar antes de entregar |
| 2 | **No confiar en la memoria** | Usar el checklist como guía |
| 3 | **Eliminar código muerto** | Si no se usa, eliminarlo, no dejarlo con `_` |
| 4 | **Pensar antes de declarar** | ¿Realmente necesito este estado/import? |

---

## 5. FIRMAS

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| **Líder del Proyecto** | Osleyder Gonzalez Acosta | _________ | 15/08/2026 |
| **Asistente IA** | DeepSeek | ✅ Comprometido | 15/08/2026 |

---

## 6. REGISTRO DE CAMBIOS

| Versión | Fecha | Cambio | Autor |
|---------|-------|--------|-------|
| 1.0 | 15/08/2026 | Creación del documento | Asistente IA |
| **1.1** | **15/08/2026** | **Agregar reglas de React, registro de incumplimientos y lecciones aprendidas** | **Asistente IA** |

### 🆕 Cambios en v1.1

| # | Cambio | Descripción |
|---|--------|-------------|
| 1 | Agregar regla 12 | No declarar estados que no se usan en React |
| 2 | Agregar regla 13 | Eliminar imports no usados |
| 3 | Agregar sección 3 | Registro de incumplimientos |
| 4 | Agregar sección 4 | Lecciones aprendidas de los incumplimientos |

---

**"Prometo no repetir los mismos errores. Cada error es una lección aprendida."**