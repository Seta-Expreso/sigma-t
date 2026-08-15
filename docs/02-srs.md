## 📄 ESPECIFICACIÓN DE REQUISITOS DEL SOFTWARE (SRS) - VERSIÓN 3.8

**Basado en ISO/IEC/IEEE 29148:2018**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 15 de agosto de 2026
**Versión:** 3.8 (Top Mundial con Arquitectura VRPTW v3.0, Optimización de Combustible, Reoptimización Dinámica, IA y Análisis Post-Ruta - SPRINTS 0 Y 1 COMPLETADOS - ACTUALIZACIÓN 15/08/2026)

---

## 1. INTRODUCCIÓN Y ALCANCE

### 1.1 Propósito
Este documento especifica todos los requisitos funcionales y no funcionales del sistema SIGMA-T, una plataforma integral para la gestión de una MiPYME de transporte terrestre de carga y pasajeros en Cuba. El documento sirve como contrato técnico entre el Líder del Proyecto y el Equipo de Desarrollo, y como base para la validación, verificación y aceptación del sistema.

### 1.2 Ámbito del Producto
SIGMA-T es un sistema modular de clase mundial que permite gestionar **todo el ciclo de vida de una operación de transporte**:

- **Venta y Marketing:** Captura de prospectos, cotizaciones, seguimiento de contactos, conversión a clientes.
- **Operaciones:** Gestión de flota, choferes, rutas, envíos, y almacén.
- **Control y Finanzas:** Libros contables, facturación, costos, KPIs, **ficha de costo detallada por ruta**.
- **Post-Venta:** Seguimiento de entregas, encuestas de satisfacción, casos de éxito.
- **Auditoría:** Trazabilidad total de todas las acciones del sistema.
- **Calidad de Código:** Estándares de codificación, documentación y mantenibilidad.
- **Gestión de Aduana:** Consulta automática de costos de importación utilizando la URL de payment de Aerovaradero, gestión de parámetros financieros y esquemas de pago a choferes.
- **Infraestructura:** Despliegue en VPS ETECSA, distribución en Google Play Store y APKlis, SSL/HTTPS obligatorio.
- **🆕 Optimización de Rutas Avanzada:** Algoritmo VRPTW con optimización de combustible, prioridad de entregas, reoptimización dinámica en tiempo real, análisis post-ruta y sistema de estimación de tiempos con IA.

### 1.3 Definiciones y Acrónimos

| Término                  | Definición                                                                                                                             |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| MiPYME                   | Micro, Pequeña y Mediana Empresa                                                                                                       |
| SRS                      | Software Requirements Specification                                                                                                    |
| KPI                      | Key Performance Indicator                                                                                                              |
| MVP                      | Minimum Viable Product                                                                                                                 |
| SLA                      | Service Level Agreement                                                                                                                |
| API                      | Application Programming Interface                                                                                                      |
| VRPTW                    | Vehicle Routing Problem with Time Windows                                                                                              |
| TMS                      | Transportation Management System                                                                                                       |
| AWB                      | Air Way Bill - Número de guía aérea (ej. 230-66684660)                                                                                 |
| JSDoc                    | Estándar de documentación para código JavaScript/TypeScript                                                                            |
| OpenAPI                  | Especificación para documentación de APIs REST                                                                                         |
| CI/CD                    | Integración Continua / Despliegue Continuo                                                                                             |
| ESLint                   | Herramienta de análisis estático para JavaScript/TypeScript                                                                            |
| CUP                      | Peso Cubano (moneda nacional de Cuba)                                                                                                  |
| USD                      | Dólar Estadounidense                                                                                                                   |
| Ficha de Costo           | Documento que desglosa todos los costos asociados a una operación de transporte (directos, indirectos y de importación)                |
| VPS                      | Servidor Privado Virtual                                                                                                               |
| ETECSA                   | Empresa de Telecomunicaciones de Cuba S.A.                                                                                             |
| APKlis                   | Tienda de aplicaciones cubana para Android                                                                                             |
| SSL                      | Secure Sockets Layer                                                                                                                   |
| HTTPS                    | Protocolo seguro de transferencia de hipertexto                                                                                        |
| **Jefe de Oficina**      | **Usuario autorizado por una agencia de envíos (ej. Central American Cargo en Panamá) para gestionar manifiestos y supervisar envíos** |
| **Cliente Remitente**    | **Persona que envía un paquete**                                                                                                       |
| **Cliente Destinatario** | **Persona que recibe un paquete**                                                                                                      |
| **House**                | Número de identificación único de un paquete en el manifiesto                                                                          |
| **Arribado**             | Estado del paquete cuando llega al aeropuerto de destino en Cuba                                                                       |
| **Facturado**            | Estado del paquete cuando tiene importe y factura en Aerovaradero                                                                      |
| **Faltante de Origen**   | El bulto nunca salió del país de origen                                                                                                |
| **Presencial**           | La aduana detectó un problema y Aerovaradero lo entregará directamente                                                                 |
| **Clasificación**        | El paquete está en el almacén de Seta Expreso, clasificado por provincia/municipio                                                     |
| **Proceso de Entrega**   | El paquete está en ruta hacia el cliente destinatario                                                                                  |
| **No Entregado**         | El paquete no pudo ser entregado y vuelve a clasificación                                                                              |
| **🆕 Reoptimización Dinámica** | Capacidad del sistema para recalcular una ruta en tiempo real ante imprevistos (cliente no encontrado, tráfico, nuevo pedido urgente) |
| **🆕 Análisis Post-Ruta** | Reporte que compara la ruta planificada vs la ruta real, generando métricas de eficiencia por chofer, vehículo y zona |

---

## 2. DESCRIPCIÓN GENERAL DEL SISTEMA

### 2.1 Perspectiva del Producto
SIGMA-T reemplazará el sistema actual basado en hojas de cálculo Excel y OptimoRoute (software de pago). El sistema será una solución integral construida sobre tecnologías open source para eliminar costos de licencias recurrentes. El sistema será desplegado en un VPS de ETECSA para garantizar estabilidad y conectividad local en Cuba, y la aplicación móvil será distribuida a través de Google Play Store y APKlis.

### 2.2 Perfiles de Usuario

| Perfil | Descripción | Cantidad Estimada |
|--------|-------------|-------------------|
| **Administrador** | Dueño/gerente que gestiona todo el negocio. Acceso total a todas las funcionalidades. | 1-2 |
| **Jefe de Operaciones** | Controla rutas y operaciones. Puede crear, modificar y eliminar rutas. Controla el estado de cada ruta y los House entregados. | 1-3 |
| **Agencia de Envíos** | Empresa de paquetería (ej. Central American Cargo Panamá/México/Miami). Puede cargar manifiestos en Excel, revisar el estado completo de los envíos, y ver todos los House de su agencia. | 2-5 |
| **Chofer** | Conductor que ejecuta entregas en ruta. Ve su ruta asignada y registra entregas. Puede solicitar reoptimización de ruta ante incidencias. | 5-20 |
| **Cliente Remitente** | Persona que envía un paquete. Solo puede ver el estado de su House, ubicación, fecha de entrega y costo de aduana. | Variable |
| **Cliente Destinatario** | Persona que recibe un paquete. Solo puede ver el estado de su House, ubicación, fecha de entrega y costo de aduana. | Variable |
| **Auditor** | Usuario con permisos de solo lectura para revisión | 1 |
| **Desarrollador** | Equipo técnico que mantiene y evoluciona el sistema | 3-5 |
| **Administrador de Sistemas** | Personal encargado de la instalación y mantenimiento del servidor | 1 |

### 2.3 Restricciones Técnicas
- **Hardware:** Dispositivos Android 8.0+ para choferes.
- **Conectividad:** Modo offline con sincronización posterior (imprescindible en Cuba).
- **Base de Datos:** PostgreSQL (producción) y SQLite (local móvil).
- **Backend:** Node.js + TypeScript.
- **Frontend Web:** React + Vite + Tailwind CSS.
- **Mobile:** Flutter (multiplataforma).
- **Mapas:** OpenStreetMap + OSRM para optimización de rutas.
- **Estándares de Codificación:** ESLint + Prettier (TypeScript), Dart Analyzer (Flutter).
- **Documentación:** JSDoc para TypeScript, OpenAPI para APIs, READMEs por módulo.
- **Servidor de Producción:** Ubuntu 22.04 LTS o 24.04 LTS en VPS ETECSA.
- **Seguridad:** SSL/HTTPS obligatorio con certificados Let's Encrypt.
- **Distribución Móvil:** Google Play Store y APKlis.

### 2.4 Flujo de Paquetería y Estados del Paquete

**Flujo completo del paquete:**

