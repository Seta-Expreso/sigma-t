## 📄 DOCUMENTO SPMP - SIGMA-T (VERSIÓN 3.8)

**Basado en IEEE 1058 - Plan de Gestión de Proyectos de Software**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente / Sponsor:** Osleyder Gonzalez Acosta  
**Fecha de Inicio del Proyecto:** 13 de agosto de 2026  
**Fecha Estimada de Finalización:** 01 de abril de 2027 (MVP)  
**Versión del Documento:** 3.8 (Completo - Top Mundial con Sprints 0 y 1 Completados, Plan de Migración - Actualización 15/08/2026)

---

## 1. INTRODUCCIÓN

### 1.1 Propósito y Alcance del Documento
Este documento define la dirección, la organización y el plan de trabajo para el desarrollo exitoso del sistema SIGMA-T. Su propósito es proporcionar una guía clara y exhaustiva para todos los involucrados, asegurando que el proyecto se ejecute de manera controlada, eficiente y alineada con los objetivos de convertirse en la solución líder en su nicho.

El alcance de este SPMP cubre todas las fases del ciclo de vida del software, desde la concepción hasta el despliegue y la operación inicial, incluyendo la gestión de riesgos, la calidad, la comunicación, los estándares de codificación, las funcionalidades financieras, la integración con aduana (utilizando la URL de payment), la generación de la ficha de costo detallada por ruta, la configuración del entorno de desarrollo, el despliegue en VPS ETECSA con SSL/HTTPS, la distribución de la app móvil en Google Play Store y APKlis, y la migración de datos desde los sistemas actuales (Excel, OptimoRoute, registros manuales).

### 1.2 Productos de Trabajo y Entregables Clave
Los principales entregables del proyecto se organizan por fases:

| Fase | Entregable | Descripción | Estado |
| :--- | :--- | :--- | :--- |
| **Iniciación** | Documento de Visión | Definición de la visión, los stakeholders y el alcance de alto nivel del sistema. | ✅ Completado |
| **Planificación** | **SRS (v3.7)** | Especificación detallada de todos los requisitos funcionales y no funcionales. | ✅ Actualizado |
| **Planificación** | **SPMP (v3.8)** | Este documento: Plan de gestión del proyecto. | ✅ Actualizado |
| **Planificación** | **Arquitectura (v2.8)** | Documento de Arquitectura de Software actualizado. | ✅ Actualizado |
| **Planificación** | **Prototipos UI/UX** | Maquetas de alta fidelidad de todas las interfaces (22 pantallas). | ✅ Actualizado |
| **Ejecución** | Código Fuente | Repositorio con el código de backend, frontend web y app móvil. | ✅ Completado (Sprint 0 y 1) |
| **Ejecución** | Pruebas y QA | Conjunto de planes de pruebas, casos de prueba y reportes de calidad. | ⏳ Pendiente |
| **Ejecución** | Documentación Técnica | Documentación generada automáticamente (TypeDoc, Swagger) y manuales. | ✅ Completado |
| **Ejecución** | Entorno de Desarrollo | Configuración completa del entorno con Docker, VSCode tasks.json, CI/CD. | ✅ Completado |
| **Cierre** | Manuales de Usuario | Guías para administradores, dispatchers y choferes. | ⏳ Pendiente |
| **Cierre** | Plan de Despliegue | Guía paso a paso para la instalación y operación del sistema en VPS ETECSA. | ⏳ Pendiente |
| **Cierre** | Sistema Productivo | Sistema SIGMA-T operativo en el entorno de producción del cliente. | ⏳ Pendiente |
| **Cierre** | App Publicada | App móvil disponible en Google Play Store, APKlis y descarga directa. | ⏳ Pendiente |
| **Cierre** | Datos Migrados | Datos históricos migrados desde sistemas actuales (Excel, OptimoRoute). | ⏳ Pendiente |

---

## 2. ORGANIZACIÓN DEL PROYECTO

### 2.1 Estructura Organizativa
El proyecto se gestionará siguiendo una estructura matricial, donde el equipo de desarrollo central colabora con el cliente y otros stakeholders.

```mermaid
flowchart TD
    L[Líder del Proyecto<br>Osleyder Gonzalez] --> E[Equipo de Desarrollo<br>Ingenieros y Documentalistas]
    L --> C[Stakeholders<br>(Clientes, Choferes, Dispatchers)]
    E --> C
    subgraph E [Equipo de Desarrollo]
        direction LR
        BE[Backend<br>Node.js + TypeScript]
        FE[Frontend<br>React + TypeScript]
        MO[Mobile<br>Flutter + Dart]
        QA[QA Engineer]
        DOC[Documentalista]
        DevOps[DevOps Engineer]
    end
```

### 2.2 Roles y Responsabilidades

| Rol | Responsabilidad | Asignado a |
| :--- | :--- | :--- |
| **Project Manager / Líder** | Dirección estratégica, toma de decisiones, validación de entregables, gestión de stakeholders. | **Osleyder Gonzalez** |
| **Arquitecto de Software** | Definir la arquitectura del sistema, estandarizar tecnologías, revisar el diseño técnico y los estándares de codificación. | Equipo SIGMA-T |
| **Desarrollador Backend** | Implementar la API REST, la lógica de negocio, la optimización de rutas y la base de datos. Asegurar el cumplimiento de estándares TypeScript/Node.js. Implementar servicios de integración con aduana (URL de payment), gestión de parámetros financieros, cálculo de ficha de costo, pago a choferes y automatización de facturación de aduana. Desarrollar scripts de migración de datos. | Equipo SIGMA-T |
| **Desarrollador Frontend** | Implementar el dashboard web, el panel administrativo y el portal del cliente. Asegurar el cumplimiento de estándares React/TypeScript. Implementar la UI de gestión de parámetros financieros, aduana, ficha de costo detallada y monitoreo de aduana. | Equipo SIGMA-T |
| **Desarrollador Mobile** | Implementar la aplicación Flutter para choferes con funcionalidad offline y sincronización. Asegurar el cumplimiento de estándares Dart/Flutter. Gestionar la publicación en Google Play Store y APKlis. | Equipo SIGMA-T |
| **Diseñador UX/UI** | Crear y refinar las maquetas, garantizar una experiencia de usuario óptima. Actualizar maquetas con nueva funcionalidad de aduana, ficha de costo y monitoreo de aduana. | Equipo SIGMA-T |
| **Ingeniero de QA** | Diseñar y ejecutar los casos de prueba, gestionar la calidad del producto, verificar el cumplimiento de estándares de codificación y documentación. Probar la integración con Aerovaradero (URL de payment), el cálculo de pagos, la precisión de la ficha de costo y la automatización de facturación de aduana. Validar la migración de datos. | Equipo SIGMA-T |
| **Documentalista** | Mantener al día toda la documentación técnica y los manuales de usuario, asegurar la generación automática de documentación. Documentar nuevos módulos financieros, de aduana, de ficha de costo e infraestructura. | Equipo SIGMA-T |
| **DevOps Engineer** | Configurar el entorno de desarrollo (Docker, VSCode tasks.json), gestionar el despliegue en VPS ETECSA, configurar SSL/HTTPS con Let's Encrypt, Nginx, PM2 y cron jobs para automatización de aduana. Gestionar backups y migración de datos. | Equipo SIGMA-T |

### 2.3 Comunicación y Reportes

| Stakeholder | Frecuencia | Canal | Propósito |
| :--- | :--- | :--- | :--- |
| **Líder del Proyecto** | **A diario** (standup) | WhatsApp / Correo | Sincronizar avances y resolver bloqueos. |
| **Stakeholders Clave** | **Mensual** | Reunión / Correo | Presentar el progreso y validar decisiones. |
| **Usuarios Piloto** | **Semanal** (durante pruebas) | App + Reunión | Recoger feedback y validar la usabilidad. |
| **Interno** | **Diario** (standup) | Reunión (virtual) | Coordinar el trabajo del equipo de desarrollo. |
| **Administradores de Sistemas** | **Según necesidad** | Correo / Reunión | Coordinar el despliegue en VPS ETECSA. |

