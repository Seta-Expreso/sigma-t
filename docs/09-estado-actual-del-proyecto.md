# ESTADO ACTUAL DEL PROYECTO SIGMA-T

**Última Actualización:** 15 de agosto de 2026
**Versión:** 1.4
**Propósito:** Proporcionar una visión clara del estado actual del proyecto para cualquier nuevo miembro del equipo o asistente de IA.

---

## 1. RESUMEN EJECUTIVO

| Aspecto | Estado |
|---------|--------|
| **Proyecto** | SIGMA-T - Sistema Integral de Gestión para MiPYME de Transporte |
| **Fase Actual** | Sprint 1 - Core de Envíos (completado) |
| **Progreso General** | 25% completado |
| **Fecha de Inicio** | 13 de agosto de 2026 |
| **MVP Estimado** | 15 de enero de 2027 |
| **Release 1.0** | 01 de abril de 2027 |

---

## 2. SPRINTS COMPLETADOS

### Sprint 0: Fundación ✅ COMPLETADO (13/08/2026)

**Entregables:**
- ✅ Repositorio GitHub (Seta-Expreso/sigma-t)
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
- Organización GitHub: Seta-Expreso
- Repositorio: sigma-t
- Dominio: Pendiente (usaremos IP del VPS ETECSA)
- Build de Android deshabilitado temporalmente hasta Sprint 3
- Stack tecnológico confirmado (Node.js, React, Flutter, PostgreSQL)

---

### Sprint 1: Core de Envíos ✅ COMPLETADO (15/08/2026)

**Objetivo:** Gestionar clientes y envíos, e importar el manifiesto desde Excel con mapeo flexible de columnas.

**Entregables Completados:**
- ✅ Modelo de datos (Clientes, Envíos) diseñado e implementado
- ✅ API CRUD de Clientes implementada
- ✅ API CRUD de Envíos implementada
- ✅ Formulario manual de registro de envíos
- ✅ UI de gestión de envíos (lista + filtros + búsqueda)
- ✅ Importación de Excel con mapeo flexible de columnas
- ✅ Importación desde CSV con mapeo flexible
- ✅ Validación de datos en importación (Carnet: 11 dígitos, Unidad destino: obligatoria)
- ✅ Vista previa de importación (todos los registros)
- ✅ Reporte de errores de importación en pantalla
- ✅ Historial de envíos por cliente (con exportación a PDF y CSV)
- ✅ Documentación JSDoc para todas las funciones públicas
- ✅ Componentes UI: EnvioList, EnvioFilters, EnvioDetail, HistorialCliente, ImportarManifiesto
- ✅ CI/CD pasando sin errores

**Decisiones Tomadas para el Sprint 1:**

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

## 3. FLUJO DE PAQUETERÍA (DEFINIDO)

### Diagrama del Flujo

```
Cliente Remitente → Agencia CAC → Aerovaradero → Aduana → Seta Expreso → Cliente Destinatario
```

### Estados del Paquete (9 estados)

| # | Estado | Responsable | Descripción |
|---|--------|-------------|-------------|
| 1 | **Faltante de Origen** | Aerovaradero | El bulto nunca salió del país de origen (FIN) |
| 2 | **Presencial** | Aerovaradero | Problema detectado por aduana (FIN) |
| 3 | **Arribado** | Aerovaradero | Llegó al Aeropuerto de destino |
| 4 | **Facturado** | Aerovaradero | Tiene importe y factura en Aerovaradero |
| 5 | **Entregado en Aerovaradero** | Aerovaradero | Recogido por Seta Expreso |
| 6 | **Clasificación** | Seta Expreso | En almacén clasificando por provincia |
| 7 | **Proceso de Entrega** | Seta Expreso | En ruta al destinatario |
| 8 | **Entregado** | Seta Expreso | Entregado con firma y fotos |
| 9 | **No Entregado** | Seta Expreso | No se pudo entregar, vuelve a clasificación |

---

## 4. PERFILES DE USUARIO (DEFINIDOS)

| # | Perfil | Descripción | Permisos |
|---|--------|-------------|----------|
| 1 | **Administrador** | Dueño/gerente del sistema | Acceso total a todas las funcionalidades |
| 2 | **Jefe de Operaciones** | Controla rutas y operaciones | CRUD Rutas, Importar manifiestos, Ver todos los estados, Ver historial, Exportar |
| 3 | **Agencia de Envíos** | CAC Panamá/México/Miami | Importar manifiestos, Ver sus envíos, Historial, Exportar, Ver costos de aduana |
| 4 | **Cliente Remitente** | Persona que envía un paquete | Ver su envío (todos los estados), Historial, Exportar, Ver costo de aduana |
| 5 | **Cliente Destinatario** | Persona que recibe un paquete | Ver su envío (todos los estados), Historial, Exportar, Ver costo de aduana |