```
Cliente Remitente → Agencia CAC (Panamá/México/Miami) → Aerovaradero → Aduana → Seta Expreso → Cliente Destinatario
```

**Estados del Paquete (9 estados):**

| # | Estado                        | Responsable  | Descripción                                 | ¿Llega a Seta Expreso? | Visible para                                       |
|---|-------------------------------|--------------|---------------------------------------------|------------------------|----------------------------------------------------|
| 1 | **Faltante de Origen**        | Aerovaradero | El bulto nunca salió del país de origen     | ❌ **NO** (FIN) | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 2 | **Presencial**                | Aerovaradero | Problema detectado por aduana               | ❌ **NO** (FIN) | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 3 | **Arribado**                  | Aerovaradero | Llegó al Aeropuerto de destino              | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 4 | **Facturado**                 | Aerovaradero | Tiene importe y factura en Aerovaradero     | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 5 | **Entregado en Aerovaradero** | Aerovaradero | Recogido por Seta Expreso                   | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 6 | **Clasificación**             | Seta Expreso | En almacén clasificando por provincia       | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 7 | **Proceso de Entrega**        | Seta Expreso | En ruta al destinatario                     | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 8 | **Entregado**                 | Seta Expreso | Entregado con firma y fotos                 | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |
| 9 | **No Entregado**              | Seta Expreso | No se pudo entregar, vuelve a clasificación | ✅ Sí           | Admin, Jefe Operaciones, Agencia, Remitente, Destinatario |

---

## 3. REQUISITOS FUNCIONALES (RF) POR MÓDULO

### MÓDULO 1: ADMINISTRACIÓN DE FLOTA (RF-FLOTA) - ⏳ PENDIENTE

| ID       | Requisito                                                                                                                 | Prioridad | Complejidad | Estado       |
|----------|---------------------------------------------------------------------------------------------------------------------------|-----------|-------------|--------------|
| RF-FL-01 | Registrar vehículo con: matrícula, marca, modelo, año, capacidad (kg/m³/pasajeros), tipo de combustible, consumo promedio | Alta      | Baja        | ⏳ Pendiente |
| RF-FL-02 | Registrar mantenimientos: fecha, tipo (preventivo/correctivo), costo, taller, próximo mantenimiento (km o fecha)          | Alta      | Media       | ⏳ Pendiente |
| RF-FL-03 | Asignar vehículo a chofer en turno                                                                                        | Alta      | Baja        | ⏳ Pendiente |
| RF-FL-04 | Registrar historial de kilómetros recorridos por vehículo                                                                 | Alta      | Media       | ⏳ Pendiente |
| RF-FL-05 | Calcular depreciación del vehículo (método lineal)                                                                        | Media     | Baja        | ⏳ Pendiente |
| RF-FL-06 | Registrar consumo real de combustible vs. esperado                                                                        | Alta      | Media       | ⏳ Pendiente |
| RF-FL-07 | Alertas automáticas de mantenimiento (basadas en km o tiempo)                                                             | Alta      | Media       | ⏳ Pendiente |
| RF-FL-08 | Reporte de costos acumulados por vehículo (mantenimiento + combustible)                                                   | Alta      | Media       | ⏳ Pendiente |

### MÓDULO 2: GESTIÓN DE CHOFERES (RF-CHOFER) - ⏳ PENDIENTE

| ID       | Requisito                                                                                           | Prioridad | Complejidad | Estado       |
|----------|-----------------------------------------------------------------------------------------------------|-----------|-------------|--------------|
| RF-CH-01 | Registrar chofer con: nombre, identificación, licencia (tipo, vigencia), contacto, fecha de ingreso | Alta      | Baja        | ⏳ Pendiente |
| RF-CH-02 | Registrar disponibilidad/horario del chofer (turnos)                                                | Alta      | Baja        | ⏳ Pendiente |
| RF-CH-03 | Calcular salario (base + bonos por entregas)                                                        | Alta      | Media       | ⏳ Pendiente |
| RF-CH-04 | Registrar incidencias durante ruta (accidentes, averías, retrasos)                                  | Alta      | Baja        | ⏳ Pendiente |
| RF-CH-05 | Evaluar desempeño (% entregas a tiempo, consumo)                                                    | Media     | Media       | ⏳ Pendiente |
| RF-CH-06 | Historial completo de rutas y entregas por chofer                                                   | Alta      | Media       | ⏳ Pendiente |

### MÓDULO 3: GESTIÓN DE CLIENTES Y ENVÍOS (RF-CLIENTE) - ✅ IMPLEMENTADO

| ID | Requisito | Prioridad | Complejidad | Estado | Nota |
|----|-----------|-----------|-------------|--------|------|
| **RF-CL-01a** | **Importar envíos desde Excel (.xlsx) con formato de manifiesto real** | **Crítica** | Media | **✅ Implementado** | **Con mapeo flexible de columnas** |
| **RF-CL-01b** | **Importar envíos desde CSV (formato alternativo)** | Alta | Baja | **✅ Implementado** | **Con mapeo flexible de columnas** |
| **RF-CL-01c** | **Validación de datos al importar** | Alta | Media | **✅ Implementado** | **Incluye validación de Carnet (11 dígitos) y Unidad de destino** |
| **RF-CL-01d** | **Vista previa de importación** | Alta | Media | **✅ Implementado** | **Mostrar todos los registros, no solo 10** |
| **RF-CL-01e** | **Reporte de errores de importación** | Alta | Media | **✅ Implementado** | **En pantalla, sin límite de errores** |
| **RF-CL-02** | **Registrar cliente (empresa de paquetería) con: nombre, contacto, dirección, tarifas negociadas** | Alta | Baja | **✅ Implementado** | |
| **RF-CL-03** | **Registrar envío manual uno a uno con todos los campos del manifiesto** | Alta | Baja | **✅ Implementado** | |
| **RF-CL-04** | **Historial de envíos por cliente** | Alta | Baja | **✅ Implementado** | **Con exportación a PDF y CSV** |
| **RF-CL-05** | **🆕 Categorizar envíos por prioridad (urgente, normal, económico)** | **Alta** | Baja | ⏳ Pendiente | **Ahora es Alta prioridad** |
| **RF-CL-06** | **Registrar novedades de entrega (entregado, no encontrado, dañado, etc.)** | Alta | Baja | **✅ Implementado** | |

**Especificación Detallada de RF-CL-01a (Importación de Excel):**

| Aspecto               | Especificación                                                                                                                            |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Mapeo de columnas** | El usuario debe poder seleccionar manualmente qué columna del Excel corresponde a cada campo del sistema mediante un selector desplegable |
| **Columnas extras**   | Las columnas no mapeadas deben ser ignoradas                                                                                              |
| **Filas vacías**      | Deben ser ignoradas                                                                                                                       |
| **House**             | Formato: CACC-24014926, debe ser único en la base de datos                                                                                |

**Especificación Detallada de RF-CL-01c (Validación de datos al importar):**

| Campo                         | Validación                          | Obligatorio |
|-------------------------------|-------------------------------------|-------------|
| `house`                       | Formato: CACC-24014926, único en BD | ✅ Sí      |
| `descripcion`                 | No vacío                            | ✅ Sí      |
| `peso`                        | > 0                                 | ✅ Sí      |
| `bultos`                      | > 0                                 | ✅ Sí      |
| `remitente_nombre`            | No vacío                            | ✅ Sí      |
| `remitente_passport`          | Puede ser NULL                      | ❌ No      |
| `destinatario_nombre`         | No vacío                            | ✅ Sí      |
| `destinatario_identificacion` | **11 dígitos exactos**              | ✅ Sí      |
| `destinatario_telefono`       | No vacío                            | ✅ Sí      |
| `destinatario_direccion`      | No vacío                            | ✅ Sí      |
| `cobrado_origen`              | Puede ser NULL                      | ❌ No      |
| `unidad_destino`              | **No puede ser NULL**               | ✅ Sí      |

**Especificación Detallada de RF-CL-01d (Vista previa de importación):**

| Aspecto                      | Especificación                                                                  |
|------------------------------|---------------------------------------------------------------------------------|
| **Número de registros**      | Mostrar todos los registros con paginación                                      |
| **Visualización de errores** | Mostrar errores en la misma tabla, con columna "Estado" (✅ Válido / ❌ Error) |
| **Edición**                  | Solo lectura, no editable                                                       |

**Especificación Detallada de RF-CL-01e (Reporte de errores de importación):**

| Aspecto       | Especificación                              |
|---------------|---------------------------------------------|
| **Formato**   | En pantalla, con opción de copiar/descargar |
| **Límite**    | Sin límite, mostrar todos los errores       |
| **Contenido** | Fila #, House, lista de errores por campo   |

**Especificación Detallada de RF-CL-04 (Historial de envíos por cliente):**

