# ESTADO ACTUAL DEL PROYECTO SIGMA-T

**Última Actualización:** 14 de agosto de 2026
**Versión:** 1.2
**Propósito:** Proporcionar una visión clara del estado actual del proyecto para cualquier nuevo miembro del equipo o asistente de IA.

---

## 1. RESUMEN EJECUTIVO

| Aspecto | Estado |
|---------|--------|
| **Proyecto** | SIGMA-T - Sistema Integral de Gestión para MiPYME de Transporte |
| **Fase Actual** | Sprint 1 - Core de Envíos (en progreso) |
| **Progreso General** | 20% completado |
| **Fecha de Inicio** | 13 de agosto de 2026 |
| **MVP Estimado** | 15 de enero de 2027 |
| **Release 1.0** | 01 de abril de 2027 |

---

## 2. SPRINTS COMPLETADOS

### Sprint 0: Fundación ✅ COMPLETADO (13/08/2026)

**Entregables:**
- ✅ Repositorio GitHub (sigmateam/sigma-t)
- ✅ Docker Compose con todos los servicios
- ✅ Backend Node.js + TypeScript configurado
- ✅ Frontend React + Vite + Tailwind CSS configurado
- ✅ Mobile Flutter configurado
- ✅ CI/CD con GitHub Actions
- ✅ Estándares de codificación (ESLint, Prettier, Dart Analyzer)
- ✅ Entorno de desarrollo automatizado (tasks.json)
- ✅ Documentación completa (9 documentos en /docs)
- ✅ Configuración ESLint y Prettier del frontend
- ✅ Pruebas configuradas para pasar con pruebas vacías
- ✅ TypeDoc configurado para generación automática de documentación
- ✅ Swagger UI configurado para documentación de API

**Decisiones Tomadas:**
- Licencia MIT
- Organización GitHub: sigmateam
- Repositorio: sigma-t
- Dominio: Pendiente (usaremos IP del VPS ETECSA)
- Build de Android deshabilitado temporalmente hasta Sprint 3
- Stack tecnológico confirmado (Node.js, React, Flutter, PostgreSQL)

---

## 3. SPRINTS EN PROGRESO

### Sprint 1: Core de Envíos 🔄 EN PROGRESO (60% completado)

**Objetivo:** Gestionar clientes y envíos, e importar el manifiesto desde Excel con mapeo flexible de columnas.

**Entregables Completados:**
- ✅ Modelo de datos (Clientes, Envíos) diseñado e implementado
- ✅ API CRUD de Clientes implementada
- ✅ API CRUD de Envíos implementada
- ✅ Formulario manual de registro de envíos
- ✅ UI de gestión de envíos (lista + filtros + búsqueda)

**Entregables Pendientes (requieren actualización por nuevas decisiones):**
- ⏳ Importación de Excel con **mapeo flexible de columnas** (usuario selecciona qué columna del Excel corresponde a cada campo)
- ⏳ Importación desde CSV con mapeo flexible
- ⏳ Validación de datos en importación (incluyendo Carnet de Identidad: 11 dígitos, Unidad de destino: obligatoria)
- ⏳ Vista previa de importación (todos los registros, no solo 10)
- ⏳ Reporte de errores de importación en pantalla
- ⏳ Historial de envíos por cliente (con exportación a PDF y CSV)
- ⏳ Documentación JSDoc para todas las funciones públicas

**Decisiones Tomadas para el Sprint 1 (14/08/2026):**

| Aspecto | Decisión |
|---------|----------|
| **Mapeo de columnas** | El usuario selecciona manualmente qué columna del Excel corresponde a cada campo del sistema |
| **Columnas extras** | Ignoradas |
| **Filas vacías** | Ignoradas (NULL) |
| **House** | Formato CACC-XXXXX, único en BD |
| **Carnet de Identidad** | Obligatorio, 11 dígitos exactos |
| **Unidad de destino** | Obligatorio, no puede ser NULL |
| **Passport** | Opcional, puede ser NULL |
| **Cobrado/No Cobrado** | Opcional, puede ser NULL |
| **Vista previa** | Mostrar todos los registros, no solo 10 |
| **Errores** | Mostrar todos los errores de una fila juntos en la misma tabla |
| **Reporte de errores** | En pantalla, sin límite de errores |
| **Historial por cliente** | Exportable a PDF y CSV |
| **JSDoc** | Todo el código debe estar documentado |