### Matriz de Permisos

| Funcionalidad | Admin | Jefe Operaciones | Agencia | Remitente | Destinatario |
|---------------|-------|------------------|---------|-----------|--------------|
| CRUD Clientes | ✅ | ❌ | ❌ | ❌ | ❌ |
| CRUD Envíos | ✅ | ❌ | ❌ | ❌ | ❌ |
| CRUD Rutas | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver todos los envíos | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver sus envíos | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver historial por cliente | ✅ | ✅ | ✅ | ✅ | ✅ |
| Importar manifiestos | ✅ | ✅ | ✅ | ❌ | ❌ |
| Exportar historial | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver costo de aduana | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver ficha de costo | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gestión de parámetros | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 5. AUTOMATIZACIÓN DE ADUANA (DEFINIDA)

| Aspecto | Especificación |
|---------|----------------|
| **Horarios de consulta** | 8:00 AM, 12:00 PM, 4:00 PM, 12:00 AM (hora de Cuba) |
| **URL de consulta** | `https://www.aerovaradero.com.cu/payment/?cod_la={cod_la}&cod_awb={cod_awb}&cod_house={house}` |
| **Criterio de facturación** | El house debe tener **AMBOS**: Importe > $0.00 Y Factura existe |
| **Acción** | Cambiar estado de "Arribado" a "Facturado" |
| **Optimización** | SOLO se consultan houses con estado "Arribado" |
| **Ignorar** | Houses con estado "Facturado" NO se consultan nuevamente |

---

## 6. PRÓXIMOS SPRINTS

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
**Entregables:** Edición drag & drop de rutas, firma digital en app móvil, ficha de costo detallada, gestión de parámetros financieros, **automatización de facturación de aduana (4 horarios)**, cálculo de pago a choferes.

### Sprint 5.5: Calidad de Código con SonarQube
**Objetivo:** Configurar SonarQube para análisis automático de calidad de código.
**Entregables:** SonarQube configurado en Docker Compose, análisis automático en GitHub Actions, umbrales de calidad definidos (cobertura ≥70%, deuda técnica <5%).

### Sprint 6: Piloto y Ajustes
**Objetivo:** Validar el sistema en un entorno real con usuarios finales.
**Entregables:** Despliegue en VPS ETECSA, migración de datos históricos, capacitación de choferes piloto, corrección de bugs.

### Sprint 7: Lanzamiento y Documentación
**Objetivo:** Preparar y lanzar la versión 1.0 del sistema.
**Entregables:** Sistema en producción, SSL/HTTPS configurado, manuales de usuario, app en Google Play Store, app en APKlis, descarga directa de APK.

---

## 7. TECNOLOGÍAS CONFIRMADAS

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

## 8. DOCUMENTACIÓN COMPLETA

| Documento | Versión | Ubicación | Estado |
|-----------|---------|-----------|--------|
| Project Charter | 2.6 | `/docs/01-project-charter.md` | ⏳ Pendiente de actualizar |
| SRS (Requisitos) | 3.7 | `/docs/02-srs.md` | ⏳ Pendiente de actualizar |
| SPMP (Plan de Proyecto) | 3.7 | `/docs/03-spmp.md` | ⏳ Pendiente de actualizar |
| Maquetas UI/UX | 2.5 | `/docs/04-maquetas-uiux.md` | ⏳ Pendiente de actualizar |
| Análisis de Competencia | 2.2 | `/docs/05-analisis-competencia.md` | ⏳ Pendiente de actualizar |
| Arquitectura de Software | 2.7 | `/docs/06-arquitectura.md` | ⏳ Pendiente de actualizar |
| Onboarding Guide | 1.3 | `/docs/07-onboarding-guide.md` | ⏳ Pendiente de actualizar |
| Protocolo Asistente IA | 1.1 | `/docs/08-protocolo-asistente-ia.md` | ⏳ Pendiente de actualizar |
| **Estado Actual del Proyecto** | **1.4** | `/docs/09-estado-actual-del-proyecto.md` | ✅ Actualizado |

---

## 9. MÓDULOS IMPLEMENTADOS

