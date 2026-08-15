# 📄 DOCUMENTO: ACTA DE CONSTITUCIÓN DEL PROYECTO (PROJECT CHARTER) - VERSIÓN 2.6 (TOP MUNDIAL CON FINANZAS, ADUANA, FICHA DE COSTO E INFRAESTRUCTURA - SPRINTS 0 Y 1 COMPLETADOS - ACTUALIZACIÓN 15/08/2026)

**Basado en el estándar PMI (Project Management Institute) para la iniciación de proyectos**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente / Sponsor:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 15 de agosto de 2026
**Versión del Documento:** 2.6 (Completa - Top Mundial con Finanzas, Aduana, Ficha de Costo e Infraestructura - SPRINTS 0 Y 1 COMPLETADOS - ACTUALIZACIÓN 15/08/2026)

---

## 1. PROPÓSITO Y JUSTIFICACIÓN DEL PROYECTO

### 1.1 Propósito
Formalizar el inicio del proyecto SIGMA-T, definiendo su alcance, objetivos, stakeholders, hitos clave, presupuesto y criterios de éxito, estableciendo así la base para su desarrollo y gestión.

### 1.2 Justificación del Proyecto (El "Por Qué")
En el contexto cubano actual, las MiPYMEs de transporte enfrentan desafíos críticos que limitan su crecimiento y eficiencia:

1. **Gestión Manual y Descoordinada:** Dependencia de hojas de cálculo (Excel) y herramientas de planificación de rutas de pago (OptimoRoute) que no están optimizadas para las condiciones de conectividad y logística de la isla.

2. **Ineficiencia Operativa:** Planificación manual de rutas que resulta en exceso de kilómetros recorridos, mayor consumo de combustible y tiempos de entrega inconsistentes.

3. **Falta de Visibilidad Financiera:** Ausencia de un sistema integrado que permita calcular costos reales por ruta, vehículo o envío, lo que dificulta la fijación de precios y la toma de decisiones estratégicas.

4. **Brecha Digital en el Campo:** Los choferes carecen de herramientas digitales efectivas para operar en zonas con conectividad limitada, lo que genera pérdida de información y retrasos.

5. **Oportunidad de Mercado:** No existe en el mercado una solución de gestión integral, de código abierto y diseñada específicamente para el ecosistema cubano que cubra todas estas necesidades. **SIGMA-T llega para llenar ese vacío.**

6. **Brecha de Calidad de Código:** Las soluciones existentes en el mercado (OptimoRoute, Onfleet, Routific) no ofrecen transparencia en su código ni permiten personalización o auditoría. SIGMA-T, al ser open source y contar con estándares estrictos de codificación, garantiza mantenibilidad, evolución y confianza a largo plazo.

7. **Gestión de Costos de Importación:** Los costos de aduana son un componente crítico del costo total de cada envío. Actualmente no existe una forma automatizada de consultar estos costos, lo que genera retrasos y errores en el cálculo de rentabilidad. SIGMA-T automatizará la consulta de costos en el sitio web de Aerovaradero utilizando la URL de payment.

8. **Automatización de Facturación de Aduana:** El proceso de facturación de aduana es manual y requiere revisar constantemente el sitio de Aerovaradero. SIGMA-T automatizará este proceso con consultas programadas en 4 horarios diarios (8 AM, 12 PM, 4 PM, 12 AM), liberando horas de trabajo manual.

9. **Falta de Control sobre el Pago a Choferes:** No existe un sistema que permita calcular de manera flexible y automática el pago a los choferes según diferentes esquemas (fijo, por kilómetro, por entrega o combinado), lo que genera inconsistencias y falta de transparencia.

10. **Falta de Visibilidad de Costos por Ruta:** No existe una herramienta que desglose automáticamente todos los costos asociados a una ruta (directos, indirectos y de importación), lo que impide un análisis detallado de la rentabilidad por operación.