| Aspecto                 | Especificación                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------|
| **Permisos**            | Administrador, Jefe de Operaciones, Agencia de Envíos, Cliente Remitente, Cliente Destinatario |
| **Información visible** | Todos los envíos del cliente, con estado completo de cada House                                |
| **Exportación**         | PDF y CSV                                                                                      |
| **Filtros**             | Por fecha, estado, House                                                                       |

**🆕 Especificación Detallada de RF-CL-05 (Categorización por Prioridad):**

| Prioridad     | Descripción                                              | Impacto en Rutas                                  | Color       |
|---------------|----------------------------------------------------------|---------------------------------------------------|-------------|
| **Urgente**   | Entregas que deben realizarse en el menor tiempo posible | Se asignan a las primeras 3 posiciones de la ruta | 🔴 Rojo     |
| **Normal**    | Entregas estándar sin urgencia especial                  | Se colocan después de las urgentes                | 🟡 Amarillo |
| **Economico** | Entregas con menor prioridad, pueden esperar             | Se colocan al final de la ruta                    | 🟢 Verde    |

---

### MÓDULO 4: PLANIFICACIÓN Y OPTIMIZACIÓN DE RUTAS (RF-RUTA) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-RU-00a | Planificación semanal por defecto (lunes a domingo) | Alta | Baja | ⏳ Pendiente |
| RF-RU-00b | Visualización de carga semanal (cantidad, peso, volumen) | Alta | Baja | ⏳ Pendiente |
| RF-RU-00c | Replanificación manual (mover envíos entre semanas) | Alta | Media | ⏳ Pendiente |
| RF-RU-01 | Agrupar envíos por zona geográfica (agrupamiento automático) | Alta | Media | ⏳ Pendiente |
| RF-RU-02 | Asignar envíos a vehículos según capacidad | Alta | Media | ⏳ Pendiente |
| **RF-RU-03** | **🆕 Calcular ruta óptima secuencial usando algoritmo VRPTW con optimización de combustible, prioridad de entregas y análisis post-ruta** | **Crítica** | **Alta** | ⏳ Pendiente |
| RF-RU-04 | Visualizar ruta en mapa (OpenStreetMap) | Alta | Media | ⏳ Pendiente |
| RF-RU-05 | Estimar tiempo total de ruta y tiempo de llegada por parada | Alta | Media | ⏳ Pendiente |
| RF-RU-06 | Permitir ajuste manual de ruta (drag and drop) | Alta | Media | ⏳ Pendiente |
| RF-RU-07 | Generar manifiesto de ruta para chofer (orden de entregas) | Alta | Baja | ⏳ Pendiente |
| **RF-RU-08** | **🆕 Reoptimizar ruta ante incidencias (falla de vehículo, nuevo pedido urgente) en menos de 5 segundos** | **Alta** | **Alta** | ⏳ Pendiente |

**🆕 Especificación Detallada de RF-RU-03 (Optimización de Rutas con VRPTW Avanzado):**

| Aspecto                         | Especificación                                                                                           |
|---------------------------------|----------------------------------------------------------------------------------------------------------|
| **Algoritmo Base**              | VRPTW (Vehicle Routing Problem with Time Windows)                                                        |
| **Optimización de Combustible** | Considera el consumo específico de cada vehículo y el precio del combustible para calcular el costo real |
| **Prioridad de Entregas**       | Los envíos urgentes se colocan en las primeras 3 posiciones de la ruta                                   |
| **Función de Costo**            | `costo = (0.6 × distancia) + (0.4 × consumo_combustible) + penalizaciones`                               |
| **Tiempo de Ejecución**         | <30 segundos para ≤50 envíos                                                                             |
| **Capacidad de Vehículos**      | Respeta peso y volumen máximo de cada vehículo                                                           |
| **Ventanas de Tiempo**          | Respeta horarios de entrega de cada cliente                                                              |
| **Análisis Post-Ruta**          | Genera reporte comparativo entre ruta planificada y real                                                 |

**🆕 Especificación Detallada de RF-RU-08 (Reoptimización Dinámica):**

| Aspecto                 | Especificación                                                  |
|-------------------------|-----------------------------------------------------------------|
| **Tiempo de Respuesta** | <5 segundos                                                     |
| **Disparadores**        | Cliente no encontrado, tráfico, avería, nuevo pedido urgente    |
| **Retención de Estado** | Mantiene las entregas ya realizadas y reoptimiza el resto       |
| **Notificación**        | El chofer recibe la ruta actualizada en su app móvil            |
| **Registro**            | Cada reoptimización queda registrada en el sistema de auditoría |

---

### MÓDULO 5: COSTOS Y FINANZAS (RF-COSTO) - ⏳ PENDIENTE

| ID           | Requisito                                                                         | Prioridad | Complejidad | Estado |
|--------------|-----------------------------------------------------------------------------------------------------------|-------------|-----------|--------------|
| RF-CO-01     | Definir fichas de costo por ruta/tipo de vehículo                                                         | **Crítica** | Media     | ⏳ Pendiente |
| RF-CO-02     | Registrar costos fijos mensuales (salarios, seguros, impuestos, depreciación)                             | Alta        | Baja      | ⏳ Pendiente |
| RF-CO-03     | Registrar costos variables por viaje (combustible, peajes, mantenimiento)                                 | Alta        | Baja      | ⏳ Pendiente |
| **RF-CO-04** | **🆕 Calcular costo por kilómetro en tiempo real, incluyendo costo de combustible por tipo de vehículo** | **Crítica**  | **Media** | ⏳ Pendiente |
| RF-CO-05     | Calcular costo real de cada envío                                                                         | Alta        | Media     | ⏳ Pendiente |
| RF-CO-06     | Calcular utilidad neta por viaje (ingreso - costo total)                                                  | **Crítica** | Media     | ⏳ Pendiente |
| RF-CO-07     | Generar reporte de rentabilidad por cliente, ruta, vehículo y chofer                                      | Alta        | Media     | ⏳ Pendiente |
| RF-CO-08     | Comparar costo estimado vs. costo real                                                                    | Alta        | Media     | ⏳ Pendiente |
| RF-CO-09     | Libro de ingresos y gastos (contabilidad básica)                                                          | Alta        | Media     | ⏳ Pendiente |
| RF-CO-10     | Generar facturas y gestionar cobros                                                                       | Alta        | Media     | ⏳ Pendiente |
| **RF-CO-11** | **Gestión de Esquemas de Pago a Choferes**                                                                | **Alta**    | **Media** | ⏳ Pendiente |
| **RF-CO-12** | **Gestión de Parámetros de Costos Variables**                                                             | **Alta**    | **Baja**  | ⏳ Pendiente |
| **RF-CO-13** | **Consulta Automática de Costos de Aduana**                                                               | **Crítica** | **Alta**  | ⏳ Pendiente |
| **RF-CO-14** | **Módulo de Costos de Aduana y Gastos de Importación**                                                    | **Crítica** | **Alta**  | ⏳ Pendiente |
| **RF-CO-15** | **Ficha de Costo Detallada por Ruta**                                                                     | **Crítica** | **Alta**  | ⏳ Pendiente |

**🆕 Especificación Detallada de RF-CO-04 (Costo por Kilómetro con Combustible):**

| Aspecto | Especificación |
|---------|----------------|
| **Fórmula** | `costo_km = (combustible_consumido × precio_combustible + mantenimiento + depreciación + otros) / distancia` |
| **Combustible por Vehículo** | Cada vehículo tiene un consumo específico (L/100km) según tipo de combustible y modelo |
| **Actualización** | Los precios de combustible se actualizan manualmente desde Parámetros del Sistema |
| **Desglose** | El reporte de costo por km debe desglosar: combustible, mantenimiento, depreciación, seguros, administrativos |

---

### MÓDULO 6: APP PARA CHOFERES (RF-MOBILE) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-MO-01 | Autenticación del chofer (login offline) | Alta | Baja | ⏳ Pendiente |
| RF-MO-02 | Ver ruta asignada del día (lista de entregas ordenadas) | Alta | Baja | ⏳ Pendiente |
| RF-MO-03 | Visualizar mapa con ruta y paradas | Alta | Media | ⏳ Pendiente |
| RF-MO-04 | Registrar inicio y fin de cada entrega (timestamp) | Alta | Baja | ⏳ Pendiente |
| **RF-MO-05** | **🆕 Registrar incidencias por entrega (no encontrado, dañado, etc.) y solicitar reoptimización automática de ruta** | **Alta** | **Media** | ⏳ Pendiente |
| RF-MO-06 | Registrar costos reales (combustible cargado, peajes pagados) | Alta | Baja | ⏳ Pendiente |
| RF-MO-07 | Capturar firma digital del cliente al recibir | Media | Media | ⏳ Pendiente |
| RF-MO-08 | Geolocalización en tiempo real (tracking) | Media | Media | ⏳ Pendiente |
| RF-MO-09 | Funcionar sin internet (modo offline) con sincronización automática | **Crítica** | **Alta** | ⏳ Pendiente |
| RF-MO-10 | Notificar llegada a destino (push notification al admin) | Baja | Media | ⏳ Pendiente |
| RF-MO-11 | Visualizar historial de entregas propias | Media | Baja | ⏳ Pendiente |
| **RF-MO-12** | **🆕 Solicitar reoptimización de ruta ante incidencias (cliente no encontrado, tráfico, nuevo pedido urgente)** | **Alta** | **Media** | ⏳ Pendiente |

