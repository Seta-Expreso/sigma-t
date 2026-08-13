## 📄 ESPECIFICACIÓN DE REQUISITOS DEL SOFTWARE (SRS) - VERSIÓN 3.3 (COMPLETA - TOP MUNDIAL CON FINANZAS, ADUANA, FICHA DE COSTO E INFRAESTRUCTURA)

**Basado en ISO/IEC/IEEE 29148:2018**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 13 de agosto de 2026  
**Versión:** 3.3 (Completa - Top Mundial con Finanzas, Aduana, Ficha de Costo e Infraestructura)

---

### 1. INTRODUCCIÓN Y ALCANCE

#### 1.1 Propósito
Este documento especifica todos los requisitos funcionales y no funcionales del sistema SIGMA-T, una plataforma integral para la gestión de una MiPYME de transporte terrestre de carga y pasajeros en Cuba. El documento sirve como contrato técnico entre el Líder del Proyecto y el Equipo de Desarrollo, y como base para la validación, verificación y aceptación del sistema.

#### 1.2 Ámbito del Producto
SIGMA-T es un sistema modular de clase mundial que permite gestionar **todo el ciclo de vida de una operación de transporte**:

- **Venta y Marketing:** Captura de prospectos, cotizaciones, seguimiento de contactos, conversión a clientes.
- **Operaciones:** Gestión de flota, choferes, rutas, envíos, y almacén.
- **Control y Finanzas:** Libros contables, facturación, costos, KPIs, **ficha de costo detallada por ruta**.
- **Post-Venta:** Seguimiento de entregas, encuestas de satisfacción, casos de éxito.
- **Auditoría:** Trazabilidad total de todas las acciones del sistema.
- **Calidad de Código:** Estándares de codificación, documentación y mantenibilidad.
- **Gestión de Aduana:** Consulta automática de costos de importación utilizando la URL de payment de Aerovaradero, gestión de parámetros financieros y esquemas de pago a choferes.
- **Infraestructura:** Despliegue en VPS ETECSA, distribución en Google Play Store y APKlis, SSL/HTTPS obligatorio.

#### 1.3 Definiciones y Acrónimos

| Término | Definición |
|---------|------------|
| MiPYME | Micro, Pequeña y Mediana Empresa |
| SRS | Software Requirements Specification |
| KPI | Key Performance Indicator |
| MVP | Minimum Viable Product |
| SLA | Service Level Agreement |
| API | Application Programming Interface |
| VRPTW | Vehicle Routing Problem with Time Windows |
| TMS | Transportation Management System |
| AWB | Air Way Bill - Número de guía aérea (ej. 230-66684660) |
| JSDoc | Estándar de documentación para código JavaScript/TypeScript |
| OpenAPI | Especificación para documentación de APIs REST |
| CI/CD | Integración Continua / Despliegue Continuo |
| ESLint | Herramienta de análisis estático para JavaScript/TypeScript |
| CUP | Peso Cubano (moneda nacional de Cuba) |
| USD | Dólar Estadounidense |
| Ficha de Costo | Documento que desglosa todos los costos asociados a una operación de transporte (directos, indirectos y de importación) |
| VPS | Servidor Privado Virtual |
| ETECSA | Empresa de Telecomunicaciones de Cuba S.A. |
| APKlis | Tienda de aplicaciones cubana para Android |
| SSL | Secure Sockets Layer |
| HTTPS | Protocolo seguro de transferencia de hipertexto |

---

### 2. DESCRIPCIÓN GENERAL DEL SISTEMA

#### 2.1 Perspectiva del Producto
SIGMA-T reemplazará el sistema actual basado en hojas de cálculo Excel y OptimoRoute (software de pago). El sistema será una solución integral construida sobre tecnologías open source para eliminar costos de licencias recurrentes. El sistema será desplegado en un VPS de ETECSA para garantizar estabilidad y conectividad local en Cuba, y la aplicación móvil será distribuida a través de Google Play Store y APKlis.

#### 2.2 Perfiles de Usuario

| Perfil | Descripción | Cantidad Estimada |
|--------|-------------|-------------------|
| **Administrador / Líder** | Dueño/gerente que gestiona todo el negocio | 1-2 |
| **Dispatcher / Operador** | Planifica rutas, asigna envíos y gestiona flota | 1-3 |
| **Chofer** | Conductor que ejecuta entregas en ruta | 5-20 |
| **Cliente** | Empresa de paquetería que contrata servicios | 1 principal + eventuales |
| **Prospecto** | Potencial cliente en seguimiento | Variable |
| **Auditor** | Usuario con permisos de solo lectura para revisión | 1 |
| **Desarrollador** | Equipo técnico que mantiene y evoluciona el sistema | 3-5 |
| **Administrador de Sistemas** | Personal encargado de la instalación y mantenimiento del servidor | 1 |

#### 2.3 Restricciones Técnicas
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

---

### 3. REQUISITOS FUNCIONALES (RF) POR MÓDULO

#### MÓDULO 1: ADMINISTRACIÓN DE FLOTA (RF-FLOTA)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-FL-01 | Registrar vehículo con: matrícula, marca, modelo, año, capacidad (kg/m³/pasajeros), tipo de combustible, consumo promedio | Alta | Baja |
| RF-FL-02 | Registrar mantenimientos: fecha, tipo (preventivo/correctivo), costo, taller, próximo mantenimiento (km o fecha) | Alta | Media |
| RF-FL-03 | Asignar vehículo a chofer en turno | Alta | Baja |
| RF-FL-04 | Registrar historial de kilómetros recorridos por vehículo | Alta | Media |
| RF-FL-05 | Calcular depreciación del vehículo (método lineal) | Media | Baja |
| RF-FL-06 | Registrar consumo real de combustible vs. esperado | Alta | Media |
| RF-FL-07 | Alertas automáticas de mantenimiento (basadas en km o tiempo) | Alta | Media |
| RF-FL-08 | Reporte de costos acumulados por vehículo (mantenimiento + combustible) | Alta | Media |