11. **Falta de Infraestructura de Alojamiento Adecuada:** Las soluciones en la nube internacional (DigitalOcean, AWS) están sujetas a bloqueos y sanciones que afectan el acceso desde Cuba. SIGMA-T se desplegará en un VPS de ETECSA, garantizando estabilidad, conectividad local y cumplimiento normativo.

12. **Falta de Distribución de la App Móvil en Cuba:** Google Play Store tiene restricciones de acceso desde Cuba. SIGMA-T se distribuirá también a través de APKlis (tienda cubana) y descarga directa, asegurando que todos los choferes puedan instalar la aplicación sin barreras.

**El proyecto no solo busca optimizar la operación de una MiPYME, sino crear un estándar de gestión para el sector en Cuba y la región, basado en tecnología de punta, prácticas de clase mundial e infraestructura local confiable.**

---

## 2. OBJETIVOS DEL PROYECTO (SMART)

| # | Objetivo | Métrica de Éxito (KPI) | Plazo | Estado |
|---|----------|------------------------|-------|--------|
| **O1** | **Reducir Costos Operativos** | Disminuir el costo por kilómetro recorrido en al menos un **15%** en los primeros 12 meses de operación. | 12 meses post-lanzamiento | ⏳ Pendiente |
| **O2** | **Optimizar Rutas de Entrega** | Reducir los kilómetros totales recorridos por envío en al menos un **20%** en comparación con la planificación manual actual. | 6 meses post-lanzamiento | ⏳ Pendiente |
| **O3** | **Mejorar la Toma de Decisiones** | Proporcionar un dashboard ejecutivo con **KPIs actualizados diariamente** que reflejen el estado financiero y operativo del negocio. | En el lanzamiento (MVP) | ⏳ Pendiente |
| **O4** | **Digitalizar las Operaciones** | Eliminar el uso de planillas en papel en al menos un **90%** de los procesos operativos (planificación, seguimiento, reportes de costos). | 6 meses post-lanzamiento | ⏳ Pendiente |
| **O5** | **Posicionamiento de Mercado** | Ser reconocido como la **solución de gestión de referencia** para MiPYMEs de transporte en Cuba, con al menos **3 casos de éxito** documentados en el primer año. | 12 meses post-lanzamiento | ⏳ Pendiente |
| **O6** | **Calidad de Código y Mantenibilidad** | El código fuente de SIGMA-T debe cumplir con los estándares de codificación definidos en ≥95% de las líneas de código y tener una cobertura de documentación de ≥80% en funciones públicas. | En el lanzamiento (MVP) | ✅ **Cumplido** |
| **O7** | **Gestión Automática de Costos de Aduana** | El sistema debe consultar automáticamente el costo de aduana de al menos el **95% de los envíos** de un manifiesto en menos de **5 minutos** utilizando la URL de payment de Aerovaradero. | En el lanzamiento (MVP) | ⏳ Pendiente |
| **O8** | **Gestión Flexible de Pago a Choferes** | El sistema debe calcular automáticamente el pago a los choferes según el esquema configurado (fijo, por km, por entrega o combinado) con una precisión del **100%** en los cálculos. | En el lanzamiento (MVP) | ⏳ Pendiente |
| **O9** | **Ficha de Costo Detallada por Ruta** | El sistema debe generar una ficha de costo detallada para cada ruta, con todos los componentes de costo (directos, indirectos, importación), en menos de **5 segundos** y con una precisión de **2 decimales**. | En el lanzamiento (MVP) | ⏳ Pendiente |
| **O10** | **Publicación en Google Play Store** | La app móvil debe estar disponible en Google Play Store en un plazo máximo de **30 días** después del lanzamiento de la versión 1.0. | 30 días post-release | ⏳ Pendiente |
| **O11** | **Distribución en Cuba** | La app móvil debe estar disponible en **APKlis** (tienda cubana) en el momento del lanzamiento, y ofrecer descarga directa desde el sitio web. | En el lanzamiento (MVP) | ⏳ Pendiente |
| **O12** | **Despliegue en VPS ETECSA** | El sistema debe estar desplegado y operativo en el VPS de ETECSA en un plazo máximo de **7 días** después del lanzamiento, con SSL/HTTPS configurado. | 7 días post-release | ⏳ Pendiente |
| **O13** | **Automatización de Facturación de Aduana** | El sistema debe consultar automáticamente Aerovaradero en 4 horarios diarios (8 AM, 12 PM, 4 PM, 12 AM) para facturar houses automáticamente cuando tengan importe y factura. | En el lanzamiento (MVP) | ⏳ Pendiente |