| Módulo | Estado | Requisitos Implementados |
|--------|--------|--------------------------|
| **Clientes** | ✅ Implementado | RF-CL-02 (CRUD completo) |
| **Envíos** | ✅ Implementado | RF-CL-01a, RF-CL-01b, RF-CL-01c, RF-CL-01d, RF-CL-01e, RF-CL-03, RF-CL-04, RF-CL-06 |
| **Importación con mapeo flexible** | ✅ Implementado | RF-CL-01a, RF-CL-01b |
| **Validación de datos** | ✅ Implementado | RF-CL-01c (Carnet 11 dígitos, Unidad destino obligatoria) |
| **Vista previa de importación** | ✅ Implementado | RF-CL-01d (todos los registros) |
| **Reporte de errores** | ✅ Implementado | RF-CL-01e (en pantalla) |
| **Historial por cliente** | ✅ Implementado | RF-CL-04 (exportación PDF/CSV) |
| **UI de gestión de envíos** | ✅ Implementado | EnvioList, EnvioFilters, EnvioDetail |
| **Estándares de Codificación** | ✅ Implementado | RNF-13 a RNF-23 |
| **Documentación de Código** | ✅ Implementado | RNF-16, RNF-17, RNF-18, RNF-20, RNF-22 |
| **CI/CD** | ✅ Implementado | RNF-19 |
| **Flota** | ⏳ Pendiente | RF-FL-01 a RF-FL-08 |
| **Choferes** | ⏳ Pendiente | RF-CH-01 a RF-CH-06 |
| **Rutas** | ⏳ Pendiente | RF-RU-00a a RF-RU-08 |
| **Finanzas y Aduana** | ⏳ Pendiente | RF-CO-01 a RF-CO-15, RF-ADU-01 |
| **Automatización de Aduana** | ⏳ Pendiente | RF-ADU-01 (4 horarios) |
| **App Chofer** | ⏳ Pendiente | RF-MO-01 a RF-MO-11 |
| **Dashboard** | ⏳ Pendiente | RF-DA-01 a RF-DA-08 |

---

## 10. DEPENDENCIAS DEL BACKEND

| Librería | Versión | Propósito | Estado |
|----------|---------|-----------|--------|
| express | **^5.0.0** | Framework web para construir la API REST | ✅ |
| typeorm | **^0.3.20** | ORM para PostgreSQL | ✅ |
| pg | **^8.14.1** | Driver de PostgreSQL | ✅ |
| jsonwebtoken | ^9.0.2 | Autenticación JWT | ✅ |
| bcrypt | ^5.1.1 | Hash de contraseñas | ✅ |
| xlsx | ^0.18.5 | Lectura/escritura de Excel | ✅ |
| axios | ^1.8.4 | Cliente HTTP (para scraping de Aerovaradero) | ✅ |
| dotenv | ^16.4.7 | Variables de entorno | ✅ |
| joi | ^17.13.3 | Validación de datos | ✅ |
| winston | ^3.17.0 | Logging estructurado | ✅ |
| **multer** | **^1.4.5-lts.1** | **Upload de archivos (Excel)** | ✅ |
| **cors** | **^2.8.5** | **Habilitar CORS** | ✅ |
| **helmet** | **^8.1.0** | **Seguridad de cabeceras HTTP** | ✅ |
| **express-rate-limit** | **^7.5.0** | **Rate limiting** | ✅ |
| **cheerio** | **^1.0.0** | **Web scraping - parseo HTML (Aerovaradero)** | ⏳ Pendiente |
| **node-cron** | **^3.0.0** | **Programación de tareas (4 horarios)** | ⏳ Pendiente |

---

## 11. REGLAS DE ORO PARA EL NUEVO ASISTENTE

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

## 12. CONTACTO Y RECURSOS

| Recurso | Enlace |
|---------|--------|
| **Repositorio** | https://github.com/Seta-Expreso/sigma-t |
| **Documentación** | https://github.com/Seta-Expreso/sigma-t/tree/main/docs |
| **Líder del Proyecto** | Osleyder Gonzalez (usuario: Osleyder1985) |

---

## 13. PRÓXIMOS PASOS INMEDIATOS

1. ✅ **Sprint 0 completado** - Fundación del proyecto
2. ✅ **Sprint 1 completado** - Core de Envíos
3. 📋 **Actualizar documentación pendiente** - Project Charter, SRS, SPMP, Maquetas, Arquitectura, Onboarding Guide, Análisis de Competencia, Protocolo Asistente IA
4. ⏳ **Sprint 2** - Optimización de Rutas

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
| 15/08/2026 | Sprint 1 completado al 100%. Actualización de perfiles de usuario (5 perfiles: Administrador, Jefe de Operaciones, Agencia de Envíos, Cliente Remitente, Cliente Destinatario). Definición de 9 estados del paquete. Definición de automatización de aduana (4 horarios). Agregada matriz de permisos. | 1.4 |