**Especificaciones Detalladas:**
- **RF-FL-01:** El sistema debe permitir registrar vehículos con todos los campos requeridos. La matrícula debe ser única. La capacidad debe registrarse en kg, m³ y/o número de pasajeros según el tipo de vehículo.
- **RF-FL-02:** El sistema debe permitir registrar mantenimientos programados y no programados. Debe calcular automáticamente el próximo mantenimiento basado en el kilometraje actual y el intervalo definido.
- **RF-FL-03:** El sistema debe permitir asignar un vehículo disponible a un chofer para un turno específico.
- **RF-FL-04:** El sistema debe registrar el kilometraje total por vehículo, actualizándose automáticamente al completar rutas o manualmente.
- **RF-FL-05:** El sistema debe calcular la depreciación mensual/anual del vehículo usando el método lineal.
- **RF-FL-06:** El sistema debe permitir comparar el consumo real de combustible vs. el consumo esperado según las especificaciones del fabricante.
- **RF-FL-07:** El sistema debe generar alertas automáticas cuando un vehículo alcance el kilometraje o la fecha de próximo mantenimiento.
- **RF-FL-08:** El sistema debe generar reportes de costos acumulados por vehículo, incluyendo mantenimiento y combustible.

#### MÓDULO 2: GESTIÓN DE CHOFERES (RF-CHOFER)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-CH-01 | Registrar chofer con: nombre, identificación, licencia (tipo, vigencia), contacto, fecha de ingreso | Alta | Baja |
| RF-CH-02 | Registrar disponibilidad/horario del chofer (turnos) | Alta | Baja |
| RF-CH-03 | Calcular salario (base + bonos por entregas) | Alta | Media |
| RF-CH-04 | Registrar incidencias durante ruta (accidentes, averías, retrasos) | Alta | Baja |
| RF-CH-05 | Evaluar desempeño (% entregas a tiempo, consumo) | Media | Media |
| RF-CH-06 | Historial completo de rutas y entregas por chofer | Alta | Media |

**Especificaciones Detalladas:**
- **RF-CH-01:** El sistema debe permitir registrar choferes con todos los campos requeridos. La identificación debe ser única. La licencia debe tener fecha de vigencia.
- **RF-CH-02:** El sistema debe permitir registrar la disponibilidad de los choferes por día y turno.
- **RF-CH-03:** El sistema debe calcular el salario del chofer basado en la configuración de esquema de pago (ver RF-CO-11).
- **RF-CH-04:** El sistema debe permitir registrar incidencias durante la ruta (accidentes, averías, retrasos).
- **RF-CH-05:** El sistema debe evaluar el desempeño del chofer basado en % de entregas a tiempo y consumo de combustible.
- **RF-CH-06:** El sistema debe mantener un historial completo de todas las rutas y entregas realizadas por cada chofer.

#### MÓDULO 3: GESTIÓN DE CLIENTES Y ENVÍOS (RF-CLIENTE)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-CL-01a | Importar envíos desde Excel (.xlsx) con formato de manifiesto real | **Crítica** | Media |
| RF-CL-01b | Importar envíos desde CSV (formato alternativo) | Alta | Baja |
| RF-CL-01c | Validación de datos al importar (pesos negativos, campos vacíos) | Alta | Media |
| RF-CL-01d | Vista previa de importación (primeros 10 registros) | Alta | Media |
| RF-CL-01e | Reporte de errores de importación | Alta | Media |
| RF-CL-02 | Registrar cliente (empresa de paquetería) con: nombre, contacto, dirección, tarifas negociadas | Alta | Baja |
| RF-CL-03 | Registrar envío manual uno a uno con todos los campos del manifiesto | Alta | Baja |
| RF-CL-04 | Historial de envíos por cliente | Alta | Baja |
| RF-CL-05 | Categorizar envíos por prioridad (urgente, normal, económico) | Media | Baja |
| RF-CL-06 | Registrar novedades de entrega (entregado, no encontrado, dañado, etc.) | Alta | Baja |

**Especificaciones Detalladas:**
- **RF-CL-01a:** El sistema debe importar envíos desde archivos Excel (.xlsx) con el formato exacto del manifiesto proporcionado por el cliente. Debe mapear las columnas: House, Naturaleza y Cantidad, Peso, Bultos, Remitente, Passport, Destinatario, Carnet de Identidad, Teléfono, Dirección, Cobrado/No Cobrado, Unidad de destino.
- **RF-CL-01b:** El sistema debe soportar importación desde CSV con estructura similar.
- **RF-CL-01c:** El sistema debe validar los datos importados: pesos >0, bultos >0, campos obligatorios no vacíos, formatos correctos.
- **RF-CL-01d:** El sistema debe mostrar una vista previa de los primeros 10 registros antes de confirmar la importación.
- **RF-CL-01e:** El sistema debe generar un reporte de errores indicando las filas con problemas y la causa.
- **RF-CL-02:** El sistema debe permitir registrar clientes con todos los campos requeridos.
- **RF-CL-03:** El sistema debe permitir registrar envíos manualmente, uno a uno, con todos los campos del manifiesto.
- **RF-CL-04:** El sistema debe mantener un historial completo de todos los envíos por cliente.
- **RF-CL-05:** El sistema debe permitir categorizar envíos por prioridad (urgente, normal, económico).
- **RF-CL-06:** El sistema debe permitir registrar novedades de entrega: entregado, no encontrado, dañado, etc.

#### MÓDULO 4: PLANIFICACIÓN Y OPTIMIZACIÓN DE RUTAS (RF-RUTA)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-RU-00a | Planificación semanal por defecto (lunes a domingo) | Alta | Baja |
| RF-RU-00b | Visualización de carga semanal (cantidad, peso, volumen) | Alta | Baja |
| RF-RU-00c | Replanificación manual (mover envíos entre semanas) | Alta | Media |
| RF-RU-01 | Agrupar envíos por zona geográfica (agrupamiento automático) | Alta | Media |
| RF-RU-02 | Asignar envíos a vehículos según capacidad | Alta | Media |
| RF-RU-03 | Calcular ruta óptima secuencial usando algoritmo VRPTW | **Crítica** | **Alta** |
| RF-RU-04 | Visualizar ruta en mapa (OpenStreetMap) | Alta | Media |
| RF-RU-05 | Estimar tiempo total de ruta y tiempo de llegada por parada | Alta | Media |
| RF-RU-06 | Permitir ajuste manual de ruta (drag and drop) | Alta | Media |
| RF-RU-07 | Generar manifiesto de ruta para chofer (orden de entregas) | Alta | Baja |
| RF-RU-08 | Reoptimizar ruta ante incidencias (falla de vehículo, nuevo pedido urgente) | Media | Alta |