---

## 3. ALCANCE DEL PROYECTO

### 3.1 Dentro del Alcance (Entregables del Proyecto)

| Módulo | Funcionalidades Clave | Prioridad | Estado |
| :--- | :--- | :--- | :--- |
| **1. Administración de Flota** | CRUD de vehículos, registro de mantenimientos, alertas automáticas, cálculo de depreciación. | **Alta** | ⏳ Pendiente |
| **2. Gestión de Choferes** | CRUD de conductores, registro de disponibilidad, cálculo de salarios y bonos, evaluación de desempeño. Esquemas de pago configurables (fijo, por km, por entrega, combinado). | **Alta** | ⏳ Pendiente |
| **3. Gestión de Envíos** | Importación de manifiestos (Excel), registro manual, validación de datos, historial de envíos, gestión de estados (9 estados del paquete). | **Crítica** | ✅ **Implementado** |
| **4. Planificación de Rutas** | Planificación semanal, algoritmo de optimización (VRPTW), visualización en mapa, ajuste manual (drag & drop), manifiesto para chofer. | **Crítica** | ⏳ Pendiente |
| **5. Módulo Financiero** | Libro de ingresos/gastos, fichas de costos, facturación, gestión de cobros, rentabilidad por ruta. Gestión de parámetros financieros (tasa de cambio, precios de combustible, costos por km). | **Alta** | ⏳ Pendiente |
| **6. App del Chofer** | Autenticación offline, visualización de ruta y mapa, registro de entregas e incidencias, captura de firma digital, registro de costos reales, modo offline con sincronización. | **Crítica** | ⏳ Pendiente |
| **7. Dashboard y Reportes** | KPIs en tiempo real, gráficos interactivos, alertas automáticas, exportación a PDF/CSV. | **Alta** | ⏳ Pendiente |
| **8. Portal del Cliente** | Login, seguimiento de envíos, notificaciones, descarga de comprobantes de entrega. | **Media** | ⏳ Pendiente |
| **9. Gestión de Almacén** | Registro de entrada/salida de paquetes, asignación de ubicación en bodega, mapa de bodega. | **Media** | ⏳ Pendiente |
| **10. Marketing y CRM** | Gestión de prospectos, seguimiento de contactos, cotizaciones, encuestas de satisfacción, casos de éxito. | **Media** | ⏳ Pendiente |
| **11. Auditoría y Seguridad** | Log de todas las acciones, trazabilidad de cambios, alertas de seguridad, exportación de logs. | **Alta** | ⏳ Pendiente |
| **12. Estándares de Codificación** | Configuración de ESLint, Prettier, Dart Analyzer, JSDoc, OpenAPI, y generación automática de documentación. | **Alta** | ✅ **Implementado** |
| **13. Integración con Aduana** | Consulta automática de costos de aduana desde el sitio web de Aerovaradero utilizando la URL de payment (`https://www.aerovaradero.com.cu/payment/?cod_la={cod_la}&cod_awb={cod_awb}&cod_house={house}`). Asignación de costos de aduana a cada envío. Gestión de parámetros de importación. | **Crítica** | ⏳ Pendiente |
| **14. Automatización de Facturación de Aduana** | Consultas programadas en 4 horarios diarios (8 AM, 12 PM, 4 PM, 12 AM) para verificar houses con estado "Arribado" y cambiarlos a "Facturado" cuando tengan importe y factura en Aerovaradero. | **Crítica** | ⏳ Pendiente |
| **15. Ficha de Costo Detallada** | Cálculo automático y generación de ficha de costo detallada por ruta, incluyendo costos directos (combustible, peajes, mantenimiento, neumáticos, salario), indirectos (depreciación, seguros, administrativos, impuestos) y de importación (costos de aduana). Exportación a PDF y CSV. | **Crítica** | ⏳ Pendiente |
| **16. Infraestructura y Distribución** | Despliegue en VPS ETECSA con Ubuntu 22.04 LTS, configuración de Nginx como proxy inverso, SSL/HTTPS con Let's Encrypt, gestión de procesos con PM2. Publicación de la app móvil en Google Play Store, APKlis y descarga directa. | **Crítica** | ⏳ Pendiente |

