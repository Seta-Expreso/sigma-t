Perfecto, Líder. Procedo con el siguiente documento.

---

## 📄 DOCUMENTO: PLAN DE COMUNICACIÓN Y STAKEHOLDERS - SIGMA-T (VERSIÓN 1.0)

**Basado en PMI - Gestión de Comunicaciones del Proyecto**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente / Sponsor:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 15 de agosto de 2026  
**Versión del Documento:** 1.0 (Completa - Top Mundial con Finanzas, Aduana, Ficha de Costo e Infraestructura)

---

## 1. INTRODUCCIÓN Y PROPÓSITO

### 1.1 Propósito del Documento
Este documento define la estrategia de comunicación para el proyecto SIGMA-T, estableciendo qué información se comunica, a quién, con qué frecuencia, a través de qué canales y con qué formato. Asegura que todos los stakeholders estén informados y alineados durante todo el ciclo de vida del proyecto.

### 1.2 Alcance
El plan de comunicación cubre:
- Stakeholders internos (Equipo de Desarrollo)
- Stakeholders externos (Agencias de Envíos, Choferes, Clientes)
- Canales de comunicación oficiales
- Frecuencia y formato de reportes
- Matriz RACI de decisiones
- Protocolo de escalación de problemas

### 1.3 Audiencia
- **Líder del Proyecto:** Para definir y aprobar la estrategia de comunicación.
- **Equipo de Desarrollo:** Para entender sus responsabilidades de comunicación.
- **Stakeholders:** Para conocer los canales y frecuencia de comunicación.

---

## 2. STAKEHOLDERS Y REQUERIMIENTOS DE COMUNICACIÓN

### 2.1 Matriz de Stakeholders

| Stakeholder | Rol | Interés | Influencia | Expectativas Clave |
|-------------|-----|---------|------------|-------------------|
| **Osleyder Gonzalez** | Líder del Proyecto / Sponsor | Alto | Alta | Visibilidad total, ROI positivo, posicionamiento de mercado |
| **Equipo de Desarrollo** | Ejecutores del Proyecto | Alto | Alta | Entregar producto de alta calidad, documentado, funcional |
| **Jefe de Operaciones** | Usuario Operativo | Alto | Media | Control de rutas, estado de entregas, visión de todos los envíos |
| **Agencias de Envíos (CAC)** | Clientes / Socios Externos | Alto | Media | Importar manifiestos, rastrear houses, ver costos de aduana |
| **Choferes** | Usuarios Operativos | Alto | Media | Interfaz simple, app funcional sin internet, pago transparente |
| **Personal Administrativo** | Usuarios Backoffice | Medio | Baja | Reportes claros, automatización, facilidad de uso |
| **Cliente Remitente** | Cliente Final | Medio | Baja | Ver estado de su paquete, ubicación, fecha de entrega |
| **Cliente Destinatario** | Cliente Final | Medio | Baja | Ver estado de su paquete, ubicación, fecha de entrega |
| **Comunidad Open Source** | Contribuidores Potenciales | Bajo | Media | Código limpio, bien documentado, con estándares claros |
| **ETECSA** | Proveedor de Infraestructura | Bajo | Media | Uso adecuado de recursos del VPS, estabilidad del servicio |
| **Google Play Store** | Plataforma de Distribución | Bajo | Media | Cumplimiento de políticas, app funcional y segura |
| **APKlis** | Plataforma de Distribución | Bajo | Media | App funcional, disponibilidad para usuarios cubanos |

### 2.2 Matriz RACI (Responsable, Aprobador, Consultado, Informado)