---

## 4. PRÓXIMOS SPRINTS

### Sprint 2: Optimización de Rutas
**Objetivo:** Planificar rutas semanales y visualizarlas en un mapa interactivo.

**Entregables Planificados:**
- [ ] Configurar OSRM (Open Source Routing Machine)
- [ ] Implementar geocodificación de direcciones
- [ ] Desarrollar algoritmo de optimización (VRPTW básico)
- [ ] Agrupar envíos por zona
- [ ] API para planificar rutas semanales
- [ ] Visualización de rutas en mapa (Leaflet)
- [ ] UI de planificación semanal
- [ ] Estimar tiempos y distancias
- [ ] Documentar API con OpenAPI (Swagger)

### Sprint 3: App del Chofer (MVP)
**Objetivo:** Desarrollar la app móvil para que los choferes puedan operar offline.
**Entregables:** Autenticación offline, ruta del día, mapa interactivo, registro de entregas, incidencias, costos reales, sincronización automática.

### Sprint 4: Dashboard y KPIs
**Objetivo:** Construir el panel de control con los indicadores clave de negocio.
**Entregables:** Dashboard principal, gráficos de rentabilidad, evolución de costos, reportes exportables.

### Sprint 5: Funcionalidades Premium y Finanzas
**Objetivo:** Agregar valor con características avanzadas incluyendo el módulo financiero, de aduana y ficha de costo.
**Entregables:** Edición drag & drop de rutas, firma digital en app móvil, ficha de costo detallada, gestión de parámetros financieros, consulta de aduana (URL de payment), cálculo de pago a choferes.

### Sprint 5.5: Calidad de Código con SonarQube (NUEVO)
**Objetivo:** Configurar SonarQube para análisis automático de calidad de código.
**Entregables:** SonarQube configurado en Docker Compose, análisis automático en GitHub Actions, umbrales de calidad definidos (cobertura ≥70%, deuda técnica <5%).

### Sprint 6: Piloto y Ajustes
**Objetivo:** Validar el sistema en un entorno real con usuarios finales.
**Entregables:** Despliegue en VPS ETECSA, migración de datos históricos, capacitación de choferes piloto, corrección de bugs.

### Sprint 7: Lanzamiento y Documentación
**Objetivo:** Preparar y lanzar la versión 1.0 del sistema.
**Entregables:** Sistema en producción, SSL/HTTPS configurado, manuales de usuario, app en Google Play Store, app en APKlis, descarga directa de APK.

---

## 5. PERFILES DE USUARIO (ACTUALIZADO)

| Perfil | Descripción | Permisos |
|--------|-------------|----------|
| **Administrador** | Dueño/gerente del sistema | Acceso total a todas las funcionalidades |
| **Jefe de Oficina (Agencia)** | Ej. Central American Cargo en Panamá | Importar manifiestos, revisar estado de envíos, ver todos los House de su agencia |
| **Jefe de Operaciones** | Controla rutas y operaciones | Crear, modificar y eliminar rutas. Controlar estado de rutas y House entregados |
| **Cliente Remitente** | Persona que envía el paquete | Ver solo estado de su House, ubicación, fecha de entrega, costo de aduana |
| **Cliente Destinatario** | Persona que recibe el paquete | Ver solo estado de su House, ubicación, fecha de entrega, costo de aduana |

---

## 6. TECNOLOGÍAS CONFIRMADAS