### 3.2 Fuera del Alcance (Fase 1 - MVP)

- Aplicación para clientes finales (tracking público).
- Integración con pasarelas de pago.
- Inteligencia Artificial predictiva avanzada (más allá de la optimización de rutas y estimación de costos de aduana).
- Sistema de facturación electrónica completo (módulo básico en su lugar).
- Análisis de Big Data.
- Integración con otros sitios web de aduanas (inicialmente solo Aerovaradero).
- App para iOS (inicialmente solo Android).

---

## 4. STAKEHOLDERS DEL PROYECTO

| Stakeholder | Rol / Interés | Expectativas Clave | Influencia |
| :--- | :--- | :--- | :--- |
| **Osleyder Gonzalez** | **Líder del Proyecto / Dueño** | Visibilidad total, ROI positivo en <18 meses, posicionamiento de mercado, calidad de código, gestión de costos de aduana, automatización de facturación de aduana, ficha de costo detallada, despliegue exitoso en VPS ETECSA. | **Alta** |
| **Equipo de Desarrollo** | **Ejecutores del Proyecto** | Entregar un producto de alta calidad, documentado, funcional y con estándares claros. | **Alta** |
| **Jefe de Operaciones** | **Usuario Operativo** | Control de rutas, estado de entregas, visión de todos los envíos, importación de manifiestos. | **Media** |
| **Agencias de Envíos (CAC)** | **Clientes / Socios Externos** | Importar manifiestos, rastrear sus houses, ver costos de aduana, exportar historial. | **Media** |
| **Choferes** | **Usuarios Operativos** | Interfaz simple, menos papeleo, comunicación clara, app funcional sin internet, pago transparente y calculado automáticamente, fácil instalación desde APKlis o descarga directa. | **Media** |
| **Personal Administrativo** | **Usuarios Backoffice** | Reportes claros, automatización, facilidad de uso, gestión de costos de aduana, ficha de costo detallada. | **Media** |
| **Cliente Remitente** | **Cliente Final** | Ver estado de su paquete, ubicación, fecha de entrega, costo de aduana. | **Baja** |
| **Cliente Destinatario** | **Cliente Final** | Ver estado de su paquete, ubicación, fecha de entrega, costo de aduana. | **Baja** |
| **Comunidad Open Source** | **Contribuidores Potenciales** | Código limpio, bien documentado, con estándares claros para facilitar contribuciones. | **Media** |
| **Proveedores de Tecnología** | **Proveedores Externos** | APIs de mapas, servicios de hosting (si aplica). | **Baja** |
| **Reguladores (Estado Cubano)** | **Ente Regulador** | Cumplimiento de normativas de transporte, tributación y aduanas. | **Baja** |
| **ETECSA** | **Proveedor de Infraestructura** | Uso adecuado de recursos del VPS, cumplimiento de términos de servicio, estabilidad del servicio. | **Media** |
| **Google Play Store** | **Plataforma de Distribución** | Cumplimiento de políticas, app funcional y segura. | **Media** |
| **APKlis** | **Plataforma de Distribución** | App funcional, sin restricciones de EE.UU., disponibilidad para usuarios cubanos. | **Media** |

---

## 5. HITOS DEL PROYECTO