---

## 3. PLAN DE TRABAJO Y CRONOGRAMA (SPRINTS) - ACTUALIZADO

### 3.1 Metodología: Ágil con Scrum
El proyecto se desarrollará utilizando una metodología ágil con sprints de **2 semanas de duración**. Este enfoque permite una adaptación rápida a los cambios, una entrega temprana de valor y una mejora continua del producto.

### 3.2 Planificación por Sprints Detallada (Actualizada)

| Sprint | Nombre / Módulo | Duración | Estado | Entregables Clave |
| :--- | :--- | :--- | :--- | :--- |
| **0** | **Fundación** | 1 día | ✅ Completado | Docker, Repos, BD, CI/CD, ESLint, Prettier, Dart Analyzer, guía de estándares, archivo tasks.json de VSCode, extensiones recomendadas, documentación completa. |
| **1** | **Core de Envíos** | 2 días | ✅ Completado | API de Envíos, Importación Excel con mapeo flexible, UI de listado, CRUD Clientes, CRUD Envíos, Historial por cliente, documentación JSDoc. |
| **2** | **Optimización de Rutas** | 2 Semanas | ⏳ Pendiente | Algoritmo VRPTW, Mapa interactivo, UI de planificación, documentación OpenAPI. |
| **3** | **App del Chofer (MVP)** | 2 Semanas | ⏳ Pendiente | App Flutter, sincronización, registro de incidencias, documentación Dart. |
| **4** | **Dashboard y KPIs** | 2 Semanas | ⏳ Pendiente | Dashboard, Gráficos de costos, Reportes, documentación de módulos. |
| **5** | **Funcionalidades Premium y Finanzas** | 2 Semanas | ⏳ Pendiente | Firma digital, Edición manual, Personalización, Gestión de parámetros financieros (incluyendo costos por km), Consulta de aduana (URL de payment), Cálculo de pago a choferes, Ficha de costo detallada por ruta, **Automatización de facturación de aduana (4 horarios)**. |
| **5.5** | **Calidad de Código (SonarQube)** | 1 día | ⏳ Pendiente | Configuración de SonarQube en Docker, integración con CI/CD, informes de calidad. |
| **6** | **Piloto y Ajustes** | 2 Semanas | ⏳ Pendiente | Feedback, Corrección de bugs, Mejoras de UX, verificación de estándares. |
| **7** | **Lanzamiento y Documentación** | 2 Semanas | ⏳ Pendiente | Sistema en producción (VPS ETECSA), SSL/HTTPS, Manuales, Video-tutoriales, App en Google Play Store, App en APKlis, Descarga directa de APK, **Migración de datos históricos**. |

### 3.3 Tareas Detalladas por Sprint (Actualizadas)

**Sprint 0: Fundación - ✅ COMPLETADO (13/08/2026)**

| # | Tarea | Responsable | Estado |
|---|-------|-------------|--------|
| 1 | Configurar servidor de desarrollo (Docker) | Backend | ✅ Completado |
| 2 | Configurar PostgreSQL + PostGIS | Backend | ✅ Completado |
| 3 | Configurar Node.js + TypeScript + Express | Backend | ✅ Completado |
| 4 | Configurar React + Vite + Tailwind CSS | Frontend | ✅ Completado |
| 5 | Configurar Flutter proyecto base | Mobile | ✅ Completado |
| 6 | Establecer CI/CD (GitHub Actions) | Backend | ✅ Completado |
| 7 | Configurar ESLint + Prettier (TypeScript) con reglas estrictas | Backend | ✅ Completado |
| 8 | Configurar Dart Analyzer (Flutter) con `analysis_options.yaml` | Mobile | ✅ Completado |
| 9 | Configurar GitHub Actions con análisis estático automático | Backend | ✅ Completado |
| 10 | Crear guía de estándares de codificación (documento interno) | Documentalista | ✅ Completado |
| 11 | Configurar TypeDoc para generación automática de documentación | Backend | ✅ Completado |
| 12 | Configurar Swagger UI (OpenAPI) para documentación de API | Backend | ✅ Completado |
| 13 | Crear archivo `.vscode/tasks.json` con tareas automatizadas | Backend | ✅ Completado |
| 14 | Documentar extensiones de VSCode recomendadas | Documentalista | ✅ Completado |
| 15 | Preparar documentación de despliegue en VPS ETECSA | Backend | ✅ Completado |

**Sprint 1: Core de Envíos - ✅ COMPLETADO (13-15/08/2026)**

| # | Tarea | Responsable | Estado |
|---|-------|-------------|--------|
| 1 | Diseñar modelo de datos (Clientes, Envíos) | Backend | ✅ Completado |
| 2 | Implementar API CRUD de Clientes | Backend | ✅ Completado |
| 3 | Implementar API CRUD de Envíos | Backend | ✅ Completado |
| 4 | Implementar importación de Excel con mapeo flexible de columnas | Backend | ✅ Completado |
| 5 | Implementar UI de mapeo de columnas | Frontend | ✅ Completado |
| 6 | Implementar validación de datos en importación (Carnet: 11 dígitos, Unidad de destino: obligatoria) | Backend | ✅ Completado |
| 7 | Implementar vista previa de importación (todos los registros) | Frontend | ✅ Completado |
| 8 | Implementar reporte de errores en pantalla | Frontend | ✅ Completado |
| 9 | Formulario manual de registro de envíos | Frontend | ✅ Completado |
| 10 | UI de gestión de envíos (lista + filtros + búsqueda) | Frontend | ✅ Completado |
| 11 | Implementar historial de envíos por cliente con exportación a PDF y CSV | Backend/Frontend | ✅ Completado |
| 12 | Documentar funciones con JSDoc | Backend/Frontend | ✅ Completado |
| 13 | Crear componentes UI: EnvioList, EnvioFilters, EnvioDetail, HistorialCliente, ImportarManifiesto | Frontend | ✅ Completado |

**Sprint 2: Optimización de Rutas - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Configurar OSRM (Open Source Routing Machine) | Backend | 2 días |
| 2 | Implementar geocodificación de direcciones | Backend | 2 días |
| 3 | Desarrollar algoritmo de optimización (VRPTW básico) | Backend | 4 días |
| 4 | Agrupar envíos por zona | Backend | 2 días |
| 5 | API para planificar rutas semanales | Backend | 2 días |
| 6 | Visualización de rutas en mapa (Leaflet) | Frontend | 3 días |
| 7 | UI de planificación semanal | Frontend | 2 días |
| 8 | Estimar tiempos y distancias | Backend | 2 días |
| 9 | Documentar API con OpenAPI (Swagger) | Backend | 1 día |

**Sprint 3: App del Chofer (MVP) - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Diseñar modelo de datos local (SQLite) | Mobile | 1 día |
| 2 | Implementar autenticación offline | Mobile | 2 días |
| 3 | Sincronización de ruta asignada | Backend + Mobile | 2 días |
| 4 | UI de lista de entregas | Mobile | 2 días |
| 5 | Visualización de ruta en mapa (Flutter Map) | Mobile | 3 días |
| 6 | Registro de estado de entrega | Mobile | 2 días |
| 7 | Registro de incidencias | Mobile | 2 días |
| 8 | Registro de costos reales (combustible, peajes) | Mobile | 2 días |
| 9 | Modo offline + sincronización automática | Mobile | 3 días |
| 10 | Indicador de estado de sincronización | Mobile | 1 día |
| 11 | Documentar código Dart | Mobile | 0.5 día |