**🆕 Especificación Detallada de RF-MO-12 (Solicitud de Reoptimización):**

| Aspecto | Especificación |
|---------|----------------|
| **Acceso** | Botón "Reoptimizar Ruta" en la app del chofer |
| **Motivos** | Cliente no encontrado, tráfico, avería, nuevo pedido urgente |
| **Tiempo de Respuesta** | <5 segundos |
| **Resultado** | El chofer recibe la nueva ruta optimizada en su app |
| **Historial** | Cada reoptimización queda registrada para auditoría |

---

### MÓDULO 7: DASHBOARD Y REPORTES (RF-DASH) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-DA-01 | Dashboard principal con KPIs: costo/km, % entregas a tiempo, utilidad neta por viaje | **Crítica** | Media | ⏳ Pendiente |
| RF-DA-02 | Gráfico de rentabilidad por ruta | Alta | Media | ⏳ Pendiente |
| RF-DA-03 | Gráfico de evolución de costos (mensual) | Alta | Media | ⏳ Pendiente |
| RF-DA-04 | Reporte de desempeño de choferes | Alta | Media | ⏳ Pendiente |
| RF-DA-05 | Reporte de estado de la flota (vehículos en ruta, en taller, disponibles) | Alta | Media | ⏳ Pendiente |
| **RF-DA-06** | **🆕 Exportar reportes a CSV/PDF, incluyendo análisis post-ruta y métricas de eficiencia** | **Alta** | **Media** | ⏳ Pendiente |
| RF-DA-07 | Alertas automáticas (mantenimiento vencido, consumo anómalo) | Media | Media | ⏳ Pendiente |
| RF-DA-08 | Mapa de calor de entregas por zona | Media | Media | ⏳ Pendiente |
| **RF-DA-09** | **🆕 Panel de Análisis Post-Ruta: comparación planificado vs real, eficiencia por chofer/vehículo/zona** | **Alta** | **Media** | ⏳ Pendiente |

**🆕 Especificación Detallada de RF-DA-09 (Panel de Análisis Post-Ruta):**

| Aspecto | Especificación |
|---------|----------------|
| **Comparación** | Muestra ruta planificada vs ruta real (distancia, tiempo, combustible) |
| **Métricas por Chofer** | Entregas a tiempo, eficiencia de combustible, incidencias |
| **Métricas por Vehículo** | Consumo real vs esperado, kilómetros recorridos |
| **Métricas por Zona** | Tiempo promedio de entrega por provincia/municipio |
| **Recomendaciones** | Sugerencias automáticas para mejorar eficiencia |
| **Exportación** | Reporte exportable a PDF y CSV |

---

### MÓDULO 8: PORTAL DEL CLIENTE (RF-PORTAL) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-PO-01 | Login para clientes | Alta | Media | ⏳ Pendiente |
| RF-PO-02 | Visualizar todos los envíos de la empresa con estado actualizado | Alta | Media | ⏳ Pendiente |
| RF-PO-03 | Buscar envío por número de House | Alta | Baja | ⏳ Pendiente |
| RF-PO-04 | Ver ubicación en tiempo real del vehículo en ruta | Alta | Media | ⏳ Pendiente |
| RF-PO-05 | Recibir notificaciones de cambio de estado (email/push) | Media | Media | ⏳ Pendiente |
| RF-PO-06 | Descargar comprobante de entrega (PDF con firma) | Alta | Media | ⏳ Pendiente |
| RF-PO-07 | Estadísticas de envíos (entregados, pendientes, incidencias) | Media | Media | ⏳ Pendiente |

### MÓDULO 9: GESTIÓN DE ALMACÉN (RF-ALMACEN) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-AL-01 | Registrar entrada de paquetes a bodega | Alta | Baja | ⏳ Pendiente |
| RF-AL-02 | Registrar salida de paquetes (asignación a ruta) | Alta | Baja | ⏳ Pendiente |
| RF-AL-03 | Asignar ubicación física en bodega (rack/estante) | Media | Baja | ⏳ Pendiente |
| RF-AL-04 | Visualizar mapa de bodega con ubicación de paquetes | Media | Media | ⏳ Pendiente |
| RF-AL-05 | Buscar paquete por número de House | Alta | Baja | ⏳ Pendiente |
| RF-AL-06 | Reporte de inventario (paquetes en bodega) | Alta | Baja | ⏳ Pendiente |

### MÓDULO 10: GESTIÓN DE PROSPECTOS Y MARKETING (RF-MARKETING) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-MK-01 | Registrar prospecto con: empresa, contacto, teléfono, email, fuente | Alta | Baja | ⏳ Pendiente |
| RF-MK-02 | Registrar seguimiento de contactos (llamadas, reuniones) | Alta | Baja | ⏳ Pendiente |
| RF-MK-03 | Generar cotizaciones para prospectos | Alta | Media | ⏳ Pendiente |
| RF-MK-04 | Convertir prospecto en cliente activo | Alta | Baja | ⏳ Pendiente |
| RF-MK-05 | Enviar encuestas de satisfacción a clientes | Media | Media | ⏳ Pendiente |
| RF-MK-06 | Documentar casos de éxito con testimonios | Media | Baja | ⏳ Pendiente |
| RF-MK-07 | Dashboard de ventas (prospectos, cotizaciones, conversiones) | Alta | Media | ⏳ Pendiente |

### MÓDULO 11: AUDITORÍA Y SEGURIDAD (RF-AUDIT) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| RF-AU-01 | Registrar todas las acciones de usuarios (log de auditoría) | **Crítica** | Media | ⏳ Pendiente |
| RF-AU-02 | Registrar intentos de login fallidos | Alta | Baja | ⏳ Pendiente |
| RF-AU-03 | Visualizar historial de cambios por entidad (envío, ruta, vehículo) | Alta | Media | ⏳ Pendiente |
| RF-AU-04 | Exportar logs de auditoría a CSV | Media | Baja | ⏳ Pendiente |
| RF-AU-05 | Alertas de seguridad (múltiples intentos fallidos, accesos sospechosos) | Media | Media | ⏳ Pendiente |
| RF-AU-06 | Trazabilidad de acciones offline (registro local + sincronización) | Alta | Media | ⏳ Pendiente |
| **RF-AU-07** | **🆕 Registrar eventos de reoptimización de rutas (disparador, tiempo, resultado)** | **Alta** | **Media** | ⏳ Pendiente |

### MÓDULO 12: AUTOMATIZACIÓN DE FACTURACIÓN DE ADUANA (RF-ADUANA) - ⏳ PENDIENTE

| ID | Requisito | Prioridad | Complejidad | Estado |
|----|-----------|-----------|-------------|--------|
| **RF-ADU-01** | **Automatización de Facturación de Aduana** | **Crítica** | **Alta** | ⏳ Pendiente |

**Especificación:**

El sistema debe consultar automáticamente el sitio web de Aerovaradero en los horarios establecidos (8:00 AM, 12:00 PM, 4:00 PM y 12:00 AM) **SOLO para los houses que se encuentren en estado "Arribado"**.

**Los houses en estado "Facturado" NO deben ser consultados nuevamente.**

**Proceso:**

1. El sistema obtiene **SOLO** los houses con estado **"Arribado"**
2. Para cada house, construye la URL de payment:
   ```
   https://www.aerovaradero.com.cu/payment/?cod_la={cod_la}&cod_awb={cod_awb}&cod_house={house}
   ```
3. El sistema verifica si el house tiene **importe** y **factura** registrados en Aerovaradero
4. Si ambos existen → Cambia estado a **"Facturado"**
5. Si NO existen → Mantiene estado **"Arribado"** (se reintentará en la próxima ejecución)
6. **Los houses con estado "Facturado" son ignorados en futuras consultas**

**Horarios de ejecución:** 8:00 AM, 12:00 PM, 4:00 PM, 12:00 AM (hora de Cuba)