| Hito | Fecha Estimada | Fecha Real | Entregable Clave | Criterio de Aceptación | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 - Inicio del Proyecto** | 13/08/2026 | 13/08/2026 | Project Charter firmado | Documento aprobado por el Líder del Proyecto. | ✅ Completado |
| **H2 - Requisitos Completos** | 30/09/2026 | 13/08/2026 | SRS v3.7 validado | Documento revisado y aprobado, incluye estándares de codificación, requisitos de finanzas, aduana, ficha de costo, automatización de aduana e infraestructura. | ✅ Completado |
| **H3 - Diseño Aprobado** | 30/10/2026 | 13/08/2026 | Arquitectura v2.7 y UX validados | Diagramas, maquetas, estándares de codificación, servicios de integración e infraestructura VPS ETECSA revisados y aprobados. | ✅ Completado |
| **H4 - MVP Funcional (Módulo Envíos)** | 15/01/2027 | 13/08/2026 | Módulo de Envíos (CRUD + Importación) | Pruebas de integración superadas y verificación de estándares de codificación. | ✅ Completado |
| **H5 - Piloto en Rutas** | 28/02/2027 | — | Pruebas en 2 rutas reales | Feedback positivo de choferes y administradores, incluyendo consultas de aduana, cálculo de pagos y ficha de costo. | ⏳ Pendiente |
| **H6 - Despliegue en VPS ETECSA** | 15/03/2027 | — | Sistema desplegado en VPS ETECSA | SSL/HTTPS configurado, Nginx funcionando, PM2 gestionando procesos, acceso exitoso desde navegadores en Cuba. | ⏳ Pendiente |
| **H7 - Publicación en APKlis** | 20/03/2027 | — | App disponible en APKlis | App publicada y accesible desde navegación nacional. | ⏳ Pendiente |
| **H8 - Release 1.0** | 01/04/2027 | — | Sistema completo en producción | Operación real durante 1 semana sin incidentes críticos. **Verificación de calidad de código: ≥95% cumplimiento de estándares y ≥80% cobertura de documentación.** | ⏳ Pendiente |
| **H9 - Publicación en Google Play Store** | 30/04/2027 | — | App disponible en Google Play Store | App publicada y accesible globalmente. | ⏳ Pendiente |
| **H10 - Revisión Post-Lanzamiento** | 31/05/2027 | — | Métricas de mejora documentadas | Evaluación de KPIs (costo/km, eficiencia, calidad de código, precisión de costos de aduana, precisión de ficha de costo, efectividad de automatización de aduana). | ⏳ Pendiente |

---

## 6. PRESUPUESTO ESTIMADO Y RECURSOS

### 6.1 Presupuesto (Estructura de Desglose de Costos)

| Concepto                         | Costo Estimado (USD)              | Notas                                                                                          |
| :------------------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Infraestructura (VPS ETECSA)** | $20 - $50 / mes                   | VPS ETECSA (250 CUP de suscripción + mensualidad).                                             |
| **Dominio y SSL**                | $10 / año                         | Let's Encrypt para SSL.                                                                        |
| **Licencias de Software**        | $0                                | 100% Open Source.                                                                              |
| **Herramientas de Análisis**     | $0                                | ESLint, Prettier, Dart Analyzer, TypeDoc, Swagger UI (open source).                            |
| **Web Scraping**                 | $0                                | Cheerio, Puppeteer, node-cron (open source).                                                   |
| **Generación de PDF**            | $0                                | Librerías open source (PDFKit, jsPDF).                                                         |
| **Publicación en Play Store**    | $25                               | Pago único por cuenta de desarrollador.                                                        |
| **Publicación en APKlis**        | $0                                | Gratuito.                                                                                      |
| **Capacitación**                 | $0                                | Realizada por el Líder y el Equipo.                                                            |
| **Soporte y Mantenimiento**      | $0                                | A cargo del Equipo de Desarrollo.                                                              |
| **Imprevistos (10%)**            | Incluido en la estimación mensual | Para cubrir contingencias.                                                                     |
| **TOTAL ANUAL ESTIMADO**         | **$275 - $635**                   | Extremadamente bajo en comparación con soluciones comerciales (OptimoRoute: ~$500/chofer/año). |