**Sprint 4: Dashboard y KPIs - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Diseñar modelo de costos (fijos + variables) | Backend | 2 días |
| 2 | Implementar cálculo de costo por km | Backend | 2 días |
| 3 | Implementar cálculo de utilidad neta por viaje | Backend | 2 días |
| 4 | API de KPIs agregados | Backend | 2 días |
| 5 | Dashboard principal (React + Recharts) | Frontend | 3 días |
| 6 | Gráfico de rentabilidad por ruta | Frontend | 2 días |
| 7 | Gráfico de evolución de costos | Frontend | 2 días |
| 8 | Reporte de desempeño de choferes | Frontend | 2 días |
| 9 | Exportar reportes a CSV/PDF | Backend + Frontend | 2 días |
| 10 | Alertas automáticas (mantenimiento, consumo) | Backend | 2 días |
| 11 | Documentar módulos con READMEs | Documentalista | 1 día |

**Sprint 5: Funcionalidades Premium y Finanzas - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Edición drag & drop de rutas | Frontend | 3 días |
| 2 | Firma digital en app móvil | Mobile | 2 días |
| 3 | Captura de fotos de evidencia | Mobile | 2 días |
| 4 | Personalización de comprobantes de entrega | Backend + Frontend | 2 días |
| 5 | Implementar ficha de costo detallada por ruta | Backend | 3 días |
| 6 | Reoptimización en tiempo real (nuevos pedidos) | Backend | 3 días |
| 7 | Implementar gestión de parámetros financieros (incluyendo costos por km) | Backend | 2 días |
| 8 | Implementar servicio de consulta a Aerovaradero (URL de payment) | Backend | 3 días |
| 9 | Implementar lógica de parsing de HTML (Cheerio/Puppeteer) | Backend | 2 días |
| 10 | Implementar módulo de pago a choferes | Backend | 2 días |
| 11 | UI de gestión de parámetros financieros y aduana | Frontend | 3 días |
| 12 | UI de ficha de costo detallada | Frontend | 2 días |
| 13 | Implementar exportación de ficha de costo a PDF y CSV | Backend + Frontend | 2 días |
| 14 | **Implementar automatización de facturación de aduana (4 horarios)** | **Backend + DevOps** | **3 días** |
| 15 | Configurar cron jobs para consultas automáticas de aduana | DevOps | 1 día |
| 16 | Actualizar documentación | Documentalista | 1 día |

**Sprint 5.5: Calidad de Código con SonarQube - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Configurar SonarQube en Docker Compose | DevOps | 0.5 día |
| 2 | Integrar SonarQube con GitHub Actions | DevOps | 0.5 día |
| 3 | Definir umbrales de calidad (cobertura ≥70%, deuda técnica <5%) | QA | 0.5 día |
| 4 | Ejecutar análisis inicial y corregir hallazgos | Equipo | 1 día |
| 5 | Documentar configuración en Onboarding Guide | Documentalista | 0.5 día |

**Sprint 6: Piloto y Ajustes - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Configurar producción (VPS ETECSA) | DevOps | 2 días |
| 2 | Migrar datos históricos | Backend | 2 días |
| 3 | Capacitar a 2 choferes piloto | Líder + Mobile | 2 días |
| 4 | Operación real en 2 rutas durante 1 semana | Todos | 5 días |
| 5 | Recopilar feedback de choferes | Líder | 1 día |
| 6 | Corregir bugs críticos | Equipo | 2 días |
| 7 | Segunda semana de prueba | Todos | 5 días |
| 8 | Verificar cumplimiento de estándares de codificación | QA | 1 día |
| 9 | Pruebas de integración con Aerovaradero (URL de payment) | QA | 2 días |
| 10 | Pruebas de precisión de ficha de costo | QA | 1 día |
| 11 | Pruebas de automatización de facturación de aduana | QA | 2 días |

**Sprint 7: Lanzamiento y Documentación - ⏳ PENDIENTE**

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1 | Corrección de bugs finales | Equipo | 3 días |
| 2 | Optimización de rendimiento | Equipo | 2 días |
| 3 | Documentación técnica completa | Documentalista | 3 días |
| 4 | Manual de usuario (administrador) | Documentalista | 2 días |
| 5 | Manual de usuario (chofer) | Documentalista | 2 días |
| 6 | Video tutoriales | Líder | 2 días |
| 7 | Despliegue final en producción (VPS ETECSA) | DevOps | 2 días |
| 8 | Configurar SSL/HTTPS con Let's Encrypt | DevOps | 0.5 día |
| 9 | Configurar Nginx como proxy inverso | DevOps | 1 día |
| 10 | Capacitación a todo el equipo | Líder | 2 días |
| 11 | Verificación final de estándares de codificación | QA | 1 día |
| 12 | Publicar app en Google Play Store | Mobile | 2 días |
| 13 | Publicar app en APKlis (tienda cubana) | Mobile | 1 día |
| 14 | Configurar descarga directa de APK desde el sitio web | Backend | 1 día |
| 15 | **Migración final de datos históricos** | **Backend** | **2 días** |
| 16 | **Verificación de datos migrados** | **QA** | **1 día** |

---

## 4. GESTIÓN DE RIESGOS

### 4.1 Metodología de Gestión de Riesgos
Se implementará un proceso iterativo de **Identificación → Análisis → Planificación de Respuesta → Monitoreo**. Este proceso se revisará al final de cada sprint para identificar nuevos riesgos y evaluar la efectividad de las respuestas planificadas.

### 4.2 Matriz de Riesgos

| Riesgo | Prob. | Impacto | Estrategia de Mitigación | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Conectividad limitada en zonas rurales** | **Alta** | **Alto** | **Diseño robusto de modo offline en la app móvil, sincronización automática al recuperar conexión, y gestión de conflictos de datos.** | ⏳ Pendiente |
| **Calidad de datos de OpenStreetMap en Cuba** | **Alta** | **Medio** | **Implementar un sistema de edición colaborativa de mapas por parte de los choferes, y usar datos GPS reales para mejorar la precisión de las rutas.** | ⏳ Pendiente |
| **Resistencia al cambio de los choferes** | **Media** | **Alto** | **Diseño de interfaz extremadamente simple, programa de incentivos y gamificación (puntos, rankings), y capacitación presencial con acompañamiento en ruta.** | ⏳ Pendiente |
| **Sostenibilidad Financiera** | **Media** | **Medio** | **Modelo open source con opción de soporte profesional, colaboración con universidades y entidades del estado cubano para la adopción.** | ⏳ Pendiente |
| **Cambios en normativas cubanas** | **Media** | **Medio** | **Arquitectura modular y flexible para adaptaciones rápidas, y asesoría legal continua.** | ⏳ Pendiente |
| **Fuga de Talento** | **Baja** | **Alto** | **Cultura de proyecto desafiante y de alto impacto, y posibilidad de reconocimiento público (proyecto open source referente).** | ⏳ Pendiente |
| **Baja calidad de código** | **Media** | **Alto** | **Estándares de codificación estrictos (ESLint, Prettier, Dart Analyzer), análisis estático en CI/CD, revisiones de código obligatorias, y métricas de calidad.** | ✅ Mitigado |
| **Documentación insuficiente** | **Media** | **Medio** | **JSDoc obligatorio para funciones públicas, generación automática de documentación (TypeDoc, Swagger), y cobertura mínima del 80%.** | ✅ Mitigado |
| **Inconsistencia en el estilo de código** | **Media** | **Medio** | **Prettier para formateo automático, guía de estándares documentada, y pre-commit hooks para validación automática.** | ✅ Mitigado |
| **Deuda técnica acumulada** | **Media** | **Alto** | **Refactorización continua, revisiones de código, y sprints dedicados a mejora técnica (Sprint 5.5).** | ⏳ Pendiente |
| **Cambios en el sitio web de Aerovaradero (URL de payment)** | **Alta** | **Alto** | **Sistema de alertas de fallo en extracción, entrada manual de costos de aduana como contingencia, monitoreo periódico del sitio.** | ⏳ Pendiente |
| **Fallos en el proceso automatizado de facturación de aduana** | **Media** | **Alto** | **Sistema de alertas, reintentos automáticos, entrada manual como contingencia, logs detallados.** | ⏳ Pendiente |
| **Fluctuación de la tasa de cambio y precios de combustible** | **Alta** | **Medio** | **Actualización manual/configurable de parámetros, historial de cambios para análisis.** | ⏳ Pendiente |
| **Errores en cálculo de pago a choferes** | **Media** | **Alto** | **Validaciones automáticas, auditoría de cálculos, generación de reportes de pago para revisión.** | ⏳ Pendiente |
| **Errores en cálculo de ficha de costo** | **Media** | **Alto** | **Validaciones automáticas, auditoría de cálculos, pruebas con datos reales, precisión de 2 decimales.** | ⏳ Pendiente |
| **Disponibilidad de VPS ETECSA** | **Media** | **Alto** | **Tener plan de contingencia con servidor alternativo (nube internacional).** | ⏳ Pendiente |
| **Google Play Store bloqueada desde Cuba** | **Alta** | **Medio** | **Distribuir también vía APKlis y descarga directa.** | ⏳ Pendiente |
| **Configuración de SSL/HTTPS** | **Baja** | **Medio** | **Documentación detallada, uso de Let's Encrypt, renovación automática.** | ⏳ Pendiente |
| **Recursos limitados del VPS ETECSA** | **Media** | **Medio** | **Optimización de recursos, caché con Redis, monitoreo de rendimiento.** | ⏳ Pendiente |
| **Error en migración de datos** | **Media** | **Alto** | **Scripts de migración probados en staging, backups, validaciones automáticas.** | ⏳ Pendiente |
| **Pérdida de datos durante migración** | **Baja** | **Crítico** | **Backups antes de migrar, migración por fases, verificación post-migración.** | ⏳ Pendiente |