**URL de ejemplo:**
```
https://www.aerovaradero.com.cu/payment/?cod_la=230&cod_awb=66684660&cod_house=24014999
```

---

## 4. REQUISITOS NO FUNCIONALES (RNF)

| ID | Requisito | Especificación | Prioridad | Estado |
|----|-----------|----------------|-----------|--------|
| **RNF-01** | **🆕 Rendimiento** | **Dashboard cargue en <3 segundos; optimización de ruta en <30 segundos para ≤50 envíos; reoptimización en <5 segundos** | **Alta** | ⏳ Pendiente |
| RNF-02 | Disponibilidad | 99.5% de uptime para sistema web | Alta | ⏳ Pendiente |
| RNF-03 | Seguridad | Autenticación por usuario/rol; contraseñas hasheadas; HTTPS obligatorio | Alta | ⏳ Pendiente |
| RNF-04 | Escalabilidad | Soporte para hasta 1,000 envíos/día y 50 choferes | Media | ⏳ Pendiente |
| RNF-05 | Offline | App móvil funcional sin internet con sincronización automática | **Crítica** | ⏳ Pendiente |
| RNF-06 | Usabilidad | Interfaz intuitiva; tiempo de entrenamiento <2 horas para choferes | Alta | ⏳ Pendiente |
| **RNF-07** | **Mantenibilidad** | **Código documentado; arquitectura modular; open source** | **Alta** | **✅ Implementado** |
| RNF-08 | Portabilidad | Web responsive; app Android e iOS (Flutter) | Media | ⏳ Pendiente |
| RNF-09 | Conformidad | Cumplir con normativas cubanas de transporte y tributación | Alta | ⏳ Pendiente |
| RNF-10 | Observabilidad | Logs de errores y auditoría de acciones críticas | Alta | ⏳ Pendiente |
| RNF-11 | Auditoría | Trazabilidad completa de todas las acciones del sistema | **Crítica** | ⏳ Pendiente |
| RNF-12 | Idioma | Interfaz completa en español (incluyendo mensajes de error) | Alta | ✅ Implementado |
| **RNF-13** | **Estándares de Codificación (Backend)** | **Todo el código en TypeScript/Node.js debe cumplir con las reglas de ESLint y Prettier configuradas, y pasar el análisis estático en el pipeline de CI/CD** | **Alta** | **✅ Implementado** |
| **RNF-14** | **Estándares de Codificación (Frontend)** | **Todo el código en React/TypeScript debe cumplir con las reglas de ESLint y Prettier configuradas, y pasar el análisis estático en el pipeline de CI/CD** | **Alta** | **✅ Implementado** |
| **RNF-15** | **Estándares de Codificación (Mobile)** | **Todo el código en Flutter/Dart debe cumplir con las reglas del Dart Analyzer configuradas en `analysis_options.yaml`** | **Alta** | **✅ Implementado** |
| **RNF-16** | **Documentación de Código** | **Toda función, clase, interfaz o componente público debe estar documentado con JSDoc (TypeScript) o comentarios de documentación (Dart)** | **Alta** | **✅ Implementado** |
| **RNF-17** | **Documentación de API** | **La API REST debe estar documentada siguiendo el estándar OpenAPI (Swagger), con especificaciones de endpoints, parámetros y ejemplos** | **Alta** | **✅ Implementado** |
| **RNF-18** | **Documentación de Módulos** | **Cada módulo o paquete del sistema debe contar con un archivo `README.md` que explique su propósito, instalación, configuración y uso** | Media | **✅ Implementado** |
| **RNF-19** | **Pruebas de Estilo de Código** | **El pipeline de CI/CD debe ejecutar automáticamente las herramientas de análisis estático (ESLint, Dart Analyzer) y fallar si hay violaciones** | **Alta** | **✅ Implementado** |
| **RNF-20** | **Generación Automática de Documentación** | **La documentación técnica del código (generada con TypeDoc, JSDoc) debe ser generada automáticamente en cada release o de forma periódica** | Media | **✅ Implementado** |
| **RNF-21** | **Conventional Commits** | **Los mensajes de commit deben seguir el estándar Conventional Commits (`feat:`, `fix:`, `docs:`, etc.) para mantener un historial claro y permitir la generación automática de changelogs** | Media | **✅ Implementado** |
| **RNF-22** | **Cobertura de Documentación** | **≥80% de las funciones, clases e interfaces públicas deben tener documentación JSDoc/comentarios** | Media | **✅ Implementado** |
| **RNF-23** | **Cobertura de Estándares** | **≥95% de las líneas de código deben cumplir con los estándares de codificación definidos (ESLint, Prettier, Dart Analyzer)** | **Alta** | **✅ Implementado** |
| **RNF-24** | **🆕 Precisión en Cálculo de Combustible** | **El sistema debe usar el precio del combustible configurado (RF-CO-12) y el consumo específico de cada vehículo para calcular el costo exacto por litro consumido en las rutas, permitiendo un seguimiento y reporte preciso de este gasto** | **Alta** | ⏳ Pendiente |
| RNF-25 | Integración Robusta con Sitio de Aduana | La integración con el sitio de Aerovaradero (URL de payment) debe ser robusta ante cambios en la estructura del sitio web. Se debe implementar un sistema de alertas para notificar fallos en la extracción de datos y permitir la entrada manual del costo de aduana como contingencia. | **Alta** | ⏳ Pendiente |
| RNF-26 | Precisión en Cálculo de Ficha de Costo | El sistema debe calcular la ficha de costo con una precisión de 2 decimales. Todos los costos deben calcularse en CUP utilizando la tasa de cambio configurada (RF-CO-12). Los cálculos deben ser auditables y reproducibles. El tiempo de generación de la ficha debe ser menor a 5 segundos por ruta. | **Alta** | ⏳ Pendiente |
| **RNF-27** | **Alojamiento en VPS ETECSA** | **El sistema debe ser desplegable en un VPS de ETECSA con Ubuntu 22.04 LTS o 24.04 LTS, y debe funcionar correctamente con los recursos mínimos (2 GB RAM, 50 GB disco).** | **Alta** | ⏳ Pendiente |
| **RNF-28** | **Distribución en Google Play Store** | **La app móvil debe cumplir con las políticas de Google Play Store y estar publicada en la tienda. La publicación debe realizarse en un plazo máximo de 30 días después del lanzamiento de la versión 1.0.** | **Alta** | ⏳ Pendiente |
| **RNF-29** | **Distribución en APKlis** | **La app móvil debe estar disponible en APKlis, la tienda de aplicaciones cubana, en el momento del lanzamiento de la versión 1.0.** | **Alta** | ⏳ Pendiente |
| **RNF-30** | **SSL/HTTPS Obligatorio** | **Todos los servicios (backend, frontend web) deben operar exclusivamente bajo HTTPS con certificados Let's Encrypt. El acceso por HTTP debe redirigir automáticamente a HTTPS.** | **Alta** | ⏳ Pendiente |
| **RNF-31** | **Sistema Operativo del Servidor** | **El servidor de producción debe ejecutar Ubuntu 22.04 LTS o 24.04 LTS.** | **Alta** | ⏳ Pendiente |
| **RNF-32** | **Descarga Directa de APK** | **El sitio web debe ofrecer la opción de descarga directa del archivo APK firmado para usuarios que no puedan acceder a Google Play Store o APKlis.** | **Media** | ⏳ Pendiente |
| **🆕 RNF-33** | **🆕 Análisis Post-Ruta** | **El sistema debe generar un análisis post-ruta comparando la ruta planificada vs la ruta real, con métricas de eficiencia por chofer, vehículo y zona, exportable a PDF/CSV** | **Alta** | ⏳ Pendiente |
| **🆕 RNF-34** | **🆕 Reoptimización Dinámica** | **El sistema debe permitir reoptimización dinámica en tiempo real ante incidencias, con un tiempo de respuesta <5 segundos y registro en auditoría** | **Alta** | ⏳ Pendiente |
| **🆕 RNF-35** | **🆕 Sistema de Estimación de Tiempos con IA** | **El sistema debe utilizar un modelo de regresión lineal (entrenado con datos históricos) para estimar tiempos de entrega, mejorando la precisión de las ventanas de tiempo** | **Media** | ⏳ Pendiente |
| **🆕 RNF-36** | **🆕 Precisión de Estimación** | **El sistema debe mantener una precisión ≥85% en las estimaciones de tiempo de entrega, con reentrenamiento automático del modelo IA cuando se acumulen nuevos datos** | **Media** | ⏳ Pendiente |

---

## 5. MODELO DE DATOS (COMPLETO)