| Decisión / Actividad | Líder | Equipo Dev | Jefe Operaciones | Agencias | Choferes | Clientes |
|----------------------|-------|------------|------------------|----------|----------|----------|
| **Definición de Requisitos** | A | R | C | C | C | I |
| **Aprobación de Sprint** | A | R | C | I | I | I |
| **Cambios en Requisitos** | A | R | C | C | I | I |
| **Diseño de UI/UX** | A | R | C | I | I | I |
| **Pruebas de Usabilidad** | C | R | C | C | R | I |
| **Despliegue en Producción** | A | R | I | I | I | I |
| **Capacitación de Choferes** | C | R | C | I | R | I |
| **Comunicación de Estado** | A | R | C | C | I | I |
| **Gestión de Incidentes** | A | R | C | C | I | C |
| **Cambios en Aduana (Aerovaradero)** | C | R | C | R | I | I |
| **Actualización de Parámetros Financieros** | A | R | C | C | I | I |
| **Publicación en Play Store** | A | R | I | I | I | I |

**Leyenda:**
- **R** = Responsable de ejecutar
- **A** = Aprobador (toma la decisión final)
- **C** = Consultado (se solicita su opinión)
- **I** = Informado (se le notifica)

---

## 3. CANALES DE COMUNICACIÓN

### 3.1 Canales Oficiales

| Canal | Propósito | Audiencia | Frecuencia |
|-------|-----------|-----------|------------|
| **GitHub** | Código, documentación, issues, pull requests | Equipo de Desarrollo, Comunidad Open Source | Continua |
| **WhatsApp** | Comunicación diaria, standups, alertas urgentes | Líder, Equipo de Desarrollo, Stakeholders clave | Diaria |
| **Correo Electrónico** | Reportes formales, actas, aprobaciones | Líder, Stakeholders | Según necesidad |
| **Reuniones Presenciales** | Sprint Planning, Review, Retrospectiva | Líder, Equipo de Desarrollo | Cada 2 semanas |
| **Reuniones Virtuales** | Demos, capacitación, reuniones con stakeholders | Todos | Según necesidad |
| **Documentación** | SRS, SPMP, Arquitectura, Maquetas, Guías | Todos | Continua |
| **Sistema SIGMA-T** | Comunicación operativa (notificaciones, alertas) | Administradores, Choferes, Agencias, Clientes | En tiempo real |

### 3.2 Canales por Tipo de Comunicación

| Tipo de Comunicación | Canal Primario | Canal Secundario |
|----------------------|----------------|------------------|
| **Comunicación Diaria (Standup)** | WhatsApp | Reunión presencial |
| **Reportes de Estado** | Correo Electrónico | WhatsApp |
| **Decisiones Críticas** | Reunión presencial | Correo Electrónico |
| **Incidentes / Problemas** | WhatsApp (urgente) | Correo Electrónico |
| **Documentación Técnica** | GitHub (docs/) | - |
| **Notificaciones a Usuarios** | Sistema SIGMA-T | Correo Electrónico |
| **Feedback de Usuarios** | WhatsApp / Reunión | Sistema SIGMA-T (encuestas) |
| **Comunicación con Agencias** | Correo Electrónico | WhatsApp |
| **Comunicación con Choferes** | App Móvil (notificaciones) | WhatsApp |

---

## 4. REPORTES Y FRECUENCIA

### 4.1 Reportes Obligatorios

| Reporte | Frecuencia | Formato | Audiencia | Responsable |
|---------|------------|---------|-----------|-------------|
| **Daily Standup** | Diaria (15 min) | Verbal / WhatsApp | Líder, Equipo Dev | Equipo |
| **Estado del Sprint** | Semanal (viernes) | Correo / Documento | Líder, Stakeholders | Líder / Asistente IA |
| **Dashboard de KPIs** | Quincenal | Sistema SIGMA-T | Líder | Sistema |
| **Resumen Financiero** | Mensual | Correo / Documento | Líder | Líder / Asistente IA |
| **Revisión de Riesgos** | Quincenal | Correo / Documento | Líder | Líder / Asistente IA |
| **Recomendaciones Estratégicas** | Mensual | Correo / Documento | Líder | Asistente IA |
| **Monitoreo de Aduana** | Diario | Sistema SIGMA-T | Líder, Jefe Operaciones | Sistema |
| **Reporte de Incidentes** | Según necesidad | WhatsApp / Correo | Líder, Equipo Dev | Equipo |
| **Actas de Reuniones** | Cada reunión | Correo / Documento | Asistentes | Secretario |