---

## 5. GESTIÓN DE LA CALIDAD Y PRUEBAS (SQA)

### 5.1 Estándares de Calidad
El proyecto se adherirá a los siguientes estándares para garantizar un producto de clase mundial:

- **ISO/IEC 25010:** Para definir y evaluar la calidad del producto en términos de funcionalidad, eficiencia, usabilidad y seguridad.
- **ISO/IEC 29119:** Para la gestión y ejecución de las pruebas de software.
- **ISO/IEC/IEEE 29148:** Para la especificación de requisitos.
- **IEEE 1016:** Para la descripción del diseño de software.
- **Estándares de Codificación:** ESLint, Prettier, Dart Analyzer, JSDoc, OpenAPI.

### 5.2 Estrategia de Pruebas (QA)

| Nivel de Prueba | Descripción | Herramientas | Responsable |
| :--- | :--- | :--- | :--- |
| **Análisis Estático** | Verificación automática de estándares de codificación | ESLint, Prettier, Dart Analyzer | CI/CD (GitHub Actions) |
| **Pruebas Unitarias** | Verificar la lógica de cada componente o función | Jest (Backend), Flutter Test (Mobile) | Desarrollador |
| **Pruebas de Integración** | Validar comunicación entre módulos y servicios externos | Supertest, Postman | Desarrollador / QA |
| **Pruebas de Sistema** | Simular flujos de trabajo completos del usuario | Cypress (E2E), Appium | QA |
| **Pruebas de Aceptación (UAT)** | Ejecutadas por usuarios reales (choferes, dispatchers) | Manual | Usuarios Piloto |
| **Pruebas de Usabilidad** | Evaluar curva de aprendizaje y satisfacción del usuario | Encuestas, Observación | Diseñador UX / QA |
| **Pruebas de Rendimiento** | Verificar rendimiento bajo carga (optimización de rutas) | K6, Artillery | QA |
| **Pruebas de Documentación** | Verificar cobertura y calidad de JSDoc / comentarios | ESLint-plugin-jsdoc, TypeDoc | QA / Documentalista |
| **Pruebas de Integración con Aduana** | Verificar extracción correcta de costos de Aerovaradero (URL de payment) | Jest + nock / Puppeteer | QA |
| **Pruebas de Cálculo Financiero** | Validar precisión de cálculos de pago a choferes, costos y ficha de costo | Jest (Backend) | QA |
| **Pruebas de Precisión de Ficha de Costo** | Verificar precisión de 2 decimales en todos los cálculos de la ficha de costo | Jest (Backend) | QA |
| **Pruebas de Automatización de Aduana** | Verificar ejecución en 4 horarios, detección de importe y factura, cambio de estado | Jest + cron-mock | QA |
| **Pruebas de Infraestructura** | Verificar funcionamiento en VPS ETECSA, SSL/HTTPS, Nginx, PM2, cron jobs | Pruebas manuales / Scripts | DevOps / QA |
| **Pruebas de Calidad (SonarQube)** | Análisis de duplicación, deuda técnica y seguridad | SonarQube Community | QA / DevOps |
| **Pruebas de Migración** | Validar integridad de datos migrados | Scripts Python / Node.js | QA / Backend |

### 5.3 Criterios de Aceptación (Checklist de Calidad)

| # | Criterio | Especificación | Herramienta de Verificación | Estado |
|---|----------|----------------|----------------------------|--------|
| 1 | **Cobertura de Código** | >70% del código nuevo cubierto por pruebas unitarias | Jest / Flutter Test | ⏳ Pendiente |
| 2 | **Cero Bugs Críticos** | No se aceptan bugs que bloqueen la funcionalidad principal | Jira / GitHub Issues | ⏳ Pendiente |
| 3 | **Cumplimiento de Usabilidad** | Usuarios piloto completan tareas sin asistencia en <2 horas | Pruebas de Usabilidad | ⏳ Pendiente |
| 4 | **Rendimiento** | Sistema maneja 1,000 envíos sin degradación significativa | Pruebas de Rendimiento | ⏳ Pendiente |
| 5 | **Estándares de Codificación (Backend)** | ≥95% del código TypeScript cumple con ESLint/Prettier | ESLint / Prettier | ✅ Cumplido |
| 6 | **Estándares de Codificación (Mobile)** | ≥95% del código Dart cumple con Dart Analyzer | Dart Analyzer | ✅ Cumplido |
| 7 | **Documentación de Código** | ≥80% de funciones públicas documentadas con JSDoc | ESLint-plugin-jsdoc | ✅ Cumplido |
| 8 | **Documentación de API** | API documentada con OpenAPI (Swagger) | Swagger UI | ✅ Cumplido |
| 9 | **Documentación de Módulos** | Cada módulo tiene README.md actualizado | Revisión manual | ✅ Cumplido |
| 10 | **CI/CD sin Errores** | Pipeline de CI/CD pasa todas las verificaciones | GitHub Actions | ✅ Cumplido |
| 11 | **Conventional Commits** | 100% de mensajes de commit siguen el estándar | Commitlint | ✅ Cumplido |
| 12 | **Integración con Aduana** | **Consulta automática de costos de aduana para ≥95% de los envíos en <5 minutos utilizando la URL de payment** | **Pruebas de Integración** | ⏳ Pendiente |
| 13 | **Cálculo de Pago a Choferes** | **Cálculo correcto según esquemas configurados (fijo, por km, por entrega, combinado)** | **Pruebas Unitarias** | ⏳ Pendiente |
| 14 | **Gestión de Parámetros** | **Actualización de parámetros financieros (incluyendo costos por km) en tiempo real con historial de cambios** | **Pruebas de Sistema** | ⏳ Pendiente |
| 15 | **Ficha de Costo Detallada** | **Generación de ficha de costo en <5 segundos por ruta, con precisión de 2 decimales, incluyendo todos los componentes de costo (directos, indirectos, importación), y exportación a PDF/CSV** | **Pruebas de Sistema / Pruebas de Rendimiento** | ⏳ Pendiente |
| 16 | **Automatización de Facturación de Aduana** | **Consultas automáticas en 4 horarios (8AM, 12PM, 4PM, 12AM), SOLO houses "Arribados", cambio a "Facturado" cuando tiene importe y factura** | **Pruebas de Integración / Pruebas de Sistema** | ⏳ Pendiente |
| 17 | **Despliegue en VPS ETECSA** | **El sistema funciona correctamente en VPS ETECSA con Ubuntu 22.04 LTS** | **Pruebas de Infraestructura** | ⏳ Pendiente |
| 18 | **SSL/HTTPS** | **SSL/HTTPS configurado y funcionando correctamente con Let's Encrypt** | **Pruebas de Infraestructura** | ⏳ Pendiente |
| 19 | **Publicación en Google Play Store** | **App publicada en Google Play Store** | **Revisión manual** | ⏳ Pendiente |
| 20 | **Publicación en APKlis** | **App publicada en APKlis** | **Revisión manual** | ⏳ Pendiente |
| 21 | **Descarga Directa de APK** | **Descarga directa de APK disponible desde el sitio web** | **Revisión manual** | ⏳ Pendiente |
| 22 | **Análisis de Calidad SonarQube** | **Cobertura de código ≥70%, Deuda Técnica <5%, Cero Bugs Críticos** | **SonarQube** | ⏳ Pendiente |
| 23 | **Migración de Datos** | **100% de datos migrados, 0% de pérdida de información, >95% de registros válidos** | **Scripts de Validación** | ⏳ Pendiente |