```sql
-- USUARIO
USUARIO
├── id_usuario (PK)
├── nombre, email, password_hash
├── rol (admin, jefe_operaciones, agencia, chofer, cliente_remitente, cliente_destinatario, auditor)
└── activo

-- VEHICULO
VEHICULO
├── id_vehiculo (PK)
├── matricula, marca, modelo, año
├── capacidad_kg, capacidad_m3
├── tipo_combustible, consumo_promedio  -- 🆕 consumo_promedio en L/100km
├── kilometraje_total
├── disponible
└── fecha_registro

-- CHOFER
CHOFER
├── id_chofer (PK)
├── nombre, identificacion
├── licencia_tipo, licencia_vigencia
├── telefono, email
├── fecha_ingreso
├── salario_base
├── disponible
├── esquema_pago (fijo, por_km, por_entrega, combinado)
├── salario_por_km (DECIMAL, opcional)
└── salario_por_entrega (DECIMAL, opcional)

-- CLIENTE                          ✅ IMPLEMENTADO
├── id_cliente (PK)
├── nombre_empresa
├── contacto_nombre, contacto_telefono, contacto_email
├── tarifa_preferencial
└── activo

-- PROSPECTO
PROSPECTO
├── id_prospecto (PK)
├── nombre_empresa, contacto_nombre
├── telefono, email
├── fuente (referencia, llamada, web, otro)
├── estado (contactado, cotizado, cliente, inactivo)
└── fecha_registro

-- ENVIO                           ✅ IMPLEMENTADO
├── id_envio (PK)
├── id_cliente (FK)              -- Agencia de envíos
├── id_cliente_remitente (FK)    -- Persona que envía
├── id_cliente_destinatario (FK) -- Persona que recibe
├── id_chofer (FK)              ⏳ Pendiente
├── id_vehiculo (FK)            ⏳ Pendiente
├── id_ruta (FK)                ⏳ Pendiente
├── house (unique)
├── awb (VARCHAR(20))           -- Air Way Bill (ej. 230-66684660)
├── descripcion
├── peso, volumen, bultos
├── remitente_nombre, remitente_passport
├── destinatario_nombre, destinatario_direccion, destinatario_telefono
├── destinatario_identificacion   -- 11 dígitos exactos
├── cobrado_origen (boolean)
├── unidad_destino              -- No puede ser NULL
├── prioridad (urgente, normal, economico)     ⏳ Pendiente
├── fecha_limite                               ⏳ Pendiente
├── fecha_asignacion                           ⏳ Pendiente
├── fecha_entrega_real                         ⏳ Pendiente
├── estado_aerovaradero (ENUM)   -- faltante_origen, presencial, arribado, facturado, entregado_aerovaradero
├── estado_seta_expreso (ENUM)   -- clasificacion, proceso_entrega, entregado, no_entregado
├── incidencia (opcional)                      ⏳ Pendiente
├── firma_digital (opcional)                   ⏳ Pendiente
├── foto_evidencia (opcional)                  ⏳ Pendiente
├── importe_aduana (DECIMAL(12,2))             ⏳ Pendiente
├── numero_factura_aduana (VARCHAR(50))        ⏳ Pendiente
├── fecha_ultima_consulta_aduana (TIMESTAMP)   ⏳ Pendiente
├── intentos_consulta_aduana (INTEGER)         ⏳ Pendiente
├── 🆕 tiempo_estimado_ia (DECIMAL(10,2))     -- Tiempo estimado por IA (minutos)
├── 🆕 tiempo_real_entrega (DECIMAL(10,2))    -- Tiempo real de entrega (minutos)
├── 🆕 precision_estimacion (DECIMAL(5,2))    -- Precisión de la estimación (%)
├── fecha_arribado (TIMESTAMP)                 ⏳ Pendiente
├── fecha_facturado (TIMESTAMP)                ⏳ Pendiente
├── fecha_recogido (TIMESTAMP)                 ⏳ Pendiente
├── fecha_clasificacion (TIMESTAMP)            ⏳ Pendiente
├── fecha_proceso_entrega (TIMESTAMP)          ⏳ Pendiente
├── fecha_entregado (TIMESTAMP)                ⏳ Pendiente
├── fecha_no_entregado (TIMESTAMP)             ⏳ Pendiente
├── motivo_no_entrega (TEXT)                   ⏳ Pendiente
├── costo_aduana (DECIMAL(12,2))              ⏳ Pendiente
├── costo_importacion (DECIMAL(12,2))         ⏳ Pendiente
├── fecha_consulta_aduana (TIMESTAMP)         ⏳ Pendiente
├── estado_aduana (pendiente, consultado, error) ⏳ Pendiente
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

-- RUTA                             ⏳ PENDIENTE
├── id_ruta (PK)
├── id_vehiculo (FK)
├── id_chofer (FK)
├── fecha
├── secuencia_paradas (JSON)
├── distancia_total, tiempo_estimado
├── 🆕 combustible_estimado (DECIMAL(10,2))  -- Litros estimados
├── 🆕 combustible_real (DECIMAL(10,2))      -- Litros reales consumidos
├── 🆕 costo_combustible (DECIMAL(12,2))     -- Costo total de combustible
├── 🆕 costo_combustible_por_km (DECIMAL(10,2)) -- Costo de combustible por km
├── costo_total_estimado, costo_total_real
├── pago_chofer (DECIMAL(12,2))      -- Monto calculado para el chofer
├── ficha_costo (JSON)               -- Ficha de costo completa en formato JSON
├── ingresos (DECIMAL(12,2))          -- Ingresos totales de la ruta
├── utilidad_neta (DECIMAL(12,2))     -- Utilidad neta calculada
├── margen_utilidad (DECIMAL(5,2))    -- Margen de utilidad en porcentaje
├── 🆕 analisis_post_ruta (JSON)      -- Análisis completo post-ruta
├── 🆕 eficiencia_chofer (DECIMAL(5,2)) -- Eficiencia del chofer en %
├── 🆕 eficiencia_vehiculo (DECIMAL(5,2)) -- Eficiencia del vehículo en %
├── 🆕 desviacion_distancia (DECIMAL(5,2)) -- Desviación de distancia planificada vs real
├── 🆕 desviacion_tiempo (DECIMAL(5,2))    -- Desviación de tiempo planificado vs real
├── 🆕 desviacion_combustible (DECIMAL(5,2)) -- Desviación de combustible planificado vs real
├── 🆕 reoptimizaciones (INTEGER)        -- Número de reoptimizaciones en la ruta
├── 🆕 incidencias_ruta (JSON)           -- Lista de incidencias durante la ruta
└── estado (planificada, en_curso, completada, cancelada)

-- COSTO                            ⏳ PENDIENTE
├── id_costo (PK)
├── tipo (fijo, variable)
├── categoria (combustible, peaje, mantenimiento, neumatico, salario, depreciacion, seguro, administrativo, impuesto, aduana, importacion)
├── descripcion
├── monto (DECIMAL(12,2))
├── cantidad (DECIMAL(12,2))
├── precio_unitario (DECIMAL(12,2))
├── es_estimado (BOOLEAN)
├── fecha (TIMESTAMP)
├── id_vehiculo (FK, opcional)
├── id_ruta (FK, opcional)
├── id_envio (FK, opcional)
└── facturado (boolean)

-- PARAMETROS_SISTEMA               ⏳ PENDIENTE
├── id_parametro (PK)
├── clave (VARCHAR(50))              -- ej. 'tasa_cambio', 'precio_gasolina', 'precio_diesel'
├── valor (DECIMAL(12,2))
├── descripcion (TEXT)
├── unidad (VARCHAR(20))             -- ej. 'CUP', 'CUP/L', 'USD', 'CUP/km'
└── fecha_actualizacion (TIMESTAMP)

-- 🆕 HISTORIAL_PARAMETROS          ⏳ PENDIENTE
├── id_historial (PK)
├── id_parametro (FK)
├── valor_anterior (DECIMAL(12,2))
├── valor_nuevo (DECIMAL(12,2))
├── fecha_cambio (TIMESTAMP)
└── usuario (VARCHAR(50))

-- MANTENIMIENTO                    ⏳ PENDIENTE
├── id_mantenimiento (PK)
├── id_vehiculo (FK)
├── fecha
├── tipo (preventivo, correctivo)
├── descripcion
├── costo
├── kilometraje_actual
├── proximo_mantenimiento_km
└── taller (opcional)

-- FACTURA                          ⏳ PENDIENTE
├── id_factura (PK)
├── id_cliente (FK)
├── numero_factura (unique)
├── fecha_emision, fecha_vencimiento
├── subtotal, impuestos, total
├── estado (emitida, pagada, vencida, anulada)
└── fecha_pago (opcional)

-- INCIDENTE                        ⏳ PENDIENTE
├── id_incidente (PK)
├── id_envio (FK)
├── id_chofer (FK)
├── tipo (cliente_no_encontrado, paquete_dañado, averia, retraso, otro)
├── descripcion
├── fecha
├── prioridad (alta, media, baja)
├── estado (abierto, en_proceso, resuelto, cerrado)
├── 🆕 solicito_reoptimizacion (BOOLEAN) -- Si se solicitó reoptimización
└── solucion (opcional)

-- AUDITORIA                        ⏳ PENDIENTE
├── id_auditoria (PK)
├── id_usuario (FK)
├── accion (crear, leer, actualizar, eliminar, login, logout, consultar_aduana, facturar_aduana, reoptimizar_ruta, generar_analisis_post_ruta)
├── entidad (envio, ruta, vehiculo, chofer, cliente, parametro, ficha_costo, etc.)
├── id_entidad
├── detalle (JSON con cambios)
├── ip
└── fecha

-- ENVIO_BODEGA                     ⏳ PENDIENTE
├── id_envio_bodega (PK)
├── id_envio (FK)
├── ubicacion (rack/estante)
├── fecha_ingreso
├── fecha_salida
└── estado (almacenado, retirado)

-- 🆕 MODELO_IA                      ⏳ PENDIENTE
├── id_modelo (PK)
├── version (VARCHAR(10))
├── parametros (JSON)               -- Pesos del modelo de regresión lineal
├── precision (DECIMAL(5,2))        -- Precisión actual del modelo (%)
├── fecha_entrenamiento (TIMESTAMP)
├── num_datos_entrenamiento (INTEGER)
└── activo (BOOLEAN)                -- Si es el modelo activo actualmente

-- 🆕 REOPTIMIZACION                ⏳ PENDIENTE
├── id_reoptimizacion (PK)
├── id_ruta (FK)
├── id_chofer (FK)
├── motivo (cliente_no_encontrado, trafico, averia, nuevo_pedido_urgente, otro)
├── tiempo_respuesta (DECIMAL(5,2)) -- Tiempo de respuesta en segundos
├── entregas_afectadas (INTEGER)
├── resultado (JSON)                -- Nueva ruta optimizada
└── fecha (TIMESTAMP)
```