**Especificaciones Detalladas:**
- **RF-RU-00a:** El sistema debe planificar rutas por defecto de lunes a domingo.
- **RF-RU-00b:** El sistema debe mostrar la carga semanal en términos de cantidad de envíos, peso total y volumen total.
- **RF-RU-00c:** El sistema debe permitir mover envíos entre semanas manualmente.
- **RF-RU-01:** El sistema debe agrupar automáticamente envíos por zona geográfica para optimizar rutas.
- **RF-RU-02:** El sistema debe asignar envíos a vehículos según su capacidad de peso y volumen.
- **RF-RU-03:** El sistema debe calcular la ruta óptima secuencial usando un algoritmo VRPTW (Vehicle Routing Problem with Time Windows), considerando capacidad de vehículos, ventanas de tiempo y restricciones de choferes.
- **RF-RU-04:** El sistema debe visualizar la ruta en un mapa interactivo usando OpenStreetMap.
- **RF-RU-05:** El sistema debe estimar el tiempo total de ruta y el tiempo de llegada por parada.
- **RF-RU-06:** El sistema debe permitir ajuste manual de la ruta mediante drag and drop de paradas.
- **RF-RU-07:** El sistema debe generar un manifiesto de ruta para el chofer con el orden de entregas.
- **RF-RU-08:** El sistema debe reoptimizar la ruta ante incidencias (falla de vehículo, nuevo pedido urgente).

#### MÓDULO 5: COSTOS Y FINANZAS (RF-COSTO)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-CO-01 | Definir fichas de costo por ruta/tipo de vehículo | **Crítica** | Media |
| RF-CO-02 | Registrar costos fijos mensuales (salarios, seguros, impuestos, depreciación) | Alta | Baja |
| RF-CO-03 | Registrar costos variables por viaje (combustible, peajes, mantenimiento) | Alta | Baja |
| RF-CO-04 | Calcular costo por kilómetro en tiempo real | **Crítica** | Media |
| RF-CO-05 | Calcular costo real de cada envío | Alta | Media |
| RF-CO-06 | Calcular utilidad neta por viaje (ingreso - costo total) | **Crítica** | Media |
| RF-CO-07 | Generar reporte de rentabilidad por cliente, ruta, vehículo y chofer | Alta | Media |
| RF-CO-08 | Comparar costo estimado vs. costo real | Alta | Media |
| RF-CO-09 | Libro de ingresos y gastos (contabilidad básica) | Alta | Media |
| RF-CO-10 | Generar facturas y gestionar cobros | Alta | Media |
| **RF-CO-11** | **Gestión de Esquemas de Pago a Choferes** | **Alta** | **Media** |
| **RF-CO-12** | **Gestión de Parámetros de Costos Variables** | **Alta** | **Baja** |
| **RF-CO-13** | **Consulta Automática de Costos de Aduana** | **Crítica** | **Alta** |
| **RF-CO-14** | **Módulo de Costos de Aduana y Gastos de Importación** | **Crítica** | **Alta** |
| **RF-CO-15** | **Ficha de Costo Detallada por Ruta** | **Crítica** | **Alta** |

**Especificaciones Detalladas:**

- **RF-CO-01:** El sistema debe permitir definir fichas de costo detalladas por ruta y tipo de vehículo, incluyendo todos los componentes de costo.
- **RF-CO-02:** El sistema debe permitir registrar costos fijos mensuales como salarios, seguros, impuestos y depreciación.
- **RF-CO-03:** El sistema debe permitir registrar costos variables por viaje como combustible, peajes y mantenimiento.
- **RF-CO-04:** El sistema debe calcular el costo por kilómetro en tiempo real considerando todos los costos fijos y variables.
- **RF-CO-05:** El sistema debe calcular el costo real de cada envío individual.
- **RF-CO-06:** El sistema debe calcular la utilidad neta por viaje (ingresos - costos totales).
- **RF-CO-07:** El sistema debe generar reportes de rentabilidad por cliente, ruta, vehículo y chofer.
- **RF-CO-08:** El sistema debe comparar el costo estimado vs. el costo real de cada operación.
- **RF-CO-09:** El sistema debe mantener un libro de ingresos y gastos para contabilidad básica.
- **RF-CO-10:** El sistema debe permitir generar facturas y gestionar cobros.

- **RF-CO-11 - Gestión de Esquemas de Pago a Choferes:** El sistema debe permitir configurar diferentes esquemas de pago para los choferes, incluyendo: Salario Fijo (monto mensual base), Pago por Kilómetro (monto por km recorrido), Pago por Entrega (monto por entrega completada), Esquema Combinado (base + bonos + incentivos). El sistema debe calcular automáticamente el monto a pagar basado en los datos de la ruta (km, número de entregas, eficiencia, etc.) y generar reportes de pago detallados. Debe permitir asignar diferentes esquemas a diferentes choferes según su rol, antigüedad o desempeño.

- **RF-CO-12 - Gestión de Parámetros de Costos Variables:** El sistema debe permitir configurar y actualizar en tiempo real los siguientes parámetros: Precio de la Gasolina (CUP/L), Precio del Diesel (CUP/L), Tasa de Cambio USD → CUP, Costo Fijo por Importación (USD/paquete), **Costo de Mantenimiento por Kilómetro (CUP/km), Costo de Neumáticos por Kilómetro (CUP/km), Costo de Depreciación por Kilómetro (CUP/km), Costo de Seguro por Kilómetro (CUP/km), Costo Administrativo por Kilómetro (CUP/km), Costo de Impuestos por Kilómetro (CUP/km)**. Debe mantener un historial de cambios para auditoría y análisis de tendencias. Estos parámetros deben ser utilizados automáticamente en todos los cálculos de costos y rentabilidad, incluyendo la ficha de costo detallada.

- **RF-CO-13 - Consulta Automática de Costos de Aduana:** El sistema debe ser capaz de consultar automáticamente el sitio web de Aerovaradero para obtener el costo de aduana de cada envío. La URL de consulta debe ser: `https://www.aerovaradero.com.cu/payment/?cod_la={cod_la}&cod_awb={cod_awb}&cod_house={house}`, donde `cod_la` son los primeros 3 dígitos del AWB, `cod_awb` son los últimos 8 dígitos del AWB, y `house` es el número de House. Para cada par Air Way Bill (AWB) y House, el sistema debe extraer el costo de aduana, el estado del pago y la información del envío, y actualizar el registro del envío en la base de datos. El proceso debe ser masivo, permitiendo consultar todos los envíos de un manifiesto completo. Debe manejar errores de conexión, timeouts, cambios en la estructura del sitio web y formatos de respuesta inesperados. Debe registrar un log detallado de cada consulta para auditoría y depuración. Debe permitir la entrada manual del costo de aduana como contingencia en caso de fallo.