### 5.4 Métricas de Calidad de Código

| Métrica | Objetivo | Medición | Frecuencia | Estado |
|---------|----------|----------|------------|--------|
| **Cobertura de Documentación** | ≥80% de funciones públicas documentadas | ESLint-plugin-jsdoc | Cada PR | ✅ Cumplido |
| **Cumplimiento de Estándares** | ≥95% del código sin violaciones de ESLint/Dart Analyzer | ESLint / Dart Analyzer | Cada PR | ✅ Cumplido |
| **Deuda Técnica** | <5% de deuda técnica identificada | SonarQube | Mensual | ⏳ Pendiente |
| **Código Duplicado** | <3% de código duplicado | SonarQube | Mensual | ⏳ Pendiente |
| **Complejidad Ciclomática** | <10 por función | ESLint (complexity) | Cada PR | ✅ Cumplido |

---

## 6. GESTIÓN DE LA CONFIGURACIÓN Y CONTROL DE VERSIONES

### 6.1 Repositorio y Ramas
- **Plataforma:** GitHub (repositorio público post-lanzamiento).
- **Ramas Principales:**
    - `main`: Código en producción. Solo se actualiza con releases estables.
    - `develop`: Rama de integración donde se fusionan las nuevas funcionalidades.
    - `feature/*`: Rama para desarrollar una nueva característica (ej. `feature/importacion-excel`, `feature/integracion-aduana-payment`, `feature/ficha-costo`, `feature/infraestructura-vps`, `feature/automatizacion-aduana`).
    - `hotfix/*`: Rama para correcciones críticas urgentes en producción.

### 6.2 Política de Commits
Los mensajes de commit deben seguir el estándar **Conventional Commits**:

```
tipo(alcance): descripción corta (máximo 50 caracteres)

[descripción larga opcional, con más detalles]

[referencias a issues o tickets]
```

**Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, comas, etc.)
- `refactor`: Refactorización de código
- `test`: Adición o modificación de pruebas
- `chore`: Cambios en el proceso de build o herramientas
- `perf`: Mejora de rendimiento
- `ci`: Cambios en CI/CD

**Pre-commit Hooks:**
- ESLint / Prettier (TypeScript)
- Dart Analyzer (Flutter)
- Commitlint (validación de mensajes)

### 6.3 Versionado Semántico
El proyecto utilizará el versionado semántico (SemVer) para las releases:
- **MAJOR (`v2.0.0`):** Cambios incompatibles en la API.
- **MINOR (`v1.1.0`):** Nuevas funcionalidades (compatibles con versiones anteriores).
- **PATCH (`v1.0.1`):** Corrección de errores.

---

## 7. PLAN DE GESTIÓN DEL CAMBIO Y ADOPCIÓN

### 7.1 Gestión del Cambio (Ágil)
Dado que el proyecto se rige por Scrum, los cambios se gestionan principalmente en las **reuniones de planificación del sprint**. Cualquier cambio en los requisitos se analizará y priorizará con el Líder del Proyecto para su inclusión en el backlog del siguiente sprint.

### 7.2 Plan de Adopción y Capacitación (Estrategia de Lanzamiento)

1. **Fase Piloto (Sprint 6):** El sistema se implementará en 2 rutas reales con 2 choferes "early adopters". Se les dará una capacitación intensiva y se recogerá su feedback para realizar ajustes finales.

2. **Lanzamiento Formal (Sprint 7):**
   - **Capacitación Presencial:** Se realizarán sesiones de entrenamiento presenciales para todos los choferes y el personal de oficina. Se usarán tutoriales en vídeo y guías rápidas. Se incluirá capacitación específica sobre el uso de la funcionalidad de consulta de costos de aduana (URL de payment), la interpretación de la ficha de costo detallada y el monitoreo de la automatización de facturación de aduana.
   - **Programa de Incentivos:** Se diseñará un sistema de recompensas (puntos, bonos) para los choferes que utilicen la aplicación de manera consistente y reporten menos incidencias.
   - **Soporte Dedicado:** Se habilitará un canal de comunicación directo (WhatsApp) para que los choferes puedan reportar problemas y recibir ayuda inmediata durante las primeras semanas.
   - **Instalación de la App:** Se proporcionarán instrucciones claras para la descarga e instalación desde Google Play Store, APKlis y descarga directa.

3. **Posicionamiento y Visibilidad (Fase Post-Lanzamiento):**
   - **Open Source:** El código se hará público en GitHub para atraer colaboradores y demostrar transparencia y calidad.
   - **Comunidad:** Se creará un sitio web o página del proyecto para documentar casos de éxito y compartir las métricas de mejora (ej. "Reducción del 20% en km recorridos", "Ahorro en costos de aduana mediante consulta automática", "Optimización de costos con ficha de costo detallada", "Automatización de facturación de aduana en 4 horarios").
   - **Publicaciones:** Se escribirán artículos técnicos sobre la solución (ej. "Cómo optimizamos rutas con OSRM en Cuba", "Integración con Aerovaradero utilizando URL de payment para costos de aduana", "Ficha de costo: herramienta clave para la rentabilidad en transporte", "Automatización de facturación de aduana en Cuba") para posicionar a SIGMA-T como un referente técnico en el sector.
   - **Documentación Técnica:** Se publicará la documentación técnica generada automáticamente (TypeDoc, Swagger) para que la comunidad pueda entender y contribuir al proyecto.

### 7.3 Plan de Formación Continua
El equipo de desarrollo recibirá formación continua en:
- **Estándares de Codificación:** Talleres iniciales y revisiones periódicas.
- **Herramientas de Análisis:** Uso de ESLint, Prettier, Dart Analyzer.
- **Documentación de Código:** Prácticas de JSDoc, OpenAPI y TypeDoc.
- **Revisión de Código:** Mejores prácticas para revisiones efectivas.
- **Técnicas de Web Scraping:** Uso de Cheerio y Puppeteer para integración con sitios externos (URL de payment).
- **Cálculos Financieros:** Precisión en cálculos de costos, pagos a choferes y ficha de costo.
- **Despliegue en VPS ETECSA:** Configuración de Nginx, SSL/HTTPS, PM2.
- **Publicación en Tiendas:** Procesos de Google Play Store y APKlis.
- **Análisis de Calidad con SonarQube:** Interpretación de métricas y corrección de hallazgos.
- **Automatización de Aduana:** Configuración de cron jobs, manejo de errores, logs y alertas.
- **Migración de Datos:** Uso de scripts, validación de datos, verificación post-migración.

---

## 8. PLAN DE MIGRACIÓN DE DATOS

### 8.1 Propósito y Alcance

Este plan define la estrategia, procedimientos y herramientas para migrar los datos existentes desde los sistemas actuales (Excel, OptimoRoute, registros manuales) hacia la nueva plataforma SIGMA-T. El objetivo es garantizar una transición ordenada, sin pérdida de información y con mínima interrupción de las operaciones.