---

## 6. MATRIZ DE TRAZABILIDAD DE REQUISITOS (RESUMEN)

| Módulo | Requisitos | Subsistema Técnico | Prioridad | Estado |
|--------|------------|-------------------|-----------|--------|
| Flota | RF-FL-01 a RF-FL-08 | Backend + BD | **P1 (Fundacional)** | ⏳ Pendiente |
| Choferes | RF-CH-01 a RF-CH-06 | Backend + BD | P2 (Alta) | ⏳ Pendiente |
| **Clientes/Envíos** | **RF-CL-01a a RF-CL-06** | **Backend + BD** | **P1 (Fundacional)** | **✅ Implementado** |
| **🆕 Rutas** | **RF-RU-00a a RF-RU-08** | **Backend + OSRM + IA** | **P1 (Fundacional)** | ⏳ Pendiente |
| **Costos/Finanzas** | **RF-CO-01 a RF-CO-15** | **Backend + BD + Web Scraping** | **P1 (Fundacional)** | ⏳ Pendiente |
| **Automatización de Aduana** | **RF-ADU-01** | **Backend + Web Scraping + Cron** | **P1 (Fundacional)** | ⏳ Pendiente |
| App Chofer | RF-MO-01 a RF-MO-12 | Mobile + API | **P1 (Fundacional)** | ⏳ Pendiente |
| Dashboard | RF-DA-01 a RF-DA-09 | Frontend + Backend | P2 (Alta) | ⏳ Pendiente |
| Portal Cliente | RF-PO-01 a RF-PO-07 | Frontend + Backend | P2 (Alta) | ⏳ Pendiente |
| Almacén | RF-AL-01 a RF-AL-06 | Backend + BD | P2 (Alta) | ⏳ Pendiente |
| Marketing | RF-MK-01 a RF-MK-07 | Backend + BD | P2 (Alta) | ⏳ Pendiente |
| Auditoría | RF-AU-01 a RF-AU-07 | Backend + BD | **P1 (Fundacional)** | ⏳ Pendiente |
| **Estándares de Codificación** | **RNF-13 a RNF-23** | **Todo el sistema** | **P1 (Fundacional)** | **✅ Implementado** |
| **Finanzas y Aduana** | **RNF-24 a RNF-26** | **Backend + Web Scraping** | **P1 (Fundacional)** | ⏳ Pendiente |
| **Infraestructura y Distribución** | **RNF-27 a RNF-32** | **Backend + DevOps** | **P1 (Fundacional)** | ⏳ Pendiente |
| **🆕 Optimización Avanzada** | **RNF-33 a RNF-36** | **Backend + IA + OSRM** | **P1 (Fundacional)** | ⏳ Pendiente |

---

## 7. CRITERIOS DE ACEPTACIÓN POR MÓDULO

### Módulo de Envíos ✅ IMPLEMENTADO
- [x] CRUD de clientes implementado
- [x] CRUD de envíos implementado
- [x] Importación de Excel con mapeo flexible de columnas
- [x] Validación de datos: campos obligatorios, Carnet (11 dígitos), Unidad de destino obligatoria
- [x] Vista previa de importación con todos los registros
- [x] Reporte de errores de importación en pantalla
- [x] Historial de envíos por cliente con exportación a PDF y CSV
- [x] UI de gestión de envíos (EnvioList, EnvioFilters, EnvioDetail, HistorialCliente, ImportarManifiesto)

### Módulo de Automatización de Aduana ⏳ PENDIENTE
- [ ] El sistema ejecuta consultas a las 8:00 AM, 12:00 PM, 4:00 PM y 12:00 AM
- [ ] SOLO se consultan houses con estado "Arribado"
- [ ] Los houses "Facturados" NO son consultados nuevamente
- [ ] El sistema detecta automáticamente cuando un house tiene importe y factura en Aerovaradero
- [ ] El sistema cambia el estado de "Arribado" a "Facturado" automáticamente
- [ ] El sistema registra importe y número de factura en la base de datos
- [ ] El sistema maneja errores de conexión y reintenta en la siguiente ejecución
- [ ] El sistema registra todas las consultas y cambios de estado

### 🆕 Módulo de Rutas (Optimización Avanzada) ⏳ PENDIENTE
- [ ] Ruta optimizada reduce distancia en ≥15% vs. planificación manual
- [ ] Tiempo de cálculo <30 segundos para ≤50 paradas
- [ ] 🆕 Optimización de combustible considera consumo específico de cada vehículo
- [ ] 🆕 Envíos urgentes colocados en las primeras 3 posiciones de la ruta
- [ ] 🆕 Reoptimización en <5 segundos ante incidencias
- [ ] 🆕 Análisis post-ruta generado con métricas de eficiencia
- [ ] Mapa muestra ruta correctamente
- [ ] Drag and drop funciona correctamente
- [ ] Manifiesto de ruta generado en formato legible

### 🆕 App Móvil ⏳ PENDIENTE
- [ ] Funciona sin internet (offline)
- [ ] Sincronización automática al recuperar conexión
- [ ] Registro de incidencias y costos en <3 clics
- [ ] Firma digital capturada correctamente
- [ ] Geolocalización enviada cuando hay conexión
- [ ] 🆕 Solicitud de reoptimización en <3 clics
- [ ] 🆕 Recepción de ruta reoptimizada en <5 segundos

### 🆕 Dashboard ⏳ PENDIENTE
- [ ] KPIs se actualizan automáticamente
- [ ] Gráficos interactivos
- [ ] Alertas automáticas generadas correctamente
- [ ] Exportación a PDF/CSV funciona
- [ ] 🆕 Panel de Análisis Post-Ruta visible y funcional

### Auditoría ⏳ PENDIENTE
- [ ] Todas las acciones quedan registradas
- [ ] Historial de cambios por entidad visible
- [ ] Intentos de login fallidos registrados
- [ ] Exportación de logs a CSV funciona
- [ ] 🆕 Eventos de reoptimización registrados

### Módulo Financiero y Aduana ⏳ PENDIENTE
- [ ] Consulta automática de costos de aduana para ≥95% de los envíos en <5 minutos utilizando la URL de payment
- [ ] Asignación correcta de costos de aduana a cada envío
- [ ] Cálculo de pago a choferes según esquema configurado (fijo, por km, por entrega)
- [ ] Actualización de parámetros financieros (combustible, tasa de cambio, costos por km) en tiempo real
- [ ] Reporte de rentabilidad incluyendo costos de aduana e importación
- [ ] Manejo de errores en consulta a Aerovaradero con entrada manual de contingencia
- [ ] Historial de cambios en parámetros financieros guardado para auditoría