- **RF-CO-14 - Módulo de Costos de Aduana y Gastos de Importación:** El sistema debe permitir que el costo de aduana obtenido (RF-CO-13) se asigne automáticamente a cada envío. Debe permitir también registrar otros costos de importación como flete internacional, seguro, manejo en puerto, etc. Estos costos deben ser considerados en el cálculo del costo total del envío y en la ficha de costo de la ruta. El sistema debe mostrar desglosado el costo de aduana en el detalle del envío y en los reportes de rentabilidad. Debe permitir generar reportes específicos de costos de importación por envío, por cliente y por período.

- **RF-CO-15 - Ficha de Costo Detallada por Ruta:** El sistema debe generar una ficha de costo detallada para cada ruta, desglosando todos los costos directos (combustible, peajes, mantenimiento, neumáticos, salario del chofer), costos indirectos (depreciación, seguros, gastos administrativos, impuestos) y costos de importación (costos de aduana). La ficha debe calcularse automáticamente a partir de los parámetros del sistema (RF-CO-12), los datos del vehículo (consumo, tipo de combustible) y los costos de aduana consultados en Aerovaradero (RF-CO-13). Debe mostrar el subtotal por categoría, el costo total del viaje, los ingresos, la utilidad neta y el margen de utilidad. Debe permitir exportar la ficha de costo a PDF y CSV. El cálculo debe realizarse en menos de 5 segundos con una precisión de 2 decimales.

#### MÓDULO 6: APP PARA CHOFERES (RF-MOBILE)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-MO-01 | Autenticación del chofer (login offline) | Alta | Baja |
| RF-MO-02 | Ver ruta asignada del día (lista de entregas ordenadas) | Alta | Baja |
| RF-MO-03 | Visualizar mapa con ruta y paradas | Alta | Media |
| RF-MO-04 | Registrar inicio y fin de cada entrega (timestamp) | Alta | Baja |
| RF-MO-05 | Registrar incidencias por entrega (no encontrado, dañado, etc.) | Alta | Baja |
| RF-MO-06 | Registrar costos reales (combustible cargado, peajes pagados) | Alta | Baja |
| RF-MO-07 | Capturar firma digital del cliente al recibir | Media | Media |
| RF-MO-08 | Geolocalización en tiempo real (tracking) | Media | Media |
| RF-MO-09 | Funcionar sin internet (modo offline) con sincronización automática | **Crítica** | **Alta** |
| RF-MO-10 | Notificar llegada a destino (push notification al admin) | Baja | Media |
| RF-MO-11 | Visualizar historial de entregas propias | Media | Baja |

**Especificaciones Detalladas:**
- **RF-MO-01:** La app debe permitir autenticación del chofer sin conexión a internet, usando credenciales almacenadas localmente.
- **RF-MO-02:** La app debe mostrar la ruta asignada del día con la lista de entregas en orden secuencial.
- **RF-MO-03:** La app debe visualizar la ruta y las paradas en un mapa interactivo.
- **RF-MO-04:** La app debe registrar el inicio y fin de cada entrega con timestamp.
- **RF-MO-05:** La app debe permitir registrar incidencias por entrega (no encontrado, dañado, etc.).
- **RF-MO-06:** La app debe permitir registrar costos reales como combustible cargado y peajes pagados.
- **RF-MO-07:** La app debe capturar la firma digital del cliente al recibir el paquete.
- **RF-MO-08:** La app debe enviar geolocalización en tiempo real cuando haya conexión.
- **RF-MO-09:** La app debe funcionar completamente sin internet, almacenando datos en SQLite local y sincronizando automáticamente al recuperar conexión.
- **RF-MO-10:** La app debe notificar al admin cuando el chofer llegue a destino.
- **RF-MO-11:** La app debe mostrar el historial de entregas propias del chofer.

#### MÓDULO 7: DASHBOARD Y REPORTES (RF-DASH)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-DA-01 | Dashboard principal con KPIs: costo/km, % entregas a tiempo, utilidad neta por viaje | **Crítica** | Media |
| RF-DA-02 | Gráfico de rentabilidad por ruta | Alta | Media |
| RF-DA-03 | Gráfico de evolución de costos (mensual) | Alta | Media |
| RF-DA-04 | Reporte de desempeño de choferes | Alta | Media |
| RF-DA-05 | Reporte de estado de la flota (vehículos en ruta, en taller, disponibles) | Alta | Media |
| RF-DA-06 | Exportar reportes a CSV/PDF | Media | Baja |
| RF-DA-07 | Alertas automáticas (mantenimiento vencido, consumo anómalo) | Media | Media |
| RF-DA-08 | Mapa de calor de entregas por zona | Media | Media |

**Especificaciones Detalladas:**
- **RF-DA-01:** El dashboard principal debe mostrar KPIs clave: costo por kilómetro, porcentaje de entregas a tiempo, utilidad neta por viaje.
- **RF-DA-02:** El sistema debe mostrar gráficos de rentabilidad por ruta.
- **RF-DA-03:** El sistema debe mostrar gráficos de evolución de costos mensuales.
- **RF-DA-04:** El sistema debe generar reportes de desempeño de choferes.
- **RF-DA-05:** El sistema debe mostrar el estado de la flota (vehículos en ruta, en taller, disponibles).
- **RF-DA-06:** El sistema debe permitir exportar reportes a CSV/PDF.
- **RF-DA-07:** El sistema debe generar alertas automáticas por mantenimiento vencido o consumo anómalo.
- **RF-DA-08:** El sistema debe mostrar un mapa de calor de entregas por zona.

#### MÓDULO 8: PORTAL DEL CLIENTE (RF-PORTAL)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-PO-01 | Login para clientes (empresas de paquetería) | Alta | Media |
| RF-PO-02 | Visualizar todos los envíos de la empresa con estado actualizado | Alta | Media |
| RF-PO-03 | Buscar envío por número de House | Alta | Baja |
| RF-PO-04 | Ver ubicación en tiempo real del vehículo en ruta | Alta | Media |
| RF-PO-05 | Recibir notificaciones de cambio de estado (email/push) | Media | Media |
| RF-PO-06 | Descargar comprobante de entrega (PDF con firma) | Alta | Media |
| RF-PO-07 | Estadísticas de envíos (entregados, pendientes, incidencias) | Media | Media |

**Especificaciones Detalladas:**
- **RF-PO-01:** El portal debe permitir login para clientes (empresas de paquetería) con credenciales seguras.
- **RF-PO-02:** El portal debe mostrar todos los envíos de la empresa con estado actualizado.
- **RF-PO-03:** El portal debe permitir buscar envío por número de House.
- **RF-PO-04:** El portal debe mostrar la ubicación en tiempo real del vehículo en ruta.
- **RF-PO-05:** El portal debe enviar notificaciones de cambio de estado por email o push.
- **RF-PO-06:** El portal debe permitir descargar el comprobante de entrega (PDF con firma).
- **RF-PO-07:** El portal debe mostrar estadísticas de envíos (entregados, pendientes, incidencias).