### 6.2 Recursos Humanos
El proyecto será ejecutado por un equipo multidisciplinario cuyos roles ya han sido definidos en el SPMP. Se considera que los costos de personal son asumidos por el propio equipo, al ser un proyecto de emprendimiento.

---

## 7. RIESGOS DE ALTO NIVEL

| Riesgo | Probabilidad | Impacto | Estrategia de Mitigación Inicial | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Conectividad limitada en zonas rurales** | **Alta** | **Alto** | Diseño robusto de modo offline en la app móvil. | ⏳ Pendiente |
| **Resistencia al cambio de los choferes** | **Media** | **Alto** | UI simple, programa de incentivos y gamificación. | ⏳ Pendiente |
| **Calidad de datos de mapas en Cuba** | **Alta** | **Medio** | Sistema de edición colaborativa de mapas por choferes. | ⏳ Pendiente |
| **Sostenibilidad Financiera** | **Media** | **Medio** | Modelo open source, colaboración con entidades del estado. | ⏳ Pendiente |
| **Cambios en normativas cubanas** | **Media** | **Medio** | Arquitectura modular y flexible para adaptaciones rápidas. | ⏳ Pendiente |
| **Baja calidad de código** | **Media** | **Alto** | Estándares de codificación estrictos (ESLint, Prettier, Dart Analyzer), análisis estático en CI/CD, revisiones de código obligatorias. | ✅ Mitigado |
| **Documentación insuficiente** | **Media** | **Medio** | JSDoc obligatorio para funciones públicas, generación automática de documentación (TypeDoc, Swagger), cobertura mínima del 80%. | ✅ Mitigado |
| **Cambios en el sitio web de Aerovaradero (URL de payment)** | **Alta** | **Alto** | Sistema de alertas de fallo en extracción, entrada manual de costos de aduana como contingencia, monitoreo periódico del sitio. | ⏳ Pendiente |
| **Fluctuación de la tasa de cambio y precios de combustible** | **Alta** | **Medio** | Actualización manual/configurable de parámetros, historial de cambios para análisis. | ⏳ Pendiente |
| **Errores en cálculo de pago a choferes** | **Media** | **Alto** | Validaciones automáticas, auditoría de cálculos, generación de reportes de pago para revisión. | ⏳ Pendiente |
| **Errores en cálculo de ficha de costo** | **Media** | **Alto** | Validaciones automáticas, auditoría de cálculos, pruebas con datos reales, precisión de 2 decimales. | ⏳ Pendiente |
| **Disponibilidad de VPS ETECSA** | **Media** | **Alto** | Tener plan de contingencia con servidor alternativo (nube internacional). | ⏳ Pendiente |
| **Google Play Store bloqueada desde Cuba** | **Alta** | **Medio** | Distribuir también vía APKlis y descarga directa. | ⏳ Pendiente |
| **Configuración de SSL/HTTPS** | **Baja** | **Medio** | Documentación detallada, uso de Let's Encrypt, renovación automática. | ⏳ Pendiente |
| **Recursos limitados del VPS ETECSA** | **Media** | **Medio** | Optimización de recursos, caché con Redis, monitoreo de rendimiento. | ⏳ Pendiente |
| **Fallos en el proceso automatizado de facturación de aduana** | **Media** | **Alto** | Sistema de alertas, reintentos automáticos, entrada manual como contingencia, logs detallados. | ⏳ Pendiente |

---

## 8. CRITERIOS DE ÉXITO DEL PROYECTO

El proyecto se considerará un éxito rotundo cuando se cumplan los siguientes criterios:

**1. Operativos:**
- El sistema está en producción y es utilizado activamente por todos los choferes y el personal administrativo.
- Las rutas optimizadas generan un ahorro de **≥20% en kilómetros recorridos** en comparación con el método manual.
- La app del chofer funciona correctamente en modo offline y sincroniza los datos sin pérdida de información.