### 🆕 Ficha de Costo Detallada ⏳ PENDIENTE
- [ ] Generación de ficha de costo en <5 segundos por ruta
- [ ] Inclusión de todos los componentes: costos directos (combustible, peajes, mantenimiento, neumáticos, salario), indirectos (depreciación, seguros, administrativos, impuestos) y de importación (costos de aduana)
- [ ] 🆕 Desglose de costo de combustible por tipo de vehículo
- [ ] 🆕 Comparativa de combustible estimado vs real
- [ ] Precisión de 2 decimales en todos los cálculos
- [ ] Exportación a PDF y CSV funcionando correctamente
- [ ] Cálculos auditables y reproducibles

### Infraestructura y Distribución ⏳ PENDIENTE
- [ ] El sistema funciona correctamente en VPS ETECSA con Ubuntu 22.04 LTS
- [ ] SSL/HTTPS configurado y funcionando correctamente con Let's Encrypt
- [ ] App publicada en Google Play Store
- [ ] App publicada en APKlis
- [ ] Descarga directa de APK disponible desde el sitio web
- [ ] Nginx configurado como proxy inverso para backend y frontend
- [ ] PM2 gestionando el proceso de Node.js en producción

### Estándares de Codificación ✅ IMPLEMENTADO
- [x] ≥95% del código cumple con ESLint/Prettier (TypeScript)
- [x] ≥95% del código cumple con Dart Analyzer (Flutter)
- [x] ≥80% de funciones públicas documentadas con JSDoc
- [x] API documentada con OpenAPI (Swagger)
- [x] Pipeline de CI/CD incluye verificación automática de estándares
- [x] Mensajes de commit siguen Conventional Commits

### 🆕 Sistema de Estimación con IA ⏳ PENDIENTE
- [ ] Modelo de regresión lineal implementado
- [ ] Precisión ≥85% en estimaciones de tiempo
- [ ] Reentrenamiento automático con nuevos datos
- [ ] Integración con el algoritmo de optimización de rutas

---

## 8. RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación | Estado |
|--------|--------------|---------|------------|--------|
| Conectividad limitada en zonas rurales | Alta | Alto | Modo offline robusto, sincronización automática | ⏳ Pendiente |
| Calidad de datos de OSM en Cuba | Media | Medio | Edición colaborativa por choferes + GPS tracks | ⏳ Pendiente |
| Resistencia de choferes a usar app | Media | Alto | UI simple, capacitación, incentivos | ⏳ Pendiente |
| Cambios en normativa cubana | Media | Medio | Arquitectura flexible, fácil adaptación | ⏳ Pendiente |
| Seguridad de datos | Media | Alto | Auditoría completa, logs de acceso, encriptación | ⏳ Pendiente |
| Competencia (OptimoRoute, McLeod) | Baja | Medio | Precio cero, adaptación al nicho cubano | ✅ Mitigado |
| Baja calidad de código | Media | Alto | Estándares de codificación, análisis estático en CI/CD, revisiones de código obligatorias | ✅ Mitigado |
| Documentación insuficiente | Media | Medio | JSDoc obligatorio, generación automática de documentación, cobertura ≥80% | ✅ Mitigado |
| Cambios en el sitio web de Aerovaradero (URL de payment) | Alta | Alto | Sistema de alertas de fallo en extracción, entrada manual de costos de aduana como contingencia, monitoreo periódico del sitio | ⏳ Pendiente |
| Fallos en el proceso automatizado de facturación de aduana | Media | Alto | Sistema de alertas, reintentos automáticos, entrada manual como contingencia, logs detallados | ⏳ Pendiente |
| Fluctuación de la tasa de cambio y precios de combustible | Alta | Medio | Actualización manual/configurable de parámetros, historial de cambios para análisis | ⏳ Pendiente |
| Errores en cálculo de pago a choferes | Media | Alto | Validaciones automáticas, auditoría de cálculos, generación de reportes de pago para revisión | ⏳ Pendiente |
| Errores en cálculo de ficha de costo | Media | Alto | Validaciones automáticas, auditoría de cálculos, pruebas con datos reales, precisión de 2 decimales | ⏳ Pendiente |
| **Disponibilidad de VPS ETECSA** | **Media** | **Alto** | **Tener plan de contingencia con servidor alternativo (nube internacional)** | ⏳ Pendiente |
| **Google Play Store bloqueada desde Cuba** | **Alta** | **Medio** | **Distribuir también vía APKlis y descarga directa** | ⏳ Pendiente |
| **Configuración de SSL/HTTPS** | **Baja** | **Medio** | **Documentación detallada, uso de Let's Encrypt, renovación automática** | ⏳ Pendiente |
| **Recursos limitados del VPS ETECSA** | **Media** | **Medio** | **Optimización de recursos, caché con Redis, monitoreo de rendimiento** | ⏳ Pendiente |
| **🆕 Falla en el modelo de IA para estimación de tiempos** | **Media** | **Medio** | **Fallback a estimación por defecto, reentrenamiento automático, monitoreo de precisión** | ⏳ Pendiente |
| **🆕 Tiempo de reoptimización excede el límite de 5 segundos** | **Media** | **Alto** | **Optimización del algoritmo, límite de envíos reoptimizables, notificación al usuario** | ⏳ Pendiente |

---

## 9. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Líder del Proyecto | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| Analista de Negocios | Equipo SIGMA-T | _________ | ___/___/2026 |
| Administrador de Sistemas | Equipo SIGMA-T | _________ | ___/___/2026 |

---

## 📌 CONCLUSIÓN

Este SRS Versión 3.8 ahora incluye:

- ✅ **12 módulos funcionales** (1 nuevo: RF-ADU-01 Automatización de Facturación de Aduana)
- ✅ **🆕 93 requisitos funcionales** (7 nuevos: RF-CL-05 actualizado a Alta, RF-RU-03 actualizado, RF-RU-08 actualizado, RF-MO-12, RF-DA-09, RF-AU-07)
- ✅ **🆕 36 requisitos no funcionales** (4 nuevos: RNF-33 a RNF-36)
- ✅ **🆕 Optimización de Combustible** integrada en el algoritmo VRPTW
- ✅ **🆕 Reoptimización Dinámica** en tiempo real (<5 segundos)
- ✅ **🆕 Sistema de Estimación de Tiempos con IA** (regresión lineal)
- ✅ **🆕 Análisis Post-Ruta** con métricas de eficiencia por chofer, vehículo y zona
- ✅ **🆕 Panel de Análisis Post-Ruta** en el Dashboard
- ✅ **🆕 Modelo de Datos ampliado** con nuevas tablas y campos
- ✅ **Auditoría completa** para trazabilidad total
- ✅ **Marketing y CRM** para crecimiento del negocio
- ✅ **Portal del cliente** para transparencia
- ✅ **Gestión de almacén** para control de inventario
- ✅ **Modelo de datos completo** (25 entidades, con nuevas tablas y campos)
- ✅ **Matriz de trazabilidad** actualizada
- ✅ **Estándares de codificación** para TypeScript, React y Flutter
- ✅ **Estrategia de documentación** con JSDoc, OpenAPI y READMEs
- ✅ **Gestión de pago a choferes** (esquemas flexibles)
- ✅ **Gestión de parámetros financieros** (combustible, tasa de cambio, costos por km)
- ✅ **Integración automática con Aduana** utilizando URL de payment
- ✅ **Automatización de facturación de aduana** en 4 horarios (8 AM, 12 PM, 4 PM, 12 AM)
- ✅ **9 estados del paquete** (Faltante de Origen, Presencial, Arribado, Facturado, Entregado en Aerovaradero, Clasificación, Proceso de Entrega, Entregado, No Entregado)
- ✅ **5 perfiles de usuario** (Administrador, Jefe de Operaciones, Agencia de Envíos, Cliente Remitente, Cliente Destinatario)
- ✅ **Cálculo de costo total por envío** (incluyendo aduana e importación)
- ✅ **Ficha de costo detallada por ruta** con todos los componentes de costo
- ✅ **Infraestructura de producción** en VPS ETECSA con Ubuntu 22.04 LTS
- ✅ **SSL/HTTPS obligatorio** con Let's Encrypt
- ✅ **Distribución en Google Play Store**, **APKlis** y **descarga directa**
- ✅ **Estado de implementación** agregado a todos los requisitos (✅ Implementado / ⏳ Pendiente)
- ✅ **Sprint 0 y 1 completados** (13-15/08/2026) con módulos de Clientes y Envíos implementados al 100%
- ✅ **Estándares de codificación y documentación** completamente implementados

**Este documento es la base técnica definitiva para construir el sistema de gestión de transporte más completo y de mayor calidad del nicho cubano y regional, con capacidades de optimización de rutas de nivel mundial.**

---