### 8.2 Fuentes de Datos Actuales

| Fuente | Tipo de Datos | Formato | Volumen Estimado | Responsable |
|--------|---------------|---------|------------------|-------------|
| **Excel - Manifiestos** | Envíos, clientes, destinatarios | .xlsx / .csv | 1,000+ registros | Jefe de Operaciones |
| **Excel - Flota** | Vehículos, mantenimientos | .xlsx | 5-20 vehículos | Administrador |
| **Excel - Choferes** | Conductores, pagos | .xlsx | 5-20 choferes | Administrador |
| **OptimoRoute** | Rutas planificadas, historial | CSV (exportable) | 100+ rutas | Jefe de Operaciones |
| **Registros Manuales** | Costos, incidencias, notas | Papel / Digital | Variable | Personal Administrativo |

### 8.3 Estrategia de Migración

#### 8.3.1 Enfoque General

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ESTRATEGIA DE MIGRACIÓN                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  FASE 1     │    │  FASE 2     │    │  FASE 3     │    │  FASE 4     │  │
│  │  PREPARACIÓN│───▶│  EXTRACCIÓN │───▶│  VALIDACIÓN │───▶│  CARGA      │  │
│  │             │    │             │    │             │    │             │  │
│  │ • Inventario│    │ • Exportar  │    │ • Limpiar   │    │ • Importar  │  │
│  │ • Formato   │    │ • Convertir │    │ • Validar   │    │ • Verificar │  │
│  │ • Herramien-│    │ • Estandari-│    │ • Corregir  │    │ • Aceptar   │  │
│  │   tas       │    │   zar       │    │ • Aprobar   │    │             │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 8.3.2 Tipos de Migración

| Tipo | Descripción | Cuándo Usar |
|------|-------------|-------------|
| **Migración Masiva (Big Bang)** | Todos los datos se migran en un solo evento | Volumen pequeño, datos limpios |
| **Migración por Fases** | Los datos se migran en lotes por período | Volumen grande, datos históricos |
| **Migración Híbrida** | Datos activos migrados + históricos disponibles | Recomendado para SIGMA-T |

### 8.4 Procedimiento de Migración por Entidad

#### 8.4.1 Migración de Clientes

| Paso | Actividad | Herramienta | Responsable | Tiempo Estimado |
|------|-----------|-------------|-------------|-----------------|
| 1 | Exportar clientes desde Excel | Excel | Jefe de Operaciones | 30 min |
| 2 | Limpiar datos (duplicados, incompletos) | Excel / Script | Administrador | 1 hora |
| 3 | Convertir al formato de SIGMA-T | Script Python / Node.js | Backend | 30 min |
| 4 | Validar datos (nombre, contacto, teléfono) | Script | QA | 30 min |
| 5 | Importar a SIGMA-T | API `/api/clientes/importar` | Administrador | 15 min |
| 6 | Verificar importación | Sistema SIGMA-T | QA | 15 min |

**Formato Requerido para Clientes:**

```csv
nombre_empresa,contacto_nombre,contacto_telefono,contacto_email,tarifa_preferencial,activo
"CAC Paquetería & Envío México","Carlos Rodríguez","+52 55 1234 5678","carlos@cacpaqueteria.com",45.00,true
"Cliente X","Juan Pérez","+53 5XXX XXXX","juan@email.com",50.00,true
```

#### 8.4.2 Migración de Envíos

| Paso | Actividad | Herramienta | Responsable | Tiempo Estimado |
|------|-----------|-------------|-------------|-----------------|
| 1 | Recopilar manifiestos históricos (últimos 6 meses) | Excel | Jefe de Operaciones | 2 horas |
| 2 | Estandarizar formato de columnas | Excel / Script | Administrador | 2 horas |
| 3 | Validar datos (Carnet 11 dígitos, Unidad destino) | Script Python | Backend | 1 hora |
| 4 | Corregir datos inválidos | Excel / Manual | Administrador | 4 horas |
| 5 | Generar archivo de importación | Script | Backend | 30 min |
| 6 | Importar a SIGMA-T (modo vista previa) | Sistema SIGMA-T | Administrador | 30 min |
| 7 | Revisar errores y corregir | Manual | Administrador | 2 horas |
| 8 | Importación final | Sistema SIGMA-T | Administrador | 30 min |

**Formato Requerido para Envíos (Manifiesto):**

```csv
house,awb,descripcion,peso,bultos,remitente_nombre,remitente_passport,destinatario_nombre,destinatario_identificacion,destinatario_telefono,destinatario_direccion,cobrado_origen,unidad_destino,estado
CACC-24014926,230-66684660,"Caja de herramientas",30.0,2,"Juan Pérez","ABC123456","Anilex Mariam Pérez Fonseca","90123112345","53 5XXX XXXX","Calle 10 #22, Camagüey, Cuba",true,CMW,entregado
```

**Validaciones de Envíos:**

| Campo | Validación | Error | Acción |
|-------|------------|-------|--------|
| house | Único, formato CACC-XXXXXXXX | House duplicado o inválido | Corregir o eliminar |
| destinatario_identificacion | 11 dígitos exactos | No tiene 11 dígitos | Corregir manualmente |
| unidad_destino | No puede ser NULL | Campo vacío | Asignar código de provincia |
| peso | > 0 | Peso 0 o negativo | Corregir manualmente |
| bultos | > 0 | Bultos 0 | Corregir manualmente |
| destinatario_nombre | No vacío | Campo vacío | Corregir manualmente |

#### 8.4.3 Migración de Vehículos

| Paso | Actividad | Herramienta | Responsable | Tiempo Estimado |
|------|-----------|-------------|-------------|-----------------|
| 1 | Recopilar datos de vehículos | Excel | Administrador | 30 min |
| 2 | Limpiar y estandarizar | Excel | Administrador | 30 min |
| 3 | Importar a SIGMA-T | API `/api/flota/vehiculos` | Administrador | 15 min |
| 4 | Verificar importación | Sistema SIGMA-T | QA | 15 min |

**Formato Requerido para Vehículos:**

```csv
matricula,marca,modelo,año,capacidad_kg,capacidad_m3,tipo_combustible,consumo_promedio,kilometraje_total,disponible
CAC-01,Isuzu,NPR 2019,2019,5000,22.0,diesel,12.0,45230,true
CAC-02,Hino,300 2020,2020,4500,20.0,diesel,11.5,38900,true
```

#### 8.4.4 Migración de Choferes

| Paso | Actividad | Herramienta | Responsable | Tiempo Estimado |
|------|-----------|-------------|-------------|-----------------|
| 1 | Recopilar datos de choferes | Excel | Administrador | 30 min |
| 2 | Limpiar y estandarizar | Excel | Administrador | 30 min |
| 3 | Configurar esquemas de pago | Excel | Administrador | 1 hora |
| 4 | Importar a SIGMA-T | API `/api/choferes` | Administrador | 15 min |
| 5 | Verificar importación | Sistema SIGMA-T | QA | 15 min |

**Formato Requerido para Choferes:**

```csv
nombre,identificacion,licencia_tipo,licencia_vigencia,telefono,fecha_ingreso,salario_base,esquema_pago,salario_por_km,salario_por_entrega
"Juan Carlos Pérez Rodríguez","901231-12345",B,"2028-12-31","53 5XXX XXXX","2021-03-15",8500.00,combinado,2.50,150.00
```

#### 8.4.5 Migración de Datos de Aduana

| Paso | Actividad | Herramienta | Responsable | Tiempo Estimado |
|------|-----------|-------------|-------------|-----------------|
| 1 | Identificar envíos con costos de aduana conocidos | Sistema actual | Jefe de Operaciones | 1 hora |
| 2 | Extraer costos de aduana de Aerovaradero (pendientes) | Script automatizado | Backend | 1 hora |
| 3 | Registrar importes manuales (cuando no se pueda consultar) | Sistema SIGMA-T | Administrador | 2 horas |
| 4 | Asignar costos a envíos | Sistema SIGMA-T | Administrador | 30 min |
| 5 | Verificar asignación | Sistema SIGMA-T | QA | 30 min |