#### MÓDULO 9: GESTIÓN DE ALMACÉN (RF-ALMACEN)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-AL-01 | Registrar entrada de paquetes a bodega | Alta | Baja |
| RF-AL-02 | Registrar salida de paquetes (asignación a ruta) | Alta | Baja |
| RF-AL-03 | Asignar ubicación física en bodega (rack/estante) | Media | Baja |
| RF-AL-04 | Visualizar mapa de bodega con ubicación de paquetes | Media | Media |
| RF-AL-05 | Buscar paquete por número de House | Alta | Baja |
| RF-AL-06 | Reporte de inventario (paquetes en bodega) | Alta | Baja |

**Especificaciones Detalladas:**
- **RF-AL-01:** El sistema debe registrar la entrada de paquetes a la bodega.
- **RF-AL-02:** El sistema debe registrar la salida de paquetes (asignación a ruta).
- **RF-AL-03:** El sistema debe asignar ubicación física en bodega (rack/estante).
- **RF-AL-04:** El sistema debe visualizar un mapa de bodega con ubicación de paquetes.
- **RF-AL-05:** El sistema debe permitir buscar paquete por número de House.
- **RF-AL-06:** El sistema debe generar reporte de inventario de paquetes en bodega.

#### MÓDULO 10: GESTIÓN DE PROSPECTOS Y MARKETING (RF-MARKETING)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-MK-01 | Registrar prospecto con: empresa, contacto, teléfono, email, fuente | Alta | Baja |
| RF-MK-02 | Registrar seguimiento de contactos (llamadas, reuniones) | Alta | Baja |
| RF-MK-03 | Generar cotizaciones para prospectos | Alta | Media |
| RF-MK-04 | Convertir prospecto en cliente activo | Alta | Baja |
| RF-MK-05 | Enviar encuestas de satisfacción a clientes | Media | Media |
| RF-MK-06 | Documentar casos de éxito con testimonios | Media | Baja |
| RF-MK-07 | Dashboard de ventas (prospectos, cotizaciones, conversiones) | Alta | Media |

**Especificaciones Detalladas:**
- **RF-MK-01:** El sistema debe registrar prospectos con todos los campos requeridos.
- **RF-MK-02:** El sistema debe registrar seguimiento de contactos (llamadas, reuniones).
- **RF-MK-03:** El sistema debe generar cotizaciones para prospectos.
- **RF-MK-04:** El sistema debe permitir convertir prospecto en cliente activo.
- **RF-MK-05:** El sistema debe enviar encuestas de satisfacción a clientes.
- **RF-MK-06:** El sistema debe documentar casos de éxito con testimonios.
- **RF-MK-07:** El sistema debe mostrar un dashboard de ventas (prospectos, cotizaciones, conversiones).

#### MÓDULO 11: AUDITORÍA Y SEGURIDAD (RF-AUDIT)

| ID | Requisito | Prioridad | Complejidad |
|----|-----------|-----------|-------------|
| RF-AU-01 | Registrar todas las acciones de usuarios (log de auditoría) | **Crítica** | Media |
| RF-AU-02 | Registrar intentos de login fallidos | Alta | Baja |
| RF-AU-03 | Visualizar historial de cambios por entidad (envío, ruta, vehículo) | Alta | Media |
| RF-AU-04 | Exportar logs de auditoría a CSV | Media | Baja |
| RF-AU-05 | Alertas de seguridad (múltiples intentos fallidos, accesos sospechosos) | Media | Media |
| RF-AU-06 | Trazabilidad de acciones offline (registro local + sincronización) | Alta | Media |

**Especificaciones Detalladas:**
- **RF-AU-01:** El sistema debe registrar todas las acciones de usuarios en un log de auditoría.
- **RF-AU-02:** El sistema debe registrar todos los intentos de login fallidos.
- **RF-AU-03:** El sistema debe permitir visualizar el historial de cambios por entidad.
- **RF-AU-04:** El sistema debe permitir exportar logs de auditoría a CSV.
- **RF-AU-05:** El sistema debe generar alertas de seguridad por múltiples intentos fallidos o accesos sospechosos.
- **RF-AU-06:** El sistema debe mantener trazabilidad de acciones offline (registro local + sincronización).

---

### 4. REQUISITOS NO FUNCIONALES (RNF) - ACTUALIZADO CON INFRAESTRUCTURA