### 4.2 Plantillas de Reportes

#### 4.2.1 Plantilla de Estado del Sprint

```markdown
## 📊 INFORME DE ESTADO DEL SPRINT - SIGMA-T

**Sprint:** #X - [Nombre del Sprint]
**Período:** [dd/mm] al [dd/mm]
**Fecha de Reporte:** [dd/mm/yyyy]

### 📋 Resumen Ejecutivo
[1-2 frases resumiendo el estado del sprint]

### ✅ Trabajo Completado
- [Tarea 1] - ✅ Completado
- [Tarea 2] - ✅ Completado
- [Tarea 3] - ⏳ En Progreso (XX%)

### 🔄 Trabajo en Progreso
- [Tarea 4] - ⏳ 75% completado
- [Tarea 5] - ⏳ 50% completado

### 🚧 Bloqueos y Riesgos
- [Bloqueo 1] - [Estado] - [Mitigación]
- [Riesgo 2] - [Estado] - [Mitigación]

### 📌 Próximos Pasos
- [Acción 1]
- [Acción 2]

### ❓ Decisiones Pendientes
- [Decisión 1] - [Impacto] - [Plazo]
- [Decisión 2] - [Impacto] - [Plazo]
```

#### 4.2.2 Plantilla de Reporte de Incidentes

```markdown
## 🚨 REPORTE DE INCIDENTE - SIGMA-T

**ID:** INC-XXX
**Fecha:** [dd/mm/yyyy]
**Hora:** [hh:mm]
**Reportado por:** [Nombre]

### 📋 Resumen
[Descripción breve del incidente]

### 🔍 Impacto
- Módulo afectado: [Módulo]
- Usuarios afectados: [Cantidad / Perfil]
- Severidad: [Crítico / Alto / Medio / Bajo]

### 🔧 Acción Inmediata
[Qué se hizo para mitigar]

### 📌 Plan de Resolución
- [ ] [Acción 1] - [Responsable] - [Plazo]
- [ ] [Acción 2] - [Responsable] - [Plazo]

### 📝 Análisis de Causa Raíz
[Causa del incidente]

### 🛡️ Medidas Preventivas
[Acciones para evitar que vuelva a ocurrir]

### 🔔 Comunicación
- Informado a: [Stakeholders]
- Fecha de comunicación: [dd/mm/yyyy]
```

---

## 5. PROTOCOLO DE ESCALACIÓN

### 5.1 Niveles de Escalación

| Nivel | Descripción | Contacto | Tiempo de Respuesta |
|-------|-------------|----------|---------------------|
| **Nivel 1** | Problema operativo menor | Equipo de Desarrollo | <24 horas |
| **Nivel 2** | Problema que afecta funcionalidad importante | Líder del Proyecto | <4 horas |
| **Nivel 3** | Problema crítico que bloquea operación | Líder + Stakeholders | <1 hora |
| **Nivel 4** | Problema de seguridad o pérdida de datos | Líder + Sponsor | Inmediato |

### 5.2 Protocolo de Escalación por Tipo de Problema

| Tipo de Problema | Escalación | Contacto | Tiempo |
|------------------|------------|----------|--------|
| **Falla de Aerovaradero (cambio de sitio)** | Nivel 2 → Nivel 3 | Líder | <4 horas |
| **Falla de VPS ETECSA** | Nivel 3 → Nivel 4 | Líder + Sponsor | <1 hora |
| **Error en cálculo de ficha de costo** | Nivel 1 → Nivel 2 | Equipo → Líder | <24 horas |
| **Falla en automatización de aduana** | Nivel 2 → Nivel 3 | Líder | <4 horas |
| **Pérdida de datos** | Nivel 4 | Líder + Sponsor | Inmediato |
| **Incidente de seguridad** | Nivel 4 | Líder + Sponsor | Inmediato |
| **Error crítico en app móvil** | Nivel 2 | Líder | <4 horas |