#### 8.4.6 Migración de Historial de Rutas

| Paso | Actividad | Herramienta | Responsable | Tiempo Estimado |
|------|-----------|-------------|-------------|-----------------|
| 1 | Exportar rutas desde OptimoRoute | CSV | Jefe de Operaciones | 30 min |
| 2 | Convertir al formato de SIGMA-T | Script | Backend | 1 hora |
| 3 | Validar datos de rutas | Script | QA | 30 min |
| 4 | Importar a SIGMA-T (histórico) | API | Administrador | 30 min |
| 5 | Generar fichas de costo para rutas históricas | Sistema SIGMA-T | Administrador | 1 hora |

### 8.5 Herramientas de Migración

#### 8.5.1 Scripts de Migración

```typescript
// backend/src/scripts/migracion-clientes.ts

import { Client } from '../models/cliente.model';
import * as fs from 'fs';
import * as csv from 'csv-parser';

async function migrarClientes(archivo: string): Promise<void> {
    const clientes = [];
    const errores = [];
    
    // 1. Leer archivo CSV
    fs.createReadStream(archivo)
        .pipe(csv())
        .on('data', (row) => {
            try {
                // 2. Validar datos
                const cliente = validarCliente(row);
                if (cliente) {
                    clientes.push(cliente);
                } else {
                    errores.push({ fila: row, error: 'Datos inválidos' });
                }
            } catch (error) {
                errores.push({ fila: row, error: error.message });
            }
        })
        .on('end', async () => {
            // 3. Importar a la base de datos
            for (const cliente of clientes) {
                try {
                    await Client.save(cliente);
                    console.log(`✅ Cliente importado: ${cliente.nombre_empresa}`);
                } catch (error) {
                    errores.push({ cliente, error: error.message });
                    console.error(`❌ Error importando cliente: ${error.message}`);
                }
            }

            // 4. Generar reporte
            generarReporteMigracion({
                total: clientes.length + errores.length,
                exitosos: clientes.length,
                errores: errores
            });
        });
}

function validarCliente(row: any): any | null {
    // Validaciones básicas
    if (!row.nombre_empresa) {
        throw new Error('nombre_empresa es obligatorio');
    }
    if (!row.contacto_nombre) {
        throw new Error('contacto_nombre es obligatorio');
    }
    if (!row.contacto_telefono) {
        throw new Error('contacto_telefono es obligatorio');
    }

    return {
        nombre_empresa: row.nombre_empresa,
        contacto_nombre: row.contacto_nombre,
        contacto_telefono: row.contacto_telefono,
        contacto_email: row.contacto_email || null,
        tarifa_preferencial: parseFloat(row.tarifa_preferencial) || 0,
        activo: row.activo === 'true' || row.activo === 'TRUE' || row.activo === '1'
    };
}

function generarReporteMigracion(reporte: any): void {
    const contenido = `
=== REPORTE DE MIGRACIÓN ===
Fecha: ${new Date().toISOString()}
Total procesados: ${reporte.total}
Importados exitosamente: ${reporte.exitosos}
Errores: ${reporte.errores.length}

${reporte.errores.map(e => `- Error: ${e.error}`).join('\n')}
    `;

    fs.writeFileSync('migracion-reporte.txt', contenido);
    console.log('📄 Reporte generado: migracion-reporte.txt');
}
```

#### 8.5.2 Script de Validación de Envíos

```typescript
// backend/src/scripts/validar-envios.ts

async function validarEnvio(envio: any): Promise<{ valido: boolean, errores: string[] }> {
    const errores: string[] = [];

    // 1. Validar House
    if (!envio.house) {
        errores.push('House es obligatorio');
    } else if (!/^CACC-[0-9]{8}$/.test(envio.house)) {
        errores.push(`House "${envio.house}" no tiene el formato correcto (CACC-XXXXXXXX)`);
    }

    // 2. Validar Carnet de Identidad
    if (!envio.destinatario_identificacion) {
        errores.push('Carnet de Identidad es obligatorio');
    } else if (!/^[0-9]{11}$/.test(envio.destinatario_identificacion)) {
        errores.push(`Carnet de Identidad "${envio.destinatario_identificacion}" debe tener 11 dígitos`);
    }

    // 3. Validar Unidad de Destino
    if (!envio.unidad_destino) {
        errores.push('Unidad de Destino es obligatoria');
    }

    // 4. Validar Peso
    if (!envio.peso || parseFloat(envio.peso) <= 0) {
        errores.push('Peso debe ser mayor a 0');
    }

    // 5. Validar Bultos
    if (!envio.bultos || parseInt(envio.bultos) <= 0) {
        errores.push('Bultos debe ser mayor a 0');
    }

    return {
        valido: errores.length === 0,
        errores: errores
    };
}
```

### 8.6 Plantilla de Validación de Datos

```markdown
## 📋 PLANTILLA DE VALIDACIÓN DE DATOS

### Clientes
| Campo | Validación | Estado | Observaciones |
|-------|------------|--------|---------------|
| nombre_empresa | No vacío | [✅ / ❌] | |
| contacto_nombre | No vacío | [✅ / ❌] | |
| contacto_telefono | No vacío | [✅ / ❌] | |
| contacto_email | Formato email (opcional) | [✅ / ❌] | |

### Envíos
| Campo | Validación | Estado | Observaciones |
|-------|------------|--------|---------------|
| house | Único, CACC-XXXXXXXX | [✅ / ❌] | |
| destinatario_identificacion | 11 dígitos | [✅ / ❌] | |
| unidad_destino | No vacío | [✅ / ❌] | |
| peso | > 0 | [✅ / ❌] | |
| bultos | > 0 | [✅ / ❌] | |
| destinatario_nombre | No vacío | [✅ / ❌] | |

### Vehículos
| Campo | Validación | Estado | Observaciones |
|-------|------------|--------|---------------|
| matricula | No vacío | [✅ / ❌] | |
| marca | No vacío | [✅ / ❌] | |
| modelo | No vacío | [✅ / ❌] | |
| capacidad_kg | > 0 | [✅ / ❌] | |

### Choferes
| Campo | Validación | Estado | Observaciones |
|-------|------------|--------|---------------|
| nombre | No vacío | [✅ / ❌] | |
| identificacion | No vacío | [✅ / ❌] | |
| licencia_tipo | B, C, D | [✅ / ❌] | |
| licencia_vigencia | Fecha futura | [✅ / ❌] | |
```

### 8.7 Cronograma de Migración

| Fase | Actividad | Duración | Fecha Inicio | Fecha Fin | Responsable |
|------|-----------|----------|--------------|-----------|-------------|
| **Fase 1: Preparación** | | | | | |
| 1.1 | Inventario de fuentes de datos | 1 día | Día 1 | Día 1 | Administrador |
| 1.2 | Definir formato de importación | 1 día | Día 1 | Día 1 | Backend |
| 1.3 | Crear scripts de migración | 2 días | Día 2 | Día 3 | Backend |
| **Fase 2: Extracción y Limpieza** | | | | | |
| 2.1 | Exportar datos desde Excel | 2 días | Día 4 | Día 5 | Jefe Operaciones |
| 2.2 | Limpiar y estandarizar datos | 3 días | Día 6 | Día 8 | Administrador |
| 2.3 | Validar datos | 2 días | Día 9 | Día 10 | QA |
| **Fase 3: Carga en Pruebas** | | | | | |
| 3.1 | Migrar a entorno de staging | 1 día | Día 11 | Día 11 | Backend |
| 3.2 | Verificar integridad | 1 día | Día 12 | Día 12 | QA |
| 3.3 | Corregir errores | 2 días | Día 13 | Día 14 | Backend |
| **Fase 4: Carga en Producción** | | | | | |
| 4.1 | Backup de datos existentes | 1 día | Día 15 | Día 15 | DevOps |
| 4.2 | Migrar a producción | 1 día | Día 16 | Día 16 | Backend |
| 4.3 | Verificación final | 1 día | Día 17 | Día 17 | QA |
| 4.4 | Aceptación | 1 día | Día 18 | Día 18 | Administrador |