| ID | Requisito | Especificación | Prioridad |
|----|-----------|----------------|-----------|
| RNF-01 | Rendimiento | Dashboard cargue en <3 segundos; optimización de ruta en <30 segundos para ≤50 envíos | Alta |
| RNF-02 | Disponibilidad | 99.5% de uptime para sistema web | Alta |
| RNF-03 | Seguridad | Autenticación por usuario/rol; contraseñas hasheadas; HTTPS obligatorio | Alta |
| RNF-04 | Escalabilidad | Soporte para hasta 1,000 envíos/día y 50 choferes | Media |
| RNF-05 | Offline | App móvil funcional sin internet con sincronización automática | **Crítica** |
| RNF-06 | Usabilidad | Interfaz intuitiva; tiempo de entrenamiento <2 horas para choferes | Alta |
| RNF-07 | Mantenibilidad | Código documentado; arquitectura modular; open source | Alta |
| RNF-08 | Portabilidad | Web responsive; app Android e iOS (Flutter) | Media |
| RNF-09 | Conformidad | Cumplir con normativas cubanas de transporte y tributación | Alta |
| RNF-10 | Observabilidad | Logs de errores y auditoría de acciones críticas | Alta |
| RNF-11 | Auditoría | Trazabilidad completa de todas las acciones del sistema | **Crítica** |
| RNF-12 | Idioma | Interfaz completa en español (incluyendo mensajes de error) | Alta |
| RNF-13 | Estándares de Codificación (Backend) | Todo el código en TypeScript/Node.js debe cumplir con las reglas de ESLint y Prettier configuradas, y pasar el análisis estático en el pipeline de CI/CD | **Alta** |
| RNF-14 | Estándares de Codificación (Frontend) | Todo el código en React/TypeScript debe cumplir con las reglas de ESLint y Prettier configuradas, y pasar el análisis estático en el pipeline de CI/CD | **Alta** |
| RNF-15 | Estándares de Codificación (Mobile) | Todo el código en Flutter/Dart debe cumplir con las reglas del Dart Analyzer configuradas en `analysis_options.yaml` | **Alta** |
| RNF-16 | Documentación de Código | Toda función, clase, interfaz o componente público debe estar documentado con JSDoc (TypeScript) o comentarios de documentación (Dart) | **Alta** |
| RNF-17 | Documentación de API | La API REST debe estar documentada siguiendo el estándar OpenAPI (Swagger), con especificaciones de endpoints, parámetros y ejemplos | **Alta** |
| RNF-18 | Documentación de Módulos | Cada módulo o paquete del sistema debe contar con un archivo `README.md` que explique su propósito, instalación, configuración y uso | Media |
| RNF-19 | Pruebas de Estilo de Código | El pipeline de CI/CD debe ejecutar automáticamente las herramientas de análisis estático (ESLint, Dart Analyzer) y fallar si hay violaciones | **Alta** |
| RNF-20 | Generación Automática de Documentación | La documentación técnica del código (generada con TypeDoc, JSDoc) debe ser generada automáticamente en cada release o de forma periódica | Media |
| RNF-21 | Conventional Commits | Los mensajes de commit deben seguir el estándar Conventional Commits (`feat:`, `fix:`, `docs:`, etc.) para mantener un historial claro y permitir la generación automática de changelogs | Media |
| RNF-22 | Cobertura de Documentación | ≥80% de las funciones, clases e interfaces públicas deben tener documentación JSDoc/comentarios | Media |
| RNF-23 | Cobertura de Estándares | ≥95% de las líneas de código deben cumplir con los estándares de codificación definidos (ESLint, Prettier, Dart Analyzer) | **Alta** |
| RNF-24 | Precisión en Cálculo de Combustible | El sistema debe usar el precio del combustible configurado (RF-CO-12) para calcular el costo exacto por litro consumido en las rutas, permitiendo un seguimiento y reporte preciso de este gasto. | **Alta** |
| RNF-25 | Integración Robusta con Sitio de Aduana | La integración con el sitio de Aerovaradero (URL de payment) debe ser robusta ante cambios en la estructura del sitio web. Se debe implementar un sistema de alertas para notificar fallos en la extracción de datos y permitir la entrada manual del costo de aduana como contingencia. | **Alta** |
| RNF-26 | Precisión en Cálculo de Ficha de Costo | El sistema debe calcular la ficha de costo con una precisión de 2 decimales. Todos los costos deben calcularse en CUP utilizando la tasa de cambio configurada (RF-CO-12). Los cálculos deben ser auditables y reproducibles. El tiempo de generación de la ficha debe ser menor a 5 segundos por ruta. | **Alta** |
| **RNF-27** | **Alojamiento en VPS ETECSA (NUEVO)** | **El sistema debe ser desplegable en un VPS de ETECSA con Ubuntu 22.04 LTS o 24.04 LTS, y debe funcionar correctamente con los recursos mínimos (2 GB RAM, 50 GB disco).** | **Alta** |
| **RNF-28** | **Distribución en Google Play Store (NUEVO)** | **La app móvil debe cumplir con las políticas de Google Play Store y estar publicada en la tienda. La publicación debe realizarse en un plazo máximo de 30 días después del lanzamiento de la versión 1.0.** | **Alta** |
| **RNF-29** | **Distribución en APKlis (NUEVO)** | **La app móvil debe estar disponible en APKlis, la tienda de aplicaciones cubana, en el momento del lanzamiento de la versión 1.0.** | **Alta** |
| **RNF-30** | **SSL/HTTPS Obligatorio (NUEVO)** | **Todos los servicios (backend, frontend web) deben operar exclusivamente bajo HTTPS con certificados Let's Encrypt. El acceso por HTTP debe redirigir automáticamente a HTTPS.** | **Alta** |
| **RNF-31** | **Sistema Operativo del Servidor (NUEVO)** | **El servidor de producción debe ejecutar Ubuntu 22.04 LTS o 24.04 LTS.** | **Alta** |
| **RNF-32** | **Descarga Directa de APK (NUEVO)** | **El sitio web debe ofrecer la opción de descarga directa del archivo APK firmado para usuarios que no puedan acceder a Google Play Store o APKlis.** | **Media** |

---

### 5. MODELO DE DATOS (COMPLETO) - ACTUALIZADO