| Capa | Tecnología | Versión | Estado |
|------|------------|---------|--------|
| **Backend** | Node.js + TypeScript | Node 22.14.x, TS 5.8.x | ✅ Configurado |
| **API** | Express.js | 5.0.0 | ✅ Configurado |
| **ORM** | TypeORM | 0.3.20 | ✅ Configurado |
| **Frontend Web** | React + Vite + Tailwind CSS | React 18.x | ✅ Configurado |
| **Mobile** | Flutter | 3.x | ✅ Configurado |
| **Base de Datos** | PostgreSQL + PostGIS | 15.x | ✅ Configurado |
| **Almacenamiento Local** | SQLite | 3.x | ✅ Configurado |
| **Mapas y Rutas** | OpenStreetMap + OSRM | OSRM 5.x | ⏳ Pendiente |
| **Análisis de Calidad** | SonarQube (Community) | Latest | ⏳ Pendiente (configurar en Docker) |
| **Infraestructura** | VPS ETECSA, Nginx, SSL/HTTPS (Let's Encrypt), PM2 | - | ⏳ Pendiente |

---

## 7. DOCUMENTACIÓN COMPLETA

| Documento | Versión | Ubicación | Estado |
|-----------|---------|-----------|--------|
| Project Charter | 2.5 | `/docs/01-project-charter.md` | ✅ Actualizado |
| SRS (Requisitos) | 3.5 | `/docs/02-srs.md` | ⏳ Pendiente de actualizar |
| SPMP (Plan de Proyecto) | 3.5 | `/docs/03-spmp.md` | ⏳ Pendiente de actualizar |
| Maquetas UI/UX | 2.3 | `/docs/04-maquetas-uiux.md` | ⏳ Pendiente de actualizar |
| Análisis de Competencia | 2.1 | `/docs/05-analisis-competencia.md` | ✅ Actualizado |
| Arquitectura de Software | 2.5 | `/docs/06-arquitectura.md` | ⏳ Pendiente de actualizar |
| Onboarding Guide | 1.3 | `/docs/07-onboarding-guide.md` | ⏳ Pendiente de actualizar |
| Protocolo Asistente IA | 1.0 | `/docs/08-protocolo-asistente-ia.md` | ✅ Actualizado |
| **Estado Actual del Proyecto** | **1.2** | `/docs/09-estado-actual-del-proyecto.md` | ✅ Actualizado |

---

## 8. MÓDULOS IMPLEMENTADOS

| Módulo | Estado | Requisitos Implementados |
|--------|--------|--------------------------|
| **Clientes** | ✅ Implementado | RF-CL-02 (CRUD completo) |
| **Envíos (parcial)** | ⚠️ 60% | RF-CL-03 (CRUD básico), RF-CL-04 (historial parcial) |
| **Estándares de Codificación** | ✅ Implementado | RNF-13 a RNF-23 |
| **Documentación de Código** | ⚠️ Parcial | RNF-16, RNF-17, RNF-18, RNF-20, RNF-22 (parcial) |
| **CI/CD** | ✅ Implementado | RNF-19 |
| **Importación Excel (mapeo flexible)** | ⏳ Pendiente | RF-CL-01a (requiere actualización) |
| **Importación CSV (mapeo flexible)** | ⏳ Pendiente | RF-CL-01b (requiere actualización) |
| **Validación de datos** | ⏳ Pendiente | RF-CL-01c (requiere actualización) |
| **Vista previa** | ⏳ Pendiente | RF-CL-01d (requiere actualización) |
| **Reporte de errores** | ⏳ Pendiente | RF-CL-01e (requiere actualización) |
| **Flota** | ⏳ Pendiente | RF-FL-01 a RF-FL-08 |
| **Choferes** | ⏳ Pendiente | RF-CH-01 a RF-CH-06 |
| **Rutas** | ⏳ Pendiente | RF-RU-00a a RF-RU-08 |
| **Finanzas y Aduana** | ⏳ Pendiente | RF-CO-01 a RF-CO-15 |
| **App Chofer** | ⏳ Pendiente | RF-MO-01 a RF-MO-11 |
| **Dashboard** | ⏳ Pendiente | RF-DA-01 a RF-DA-08 |

---

## 9. DEPENDENCIAS DEL BACKEND (ACTUALIZADO)

| Librería | Versión | Propósito | Estado |
|----------|---------|-----------|--------|
| express | **^5.0.0** | Framework web para construir la API REST | ✅ |
| typeorm | **^0.3.20** | ORM para PostgreSQL | ✅ |
| pg | **^8.14.1** | Driver de PostgreSQL | ✅ |
| jsonwebtoken | ^9.0.2 | Autenticación JWT | ✅ |
| bcrypt | ^5.1.1 | Hash de contraseñas | ✅ |
| xlsx | ^0.18.5 | Lectura/escritura de Excel | ✅ |
| axios | ^1.8.4 | Cliente HTTP | ✅ |
| dotenv | ^16.4.7 | Variables de entorno | ✅ |
| joi | ^17.13.3 | Validación de datos | ✅ |
| winston | ^3.17.0 | Logging estructurado | ✅ |
| **multer** | **^1.4.5-lts.1** | **Upload de archivos (Excel)** | ✅ **NUEVO** |
| **cors** | **^2.8.5** | **Habilitar CORS** | ✅ **NUEVO** |
| **helmet** | **^8.1.0** | **Seguridad de cabeceras HTTP** | ✅ **NUEVO** |
| **express-rate-limit** | **^7.5.0** | **Rate limiting** | ✅ **NUEVO** |

---

## 10. REGLAS DE ORO PARA EL NUEVO ASISTENTE

| # | Regla | Descripción |
|---|-------|-------------|
| 1 | **Lee este documento primero** | Antes de hacer cualquier cosa, lee este documento de estado actual. |
| 2 | **Lee la documentación completa** | Revisa todos los documentos en /docs para entender el proyecto. |
| 3 | **Sigue los estándares** | ESLint, Prettier, Dart Analyzer son obligatorios. |
| 4 | **Documenta tu código** | JSDoc para funciones públicas. |
| 5 | **Prueba tu código** | Pruebas unitarias para todo código nuevo. |
| 6 | **Usa Conventional Commits** | feat:, fix:, docs:, etc. |
| 7 | **El Líder no sabe de tecnología** | Explica todo en lenguaje claro y sencillo. |
| 8 | **Sé proactivo** | Anticipa problemas y oportunidades. |
| 9 | **Siempre pregunta** | Cuando algo no esté claro, pregunta antes de asumir. |
| 10 | **Actualiza este documento** | Cada vez que se complete un hito, actualiza este documento. |

---

## 11. CONTACTO Y RECURSOS

| Recurso | Enlace |
|---------|--------|
| **Repositorio** | https://github.com/sigmateam/sigma-t |
| **Documentación** | https://github.com/sigmateam/sigma-t/tree/main/docs |
| **Líder del Proyecto** | Osleyder Gonzalez (usuario: Osleyder1985) |

---

## 12. PRÓXIMOS PASOS INMEDIATOS

1. ✅ **Sprint 0 completado** - Fundación del proyecto
2. 🔄 **Sprint 1 en progreso** - Core de Envíos (60% completado)
3. 📋 **Actualizar documentación pendiente** - SRS, SPMP, Maquetas, Arquitectura, Onboarding Guide
4. 📋 **Completar Sprint 1** - Importación con mapeo flexible, validaciones, JSDoc
5. ⏳ **Luego Sprint 2** - Optimización de Rutas

---

## 📌 CONCLUSIÓN

**Este documento debe ser el primer punto de lectura para cualquier nuevo asistente de IA que se incorpore al proyecto.** Contiene toda la información necesaria para entender el estado actual, la historia y los próximos pasos del proyecto.

---

## 🔄 ACTUALIZACIONES FUTURAS

| Fecha | Cambio | Versión |
|-------|--------|---------|
| 13/08/2026 | Creación del documento | 1.0 |
| 13/08/2026 | Sprint 1 completado - Core de Envíos. Actualización de progreso a 30% | 1.1 |
| 14/08/2026 | Revisión de estado real del Sprint 1. Corrección de progreso a 20%. Actualización de perfiles de usuario, validaciones de Carnet (11 dígitos) y Unidad de destino (obligatoria). Agregado Sprint 5.5 (SonarQube). Actualización de dependencias del backend (Express 5.x, TypeORM 0.3.20, nuevas librerías: multer, cors, helmet, express-rate-limit). | 1.2 |