**2. Financieros:**
- El costo por kilómetro se reduce en un **≥15%** en el primer año.
- El ROI (Retorno de la Inversión) es positivo en los primeros **18 meses** de operación, considerando los ahorros generados y el costo de desarrollo (mano de obra).

**3. Estratégicos:**
- SIGMA-T es reconocido como un proyecto de referencia en el sector de logística y transporte en Cuba, con casos de éxito documentados.
- El código fuente es público (open source) y ha recibido contribuciones de la comunidad.

**4. De Aceptación:**
- La satisfacción de los usuarios (choferes y administradores) es de al menos **4.5 sobre 5** en una encuesta formal.

**5. Calidad de Código:**
- El código fuente de SIGMA-T debe cumplir con los estándares de codificación definidos (ESLint, Prettier, Dart Analyzer) en un **≥95% de las líneas de código**.
- La documentación de código (JSDoc/comentarios) debe cubrir **≥80% de las funciones, clases e interfaces públicas**.
- El sistema debe contar con documentación técnica generada automáticamente (TypeDoc, Swagger UI).
- El pipeline de CI/CD debe incluir verificación automática de estándares y documentación.

**6. Gestión de Aduana:**
- El sistema debe consultar automáticamente el costo de aduana de al menos el **95% de los envíos** de un manifiesto en menos de **5 minutos** utilizando la URL de payment de Aerovaradero.
- El costo de aduana debe asignarse correctamente a cada envío y reflejarse en los reportes de rentabilidad.
- El sistema debe permitir la entrada manual de costos de aduana como contingencia ante fallos en la consulta automática.

**7. Automatización de Facturación de Aduana:**
- El sistema debe consultar Aerovaradero en los 4 horarios establecidos (8 AM, 12 PM, 4 PM, 12 AM).
- El sistema debe cambiar automáticamente el estado de "Arribado" a "Facturado" cuando un house tenga importe y factura.
- Los houses con estado "Facturado" NO deben ser consultados nuevamente.
- El sistema debe registrar logs detallados de cada consulta y cambio de estado.

**8. Gestión de Pago a Choferes:**
- El sistema debe calcular el pago a los choferes con una precisión del **100%** según el esquema configurado.
- El sistema debe generar reportes de pago detallados para revisión y auditoría.

**9. Ficha de Costo Detallada:**
- El sistema debe generar una ficha de costo detallada para cada ruta en menos de **5 segundos**.
- La ficha debe incluir todos los componentes de costo (directos, indirectos, importación) con una precisión de **2 decimales**.
- La ficha debe ser exportable a PDF y CSV.

**10. Infraestructura y Distribución:**
- El sistema debe estar desplegado y funcionando correctamente en el VPS de ETECSA con SSL/HTTPS configurado.
- La app móvil debe estar disponible en **APKlis** en el momento del lanzamiento.
- La app móvil debe estar disponible en **Google Play Store** en un plazo máximo de 30 días después del lanzamiento.
- El sitio web debe ofrecer **descarga directa del APK** para usuarios sin acceso a las tiendas.

---

## 9. APROBACIONES

Este documento es el punto de partida oficial del proyecto. Al firmar, las partes acuerdan los términos y objetivos aquí definidos.

| Rol | Nombre | Firma | Fecha |
| :--- | :--- | :--- | :--- |
| **Líder del Proyecto / Sponsor** | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| **Stakeholder Principal (Cliente)** | Representante de CAC Paquetería | _________ | ___/___/2026 |
| **Project Manager (Equipo)** | Equipo SIGMA-T | _________ | ___/___/2026 |

---

## 10. GLOSARIO