```
USUARIO
├── id_usuario (PK)
├── nombre, email, password_hash
├── rol (admin, dispatcher, chofer, cliente, auditor)
└── activo

VEHICULO
├── id_vehiculo (PK)
├── matricula, marca, modelo, año
├── capacidad_kg, capacidad_m3
├── tipo_combustible, consumo_promedio
├── kilometraje_total
├── disponible
└── fecha_registro

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

CLIENTE
├── id_cliente (PK)
├── nombre_empresa
├── contacto_nombre, contacto_telefono, contacto_email
├── tarifa_preferencial
└── activo

PROSPECTO
├── id_prospecto (PK)
├── nombre_empresa, contacto_nombre
├── telefono, email
├── fuente (referencia, llamada, web, otro)
├── estado (contactado, cotizado, cliente, inactivo)
└── fecha_registro

ENVIO
├── id_envio (PK)
├── id_cliente (FK)
├── id_chofer (FK)
├── id_vehiculo (FK)
├── id_ruta (FK)
├── house (unique)
├── awb (VARCHAR(20))               -- Air Way Bill (ej. 230-66684660)
├── descripcion
├── peso, volumen, bultos
├── remitente_nombre, remitente_passport
├── destinatario_nombre, destinatario_direccion, destinatario_telefono
├── cobrado_origen (boolean)
├── unidad_destino (codigo provincia)
├── prioridad (urgente, normal, economico)
├── fecha_limite
├── fecha_asignacion
├── fecha_entrega_real
├── estado (pendiente, en_bodega, en_ruta, entregado, incidencia)
├── incidencia (opcional)
├── firma_digital (opcional)
├── costo_aduana (DECIMAL(12,2))     -- Costo de aduana obtenido de Aerovaradero (URL de payment)
├── costo_importacion (DECIMAL(12,2)) -- Otros costos de importación
├── fecha_consulta_aduana (TIMESTAMP) -- Fecha de última consulta a Aerovaradero
└── estado_aduana (pendiente, consultado, error) -- Estado de la consulta

RUTA
├── id_ruta (PK)
├── id_vehiculo (FK)
├── id_chofer (FK)
├── fecha
├── secuencia_paradas (JSON)
├── distancia_total, tiempo_estimado
├── combustible_estimado
├── costo_total_estimado, costo_total_real
├── pago_chofer (DECIMAL(12,2))      -- Monto calculado para el chofer
├── ficha_costo (JSON)               -- Ficha de costo completa en formato JSON
├── ingresos (DECIMAL(12,2))          -- Ingresos totales de la ruta
├── utilidad_neta (DECIMAL(12,2))     -- Utilidad neta calculada
├── margen_utilidad (DECIMAL(5,2))    -- Margen de utilidad en porcentaje
└── estado (planificada, en_curso, completada, cancelada)

COSTO
├── id_costo (PK)
├── tipo (fijo, variable)
├── categoria (combustible, peaje, mantenimiento, neumatico, salario, depreciacion, seguro, administrativo, impuesto, aduana, importacion)
├── descripcion
├── monto (DECIMAL(12,2))
├── cantidad (DECIMAL(12,2))          -- Cantidad consumida (ej. litros, km)
├── precio_unitario (DECIMAL(12,2))   -- Precio por unidad
├── es_estimado (BOOLEAN)             -- ¿Es un costo estimado o real?
├── fecha (TIMESTAMP)
├── id_vehiculo (FK, opcional)
├── id_ruta (FK, opcional)
├── id_envio (FK, opcional)
└── facturado (boolean)

PARAMETROS_SISTEMA
├── id_parametro (PK)
├── clave (VARCHAR(50))              -- ej. 'tasa_cambio', 'precio_gasolina', 'precio_diesel'
├── valor (DECIMAL(12,2))
├── descripcion (TEXT)
├── unidad (VARCHAR(20))             -- ej. 'CUP', 'CUP/L', 'USD', 'CUP/km'
└── fecha_actualizacion (TIMESTAMP)

HISTORIAL_PARAMETROS
├── id_historial (PK)
├── id_parametro (FK)
├── valor_anterior (DECIMAL(12,2))
├── valor_nuevo (DECIMAL(12,2))
├── fecha_cambio (TIMESTAMP)
└── usuario (VARCHAR(50))

MANTENIMIENTO
├── id_mantenimiento (PK)
├── id_vehiculo (FK)
├── fecha
├── tipo (preventivo, correctivo)
├── descripcion
├── costo
├── kilometraje_actual
├── proximo_mantenimiento_km
└── taller (opcional)

FACTURA
├── id_factura (PK)
├── id_cliente (FK)
├── numero_factura (unique)
├── fecha_emision, fecha_vencimiento
├── subtotal, impuestos, total
├── estado (emitida, pagada, vencida, anulada)
└── fecha_pago (opcional)

INCIDENTE
├── id_incidente (PK)
├── id_envio (FK)
├── id_chofer (FK)
├── tipo (cliente_no_encontrado, paquete_dañado, averia, retraso, otro)
├── descripcion
├── fecha
├── prioridad (alta, media, baja)
├── estado (abierto, en_proceso, resuelto, cerrado)
└── solucion (opcional)

AUDITORIA
├── id_auditoria (PK)
├── id_usuario (FK)
├── accion (crear, leer, actualizar, eliminar, login, logout)
├── entidad (envio, ruta, vehiculo, chofer, cliente, etc.)
├── id_entidad
├── detalle (JSON con cambios)
├── ip
└── fecha

ENVIO_BODEGA
├── id_envio_bodega (PK)
├── id_envio (FK)
├── ubicacion (rack/estante)
├── fecha_ingreso
├── fecha_salida
└── estado (almacenado, retirado)
```

---

### 6. MATRIZ DE TRAZABILIDAD DE REQUISITOS (RESUMEN) - ACTUALIZADO

| Módulo | Requisitos | Subsistema Técnico | Prioridad |
|--------|------------|-------------------|-----------|
| Flota | RF-FL-01 a RF-FL-08 | Backend + BD | **P1 (Fundacional)** |
| Choferes | RF-CH-01 a RF-CH-06 | Backend + BD | P2 (Alta) |
| Clientes/Envíos | RF-CL-01a a RF-CL-06 | Backend + BD | **P1 (Fundacional)** |
| Rutas | RF-RU-00a a RF-RU-08 | Backend + OSRM | **P1 (Fundacional)** |
| **Costos/Finanzas** | **RF-CO-01 a RF-CO-15** | **Backend + BD + Web Scraping** | **P1 (Fundacional)** |
| App Chofer | RF-MO-01 a RF-MO-11 | Mobile + API | **P1 (Fundacional)** |
| Dashboard | RF-DA-01 a RF-DA-08 | Frontend + Backend | P2 (Alta) |
| Portal Cliente | RF-PO-01 a RF-PO-07 | Frontend + Backend | P2 (Alta) |
| Almacén | RF-AL-01 a RF-AL-06 | Backend + BD | P2 (Alta) |
| Marketing | RF-MK-01 a RF-MK-07 | Backend + BD | P2 (Alta) |
| Auditoría | RF-AU-01 a RF-AU-06 | Backend + BD | **P1 (Fundacional)** |
| Estándares de Codificación | RNF-13 a RNF-23 | Todo el sistema | **P1 (Fundacional)** |
| **Finanzas y Aduana** | **RNF-24 a RNF-26** | **Backend + Web Scraping** | **P1 (Fundacional)** |
| **Infraestructura y Distribución** | **RNF-27 a RNF-32** | **Backend + DevOps** | **P1 (Fundacional)** |

---

### 7. CRITERIOS DE ACEPTACIÓN POR MÓDULO - ACTUALIZADO

#### Módulo de Envíos
- [ ] Importación de Excel se completa en <10 segundos para 127 envíos
- [ ] Validación de datos: campos obligatorios, formatos correctos
- [ ] Vista previa de importación muestra 10 registros
- [ ] Reporte de errores de importación generado correctamente

#### Módulo de Rutas
- [ ] Ruta optimizada reduce distancia en ≥15% vs. planificación manual
- [ ] Tiempo de cálculo <30 segundos para ≤50 paradas
- [ ] Mapa muestra ruta correctamente
- [ ] Drag and drop funciona correctamente
- [ ] Manifiesto de ruta generado en formato legible

#### App Móvil
- [ ] Funciona sin internet (offline)
- [ ] Sincronización automática al recuperar conexión
- [ ] Registro de incidencias y costos en <3 clics
- [ ] Firma digital capturada correctamente
- [ ] Geolocalización enviada cuando hay conexión

#### Dashboard
- [ ] KPIs se actualizan automáticamente
- [ ] Gráficos interactivos
- [ ] Alertas automáticas generadas correctamente
- [ ] Exportación a PDF/CSV funciona