### 8.8 Criterios de Aceptación de Migración

| # | Criterio | Descripción | Métrica |
|---|----------|-------------|---------|
| 1 | **Completitud** | Todos los datos migrados | 100% de registros contabilizados |
| 2 | **Integridad** | Datos sin pérdida de información | 0% de pérdida de datos |
| 3 | **Validez** | Datos cumplen reglas de negocio | >95% de registros válidos |
| 4 | **Consistencia** | Datos consistentes entre sistemas | Relaciones correctas (cliente-envío, vehículo-ruta) |
| 5 | **Aduana** | Costos de aduana asignados correctamente | ≥90% de envíos con costo de aduana |
| 6 | **Pagos** | Esquemas de pago configurados | 100% de choferes con esquema configurado |

### 8.9 Reporte de Migración

```markdown
## 📊 REPORTE DE MIGRACIÓN - SIGMA-T

**Fecha:** [dd/mm/yyyy]
**Responsable:** [Nombre]
**Entorno:** [Staging / Producción]

### Resumen General

| Entidad | Total | Importados | Errores | Tasa de Éxito |
|---------|-------|------------|---------|---------------|
| Clientes | [#] | [#] | [#] | [%] |
| Envíos | [#] | [#] | [#] | [%] |
| Vehículos | [#] | [#] | [#] | [%] |
| Choferes | [#] | [#] | [#] | [%] |
| Rutas | [#] | [#] | [#] | [%] |

### Detalle de Errores

| ID | Entidad | Campo | Error | Acción Tomada |
|----|---------|-------|-------|---------------|
| 1 | Envío | destinatario_identificacion | 10 dígitos | Corregido manualmente |
| 2 | Envío | unidad_destino | Null | Asignado "CMW" |

### Observaciones

[Observaciones sobre el proceso de migración]

### Próximos Pasos

- [ ] Verificar datos migrados en producción
- [ ] Generar fichas de costo históricas
- [ ] Configurar esquemas de pago de choferes
- [ ] Verificar costos de aduana asignados

### Aprobación

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Administrador | [Nombre] | _________ | ___/___/2026 |
| Jefe de Operaciones | [Nombre] | _________ | ___/___/2026 |
```

### 8.10 Plan de Contingencia para Migración

| Escenario | Plan de Contingencia | Responsable |
|-----------|---------------------|-------------|
| **Error en migración de datos** | Restaurar backup y reintentar con datos corregidos | DevOps |
| **Pérdida de datos** | Restaurar desde backup más reciente | DevOps |
| **Inconsistencia de datos** | Ejecutar scripts de validación y corrección | Backend |
| **Migración incompleta** | Continuar con migración por fases | Backend |
| **Tiempo excedido** | Extender ventana de mantenimiento | Administrador |
| **Falla en importación de aduana** | Entrada manual de costos | Administrador |

### 8.11 Checklists de Migración

#### Checklist de Preparación

- [ ] Backup de todos los datos existentes realizado
- [ ] Scripts de migración probados en entorno de staging
- [ ] Datos limpios y validados
- [ ] Formato de archivos confirmado
- [ ] Roles y permisos definidos
- [ ] Plan de comunicación a stakeholders preparado

#### Checklist de Ejecución

- [ ] Migrar clientes
- [ ] Migrar vehículos
- [ ] Migrar choferes
- [ ] Migrar envíos (históricos)
- [ ] Migrar rutas (históricas)
- [ ] Asignar costos de aduana
- [ ] Generar fichas de costo históricas
- [ ] Configurar esquemas de pago
- [ ] Verificar integridad de datos

#### Checklist de Verificación

- [ ] Todos los clientes están en el sistema
- [ ] Todos los vehículos están en el sistema
- [ ] Todos los choferes están en el sistema
- [ ] Todos los envíos históricos están en el sistema
- [ ] Los costos de aduana están asignados
- [ ] Las fichas de costo están generadas
- [ ] Los esquemas de pago están configurados
- [ ] Los reportes financieros son consistentes

---

## 9. PRESUPUESTO ESTIMADO

| Concepto | Costo Estimado | Notas |
|----------|---------------|-------|
| **Infraestructura (VPS ETECSA)** | $20 - $50 / mes | VPS ETECSA (250 CUP de suscripción + mensualidad) |
| **Dominio y SSL** | $10 / año | Let's Encrypt para SSL |
| **Licencias de Software** | $0 | 100% Open Source |
| **Herramientas de Análisis** | $0 | ESLint, Prettier, Dart Analyzer (open source) |
| **Documentación** | $0 | TypeDoc, Swagger UI, JSDoc (open source) |
| **Web Scraping** | $0 | Cheerio, Puppeteer (open source) |
| **Generación de PDF** | $0 | Librerías open source (ej. PDFKit, jsPDF) |
| **Publicación en Play Store** | $25 | Pago único por cuenta de desarrollador |
| **Publicación en APKlis** | $0 | Gratuito |
| **Capacitación** | $0 | Realizada por el Líder y el Equipo |
| **Soporte y Mantenimiento** | $0 | A cargo del Equipo de Desarrollo |
| **Imprevistos (10%)** | Incluido en la estimación mensual | Para cubrir contingencias |
| **TOTAL ANUAL ESTIMADO** | **$275 - $635** | Extremadamente bajo en comparación con soluciones comerciales (OptimoRoute: ~$500/chofer/año) |

---

## 10. APROBACIONES

| Rol | Nombre | Firma | Fecha |
| :--- | :--- | :--- | :--- |
| **Líder del Proyecto** | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| **Arquitecto de Software** | Equipo SIGMA-T | _________ | ___/___/2026 |
| **Stakeholder Principal** | CAC Paquetería | _________ | ___/___/2026 |

---

## 📌 CONCLUSIÓN

Este SPMP Versión 3.8 ahora incluye:

- ✅ **9 Sprints** (incluyendo Sprint 5.5 para SonarQube) con tareas detalladas
- ✅ **Sprint 0 completado** en 1 día (13/08/2026) con todos los entregables
- ✅ **Sprint 1 completado** en 2 días (13-15/08/2026) con todos los entregables
- ✅ **23 criterios de aceptación** de calidad (incluyendo SonarQube, automatización de aduana y migración)
- ✅ **5 métricas de calidad de código** con estado de cumplimiento
- ✅ **Política de commits** (Conventional Commits) y pre-commit hooks
- ✅ **Estrategia de pruebas** con análisis estático, verificación de documentación, pruebas de integración con Aerovaradero (URL de payment), pruebas de cálculo financiero, pruebas de precisión de ficha de costo, pruebas de automatización de aduana, pruebas de infraestructura y pruebas de migración
- ✅ **Plan de formación continua** actualizado con SonarQube, automatización de aduana y migración de datos
- ✅ **Riesgos** identificados y mitigados con estados
- ✅ **Presupuesto actualizado** con costos de VPS ETECSA y publicación en Play Store
- ✅ **Estado actualizado** del proyecto con Sprints 0 y 1 completados
- ✅ **Automatización de facturación de aduana** definida (4 horarios: 8AM, 12PM, 4PM, 12AM)
- ✅ **9 estados del paquete** definidos y documentados
- ✅ **5 perfiles de usuario** definidos (Administrador, Jefe de Operaciones, Agencia de Envíos, Cliente Remitente, Cliente Destinatario)
- ✅ **Plan de Migración de Datos** completo con procedimientos por entidad, scripts, cronograma, criterios de aceptación y checklists

**Este documento refleja el estado actual del proyecto, con los Sprints 0 y 1 completados y listo para el Sprint 2 (Optimización de Rutas).**

---