### 5.3 Contactos de Escalación

| Rol | Nombre | Contacto | Responsabilidad |
|-----|--------|----------|-----------------|
| **Líder del Proyecto** | Osleyder Gonzalez | WhatsApp / Correo | Decisiones finales, comunicación con stakeholders |
| **Arquitecto de Software** | Equipo SIGMA-T | GitHub / WhatsApp | Decisiones técnicas, resolución de problemas complejos |
| **DevOps Engineer** | Equipo SIGMA-T | GitHub / WhatsApp | Problemas de infraestructura, despliegue |
| **Stakeholder Principal** | CAC Paquetería | Correo / WhatsApp | Decisiones sobre requisitos operativos |

---

## 6. GESTIÓN DE REUNIONES

### 6.1 Reuniones del Equipo

| Reunión | Frecuencia | Duración | Participantes | Propósito |
|---------|------------|----------|---------------|-----------|
| **Daily Standup** | Diaria | 15 min | Líder, Equipo Dev | Sincronizar avances y resolver bloqueos |
| **Sprint Planning** | Cada 2 semanas | 2 horas | Líder, Equipo Dev | Definir trabajo del sprint |
| **Sprint Review** | Cada 2 semanas | 1 hora | Líder, Equipo Dev, Stakeholders | Presentar trabajo completado |
| **Sprint Retrospective** | Cada 2 semanas | 1 hora | Líder, Equipo Dev | Mejorar el proceso de trabajo |
| **Reunión de Stakeholders** | Mensual | 1 hora | Líder, Stakeholders clave | Presentar progreso y validar decisiones |

### 6.2 Plantilla de Acta de Reunión

```markdown
## 📝 ACTA DE REUNIÓN - SIGMA-T

**Reunión:** [Nombre de la reunión]
**Fecha:** [dd/mm/yyyy]
**Hora:** [hh:mm - hh:mm]
**Lugar:** [Presencial / Virtual]

### Asistentes
- [Nombre 1] - [Rol]
- [Nombre 2] - [Rol]
- [Nombre 3] - [Rol]

### Agenda
1. [Tema 1]
2. [Tema 2]
3. [Tema 3]

### Acuerdos
| # | Acuerdo | Responsable | Plazo |
|---|---------|-------------|-------|
| 1 | [Acuerdo 1] | [Nombre] | [Fecha] |
| 2 | [Acuerdo 2] | [Nombre] | [Fecha] |

### Decisiones Tomadas
| # | Decisión | Justificación |
|---|----------|---------------|
| 1 | [Decisión 1] | [Justificación] |
| 2 | [Decisión 2] | [Justificación] |

### Próximos Pasos
- [Acción 1]
- [Acción 2]

### Próxima Reunión
**Fecha:** [dd/mm/yyyy]
**Hora:** [hh:mm]
**Agenda:** [Temas pendientes]
```

---

## 7. PLAN DE COMUNICACIÓN CON STAKEHOLDERS

### 7.1 Comunicación con Agencias de Envíos (CAC)

| Aspecto | Especificación |
|---------|----------------|
| **Frecuencia** | Mensual (reporte de estado) / Según necesidad (incidentes) |
| **Canales** | Correo Electrónico, WhatsApp, Reuniones presenciales |
| **Contenido** | Estado de envíos, costos de aduana, facturación, incidencias |
| **Responsable** | Líder del Proyecto / Jefe de Operaciones |
| **Formato** | Correo formal + Dashboard en sistema |

### 7.2 Comunicación con Choferes

| Aspecto | Especificación |
|---------|----------------|
| **Frecuencia** | Diaria (vía app) / Semanal (estado) |
| **Canales** | App Móvil (notificaciones), WhatsApp |
| **Contenido** | Rutas asignadas, entregas, incidencias, pagos, capacitación |
| **Responsable** | Jefe de Operaciones / Equipo de Desarrollo |
| **Formato** | Notificaciones push, mensajes de texto, tutoriales |