#### Auditoría
- [ ] Todas las acciones quedan registradas
- [ ] Historial de cambios por entidad visible
- [ ] Intentos de login fallidos registrados
- [ ] Exportación de logs a CSV funciona

#### Módulo Financiero y Aduana
- [ ] Consulta automática de costos de aduana para ≥95% de los envíos en <5 minutos utilizando la URL de payment
- [ ] Asignación correcta de costos de aduana a cada envío
- [ ] Cálculo de pago a choferes según esquema configurado (fijo, por km, por entrega)
- [ ] Actualización de parámetros financieros (combustible, tasa de cambio, costos por km) en tiempo real
- [ ] Reporte de rentabilidad incluyendo costos de aduana e importación
- [ ] Manejo de errores en consulta a Aerovaradero con entrada manual de contingencia
- [ ] Historial de cambios en parámetros financieros guardado para auditoría

#### Ficha de Costo Detallada
- [ ] Generación de ficha de costo en <5 segundos por ruta
- [ ] Inclusión de todos los componentes: costos directos (combustible, peajes, mantenimiento, neumáticos, salario), indirectos (depreciación, seguros, administrativos, impuestos) y de importación (costos de aduana)
- [ ] Precisión de 2 decimales en todos los cálculos
- [ ] Exportación a PDF y CSV funcionando correctamente
- [ ] Cálculos auditables y reproducibles

#### Infraestructura y Distribución (NUEVO)
- [ ] **El sistema funciona correctamente en VPS ETECSA con Ubuntu 22.04 LTS**
- [ ] **SSL/HTTPS configurado y funcionando correctamente con Let's Encrypt**
- [ ] **App publicada en Google Play Store**
- [ ] **App publicada en APKlis**
- [ ] **Descarga directa de APK disponible desde el sitio web**
- [ ] **Nginx configurado como proxy inverso para backend y frontend**
- [ ] **PM2 gestionando el proceso de Node.js en producción**

#### Estándares de Codificación
- [ ] ≥95% del código cumple con ESLint/Prettier (TypeScript)
- [ ] ≥95% del código cumple con Dart Analyzer (Flutter)
- [ ] ≥80% de funciones públicas documentadas con JSDoc
- [ ] API documentada con OpenAPI (Swagger)
- [ ] Pipeline de CI/CD incluye verificación automática de estándares
- [ ] Mensajes de commit siguen Conventional Commits

---

### 8. RIESGOS Y MITIGACIÓN (ACTUALIZADO)

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Conectividad limitada en zonas rurales | Alta | Alto | Modo offline robusto, sincronización automática |
| Calidad de datos de OSM en Cuba | Media | Medio | Edición colaborativa por choferes + GPS tracks |
| Resistencia de choferes a usar app | Media | Alto | UI simple, capacitación, incentivos |
| Cambios en normativa cubana | Media | Medio | Arquitectura flexible, fácil adaptación |
| Seguridad de datos | Media | Alto | Auditoría completa, logs de acceso, encriptación |
| Competencia (OptimoRoute, McLeod) | Baja | Medio | Precio cero, adaptación al nicho cubano |
| Baja calidad de código | Media | Alto | Estándares de codificación, análisis estático en CI/CD, revisiones de código obligatorias |
| Documentación insuficiente | Media | Medio | JSDoc obligatorio, generación automática de documentación, cobertura ≥80% |
| Cambios en el sitio web de Aerovaradero (URL de payment) | Alta | Alto | Sistema de alertas de fallo en extracción, entrada manual de costos como contingencia, monitoreo periódico del sitio |
| Fluctuación de la tasa de cambio y precios de combustible | Alta | Medio | Actualización manual/configurable de parámetros, historial de cambios para análisis |
| Errores en cálculo de pago a choferes | Media | Alto | Validaciones automáticas, auditoría de cálculos, generación de reportes de pago para revisión |
| Errores en cálculo de ficha de costo | Media | Alto | Validaciones automáticas, auditoría de cálculos, pruebas con datos reales, precisión de 2 decimales |
| **Disponibilidad de VPS ETECSA (NUEVO)** | **Media** | **Alto** | **Tener plan de contingencia con servidor alternativo (nube internacional)** |
| **Google Play Store bloqueada desde Cuba (NUEVO)** | **Alta** | **Medio** | **Distribuir también vía APKlis y descarga directa** |
| **Configuración de SSL/HTTPS (NUEVO)** | **Baja** | **Medio** | **Documentación detallada, uso de Let's Encrypt, renovación automática** |
| **Recursos limitados del VPS ETECSA (NUEVO)** | **Media** | **Medio** | **Optimización de recursos, caché con Redis, monitoreo de rendimiento** |

---

### 9. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Líder del Proyecto | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| Analista de Negocios | Equipo SIGMA-T | _________ | ___/___/2026 |
| Administrador de Sistemas | Equipo SIGMA-T | _________ | ___/___/2026 |

---

## 📌 CONCLUSIÓN

Este SRS Versión 3.3 ahora incluye:

- ✅ **11 módulos funcionales** completos
- ✅ **85 requisitos funcionales** (5 nuevos: RF-CO-11 a RF-CO-15)
- ✅ **32 requisitos no funcionales** (6 nuevos: RNF-27 a RNF-32 sobre infraestructura y distribución)
- ✅ **Auditoría completa** para trazabilidad total
- ✅ **Marketing y CRM** para crecimiento del negocio
- ✅ **Portal del cliente** para transparencia
- ✅ **Gestión de almacén** para control de inventario
- ✅ **Modelo de datos completo** (22 entidades, con nuevas tablas y campos)
- ✅ **Matriz de trazabilidad** actualizada
- ✅ **Estándares de codificación** para TypeScript, React y Flutter
- ✅ **Estrategia de documentación** con JSDoc, OpenAPI y READMEs
- ✅ **Gestión de pago a choferes** (esquemas flexibles)
- ✅ **Gestión de parámetros financieros** (combustible, tasa de cambio, costos por km)
- ✅ **Integración automática con Aduana** utilizando URL de payment
- ✅ **Cálculo de costo total por envío** (incluyendo aduana e importación)
- ✅ **Ficha de costo detallada por ruta** con todos los componentes de costo
- ✅ **Infraestructura de producción** en VPS ETECSA con Ubuntu 22.04 LTS
- ✅ **SSL/HTTPS obligatorio** con Let's Encrypt
- ✅ **Distribución en Google Play Store**, **APKlis** y **descarga directa**

**Este documento es la base técnica definitiva para construir el sistema de gestión de transporte más completo y de mayor calidad del nicho cubano y regional.**