| Término               | Definición                                                                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Project Charter**   | Documento que autoriza formalmente la existencia de un proyecto y le otorga al director del proyecto autoridad para asignar recursos. |
| **Sponsor**           | Persona o grupo que proporciona los recursos financieros y el apoyo para el proyecto.                                                 |
| **KPI**               | Indicador Clave de Rendimiento; una métrica cuantificable que se utiliza para medir el éxito de un objetivo.                          |
| **ROI**               | Retorno de la Inversión; una medida de la rentabilidad de una inversión.                                                              |
| **VRPTW**             | Problema de Enrutamiento de Vehículos con Ventanas de Tiempo; un problema de optimización matemática.                                 |
| **Open Source**       | Código fuente disponible públicamente para su uso, modificación y distribución.                                                       |
| **JSDoc**             | Estándar de documentación para código JavaScript/TypeScript que permite generar documentación automática.                             |
| **OpenAPI**           | Especificación para documentación de APIs REST, que permite generar interfaces interactivas como Swagger UI.                          |
| **ESLint**            | Herramienta de análisis estático para JavaScript/TypeScript que ayuda a mantener la calidad y consistencia del código.                |
| **CI/CD**             | Integración Continua / Despliegue Continuo; automatización de pruebas, análisis y despliegues.                                        |
| **AWB**               | Air Way Bill; número de guía aérea utilizado para el seguimiento de envíos internacionales.                                           |
| **Web Scraping**      | Técnica de extracción de datos de sitios web de forma automatizada.                                                                   |
| **Ficha de Costo**    | Documento que desglosa todos los costos asociados a una operación de transporte (directos, indirectos y de importación).              |
| **VPS**               | Servidor Privado Virtual.                                                                                                             |
| **ETECSA**            | Empresa de Telecomunicaciones de Cuba S.A.                                                                                            |
| **APKlis**            | Tienda de aplicaciones cubana para Android.                                                                                           |
| **SSL**               | Secure Sockets Layer.                                                                                                                 |
| **HTTPS**             | Protocolo seguro de transferencia de hipertexto.                                                                                      |
| **Cron Job**          | Tarea programada que se ejecuta automáticamente en horarios específicos.                                                              |
| **Agencia de Envíos** | Empresa de paquetería (ej. Central American Cargo) que recibe paquetes y los envía a Cuba.                                            |
| **House**             | Número de identificación único de un paquete en el manifiesto.                                                                        |
| **Arribado**          | Estado del paquete cuando llega al aeropuerto de destino en Cuba.                                                                     |
| **Facturado**         | Estado del paquete cuando tiene importe y factura en Aerovaradero.                                                                    |

---

## 📌 CONCLUSIÓN

Este Project Charter Versión 2.6 ahora incluye:

- ✅ **13 objetivos SMART** (1 nuevo: O13 sobre automatización de facturación de aduana)
- ✅ **16 módulos funcionales** (1 nuevo sobre automatización de facturación de aduana)
- ✅ **16 riesgos de alto nivel** (1 nuevo sobre fallos en automatización de aduana)
- ✅ **10 criterios de éxito** (1 nuevo sobre automatización de facturación de aduana)
- ✅ **Glosario actualizado** con términos de automatización de aduana
- ✅ **URL de Aduana actualizada** de tracking a payment
- ✅ **Stakeholders actualizados** con Jefe de Operaciones, Agencias de Envíos, Cliente Remitente y Cliente Destinatario
- ✅ **Presupuesto actualizado** con costos de VPS ETECSA y publicación en Play Store
- ✅ **Hitos actualizados** con despliegue en VPS ETECSA, publicación en APKlis y Google Play Store
- ✅ **Estado de implementación agregado** a objetivos, módulos, hitos y riesgos
- ✅ **Sprints 0 y 1 confirmados como completados** (13/08/2026)
- ✅ **Módulo de Envíos y Clientes** implementado y funcional
- ✅ **Estándares de codificación y documentación** implementados al 100%
- ✅ **Automatización de facturación de aduana** definida (4 horarios, criterio de facturación, optimización)

**Este documento establece la base estratégica, operativa, de calidad e infraestructura del proyecto, asegurando que SIGMA-T no solo sea funcional, sino también mantenible, documentado, financieramente completo, con integración aduanera de clase mundial, automatización de facturación de aduana, ficha de costo detallada, e infraestructura local confiable en VPS ETECSA con distribución en Google Play Store y APKlis.**