### 7.3 Comunicación con Clientes (Remitentes / Destinatarios)

| Aspecto | Especificación |
|---------|----------------|
| **Frecuencia** | En tiempo real (tracking) / Según necesidad |
| **Canales** | Portal del Cliente (sistema), Correo Electrónico |
| **Contenido** | Estado de paquetes, ubicación, fecha de entrega, costo de aduana |
| **Responsable** | Sistema (automático) |
| **Formato** | Portal web, notificaciones por correo |

### 7.4 Comunicación con ETECSA

| Aspecto | Especificación |
|---------|----------------|
| **Frecuencia** | Según necesidad (incidentes, soporte) |
| **Canales** | Correo Electrónico, Teléfono |
| **Contenido** | Problemas de infraestructura, soporte técnico, renovación de VPS |
| **Responsable** | DevOps Engineer / Líder del Proyecto |
| **Formato** | Correo formal + llamada |

### 7.5 Comunicación con Google Play Store y APKlis

| Aspecto | Especificación |
|---------|----------------|
| **Frecuencia** | Según necesidad (publicación, actualizaciones) |
| **Canales** | Google Play Console, Portal APKlis |
| **Contenido** | Publicación de la app, actualizaciones, cumplimiento de políticas |
| **Responsable** | Desarrollador Mobile |
| **Formato** | Fichas de la app, APK/AAB |

---

## 8. GESTIÓN DE INCIDENTES DE COMUNICACIÓN

### 8.1 Incidentes Comunes y Protocolo

| Incidente | Protocolo | Responsable |
|-----------|-----------|-------------|
| **Falla en el sistema** | Notificar inmediatamente a Líder + Equipo Dev | Equipo Dev |
| **Cambio en Aerovaradero** | Notificar a Líder + Agencias, activar contingencia | Líder / Equipo Dev |
| **Error en cálculo de pago** | Notificar a Líder, corregir, informar a chofer | Equipo Dev / Líder |
| **Queja de usuario** | Registrar, investigar, responder en <24 horas | Líder / Jefe Operaciones |
| **Falla en app móvil** | Notificar a Líder, investigar, parche urgente | Equipo Dev |

### 8.2 Plan de Continuidad de Comunicación

| Escenario | Plan de Contingencia |
|-----------|---------------------|
| **WhatsApp caído** | Usar Correo Electrónico + Llamadas |
| **Correo caído** | Usar WhatsApp + Sistema SIGMA-T |
| **Sistema SIGMA-T caído** | Usar WhatsApp + Correo para comunicación manual |
| **Reunión presencial imposible** | Usar reunión virtual (Google Meet, Zoom) |

---

## 9. INDICADORES DE EFECTIVIDAD DE COMUNICACIÓN

| Indicador | Objetivo | Medición | Frecuencia |
|-----------|----------|----------|------------|
| **Tiempo de respuesta a incidentes** | <1 hora (crítico) | Sistema de tickets | Mensual |
| **Asistencia a reuniones** | ≥90% | Registro de asistencia | Por reunión |
| **Stakeholders informados** | 100% | Lista de distribución | Por comunicación |
| **Satisfacción de comunicación** | ≥4.5/5 | Encuesta trimestral | Trimestral |
| **Reportes entregados a tiempo** | 100% | Registro de entregas | Mensual |

---

## 10. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| **Líder del Proyecto** | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| **Equipo de Desarrollo** | Equipo SIGMA-T | _________ | ___/___/2026 |

---

## 📌 CONCLUSIÓN

Este Plan de Comunicación establece las bases para una comunicación efectiva y transparente durante todo el ciclo de vida del proyecto SIGMA-T. Asegura que todos los stakeholders estén informados, alineados y puedan tomar decisiones oportunas.

---
