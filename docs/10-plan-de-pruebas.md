## 📄 DOCUMENTO: PLAN DE PRUEBAS DE SIGMA-T (VERSIÓN 2.1)

**Basado en ISO/IEC 29119 - Pruebas de Software**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente / Sponsor:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 15 de agosto de 2026  
**Versión del Documento:** 2.1 (Completa - Top Mundial con VRPTW v3.0, Optimización de Combustible, Reoptimización Dinámica, IA, Análisis Post-Ruta, Autenticación JWT, Componentes Comunes, Store Zustand, SonarQube y Pruebas Unitarias)

---

## 1. INTRODUCCIÓN Y PROPÓSITO

### 1.1 Propósito del Documento
Este documento define la estrategia, los casos de prueba, los criterios de aceptación y los procedimientos para garantizar la calidad del sistema SIGMA-T. Sirve como guía para el equipo de QA y como base para la validación final del sistema por parte del Líder del Proyecto.

### 1.2 Alcance
El plan de pruebas cubre todos los módulos del sistema:
- Backend (API REST)
- Frontend Web (React)
- App Móvil (Flutter)
- Base de Datos (PostgreSQL)
- Integraciones externas (Aerovaradero, OSRM)
- Automatización de Aduana (Cron Jobs)
- **🆕 Autenticación JWT y Gestión de Sesiones**
- **🆕 Pruebas Unitarias (Cobertura ≥70%)**
- **🆕 Análisis de Calidad con SonarQube**
- **🆕 Pruebas E2E con Cypress**
- **🆕 Componentes Comunes y Store Zustand**
- **🆕 Algoritmo VRPTW v3.0** (Optimización de combustible, prioridad de entregas)
- **🆕 Reoptimización Dinámica** (Tiempo real, <5 segundos)
- **🆕 Sistema de IA** (Estimación de tiempos, regresión lineal)
- **🆕 Análisis Post-Ruta** (Comparativa planificado vs real, métricas de eficiencia)

### 1.3 Audiencia
- **Líder del Proyecto:** Para validar los criterios de aceptación.
- **Equipo de QA:** Como guía de ejecución de pruebas.
- **Desarrolladores:** Para entender los casos de prueba y corregir defectos.
- **Stakeholders:** Para verificar que el sistema cumple con los requisitos.

### 1.4 Referencias
- **SRS v3.9:** Especificación de Requisitos del Software.
- **SPMP v4.0:** Plan de Gestión del Proyecto de Software.
- **Arquitectura v3.1:** Documento de Arquitectura de Software (VRPTW v3.0, JWT, SonarQube).
- **Maquetas UI/UX v2.8:** Diseño de interfaz de usuario (incluye LoginPage).
- **ISO/IEC 29119:** Estándar de Pruebas de Software.

---

## 2. ESTRATEGIA GENERAL DE PRUEBAS

### 2.1 Pirámide de Pruebas

```
                   ┌──────────────┐
                   │   E2E / UAT  │  ← Pruebas de extremo a extremo (🆕 Cypress)
                   │  (Automática)│  ← Aceptación de usuarios
                   ├──────────────┤
                   │  Integración │  ← Comunicación entre módulos
                   │  (Automática)│  ← Servicios externos (Aerovaradero, OSRM, IA, JWT)
                   ├──────────────┤
                   │   Unitarias  │  ← Cada función / componente (🆕 Jest + Vitest)
                   │  (Automática)│  ← Cobertura >70%
                   └──────────────┘
```

### 2.2 Tipos de Pruebas

| # | Tipo de Prueba | Descripción | Herramientas | Responsable |
|---|---------------|-------------|--------------|-------------|
| 1 | **Pruebas Unitarias** | Verificar lógica de cada función/clase | **🆕 Jest (Backend), Vitest (Frontend)**, Flutter Test (Mobile) | Desarrollador |
| 2 | **Pruebas de Integración** | Verificar comunicación entre módulos | Supertest, Jest | Desarrollador / QA |
| 3 | **Pruebas de Sistema (E2E)** | Simular flujos completos de usuario | **🆕 Cypress (Frontend)** | QA |
| 4 | **Pruebas de Aceptación (UAT)** | Validación por usuarios reales | Manual | Usuarios Piloto |
| 5 | **Pruebas de Rendimiento** | Verificar tiempo de respuesta | K6, Artillery | QA |
| 6 | **Pruebas de Seguridad** | Validar autenticación y autorización | OWASP ZAP, Jest | QA |
| 7 | **Pruebas de Usabilidad** | Evaluar experiencia de usuario | Encuestas, Observación | Diseñador UX / QA |
| 8 | **Pruebas de Regresión** | Verificar que cambios no rompan existente | Jest, Vitest, Cypress | QA |
| 9 | **Pruebas de Documentación** | Verificar cobertura JSDoc | ESLint-plugin-jsdoc | QA / Documentalista |
| 10 | **Pruebas de Infraestructura** | Verificar despliegue en VPS ETECSA | Manual / Scripts | DevOps / QA |
| 11 | **🆕 Pruebas de Autenticación JWT** | Validar login, refresh token, roles | Jest + Supertest (Backend), Cypress (Frontend) | QA |
| 12 | **🆕 Pruebas de Componentes Comunes** | Validar componentes reutilizables (Button, Table, Modal, etc.) | Vitest + Testing Library | QA |
| 13 | **🆕 Pruebas de Store Zustand** | Validar gestión de estado global | Vitest | QA |
| 14 | **🆕 Pruebas de SonarQube** | Validar métricas de calidad (deuda técnica, seguridad) | SonarQube | QA / DevOps |
| 15 | **🆕 Pruebas de Algoritmo VRPTW v3.0** | Validar optimización de combustible, prioridad de entregas | Jest (Backend) | QA |
| 16 | **🆕 Pruebas de Reoptimización Dinámica** | Validar tiempo de respuesta <5 segundos | Jest + cron-mock | QA |
| 17 | **🆕 Pruebas del Sistema de IA** | Validar precisión del modelo de estimación de tiempos | Jest + Datos de prueba | QA |
| 18 | **🆕 Pruebas de Análisis Post-Ruta** | Validar generación de métricas de eficiencia | Jest (Backend) + Cypress (Frontend) | QA |

---

## 3. CASOS DE PRUEBA POR MÓDULO

### 3.1 Módulo de Envíos y Clientes ✅ IMPLEMENTADO

#### 3.1.1 CRUD de Clientes

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-CL-01 | Crear cliente exitoso | POST /api/clientes con datos válidos | 201 Created, cliente guardado | Alta |
| TC-CL-02 | Crear cliente sin nombre | POST /api/clientes sin nombre_empresa | 400 Bad Request, mensaje de error | Alta |
| TC-CL-03 | Listar clientes | GET /api/clientes | 200 OK, lista de clientes | Alta |
| TC-CL-04 | Obtener cliente por ID | GET /api/clientes/:id existente | 200 OK, datos del cliente | Alta |
| TC-CL-05 | Obtener cliente inexistente | GET /api/clientes/:id inexistente | 404 Not Found | Alta |
| TC-CL-06 | Actualizar cliente | PUT /api/clientes/:id con datos válidos | 200 OK, cliente actualizado | Alta |
| TC-CL-07 | Eliminar cliente | DELETE /api/clientes/:id existente | 204 No Content | Alta |

#### 3.1.2 CRUD de Envíos

| ID       | Caso de Prueba                     | Pasos                                      | Resultado Esperado          | Prioridad |
|----------|------------------------------------|--------------------------------------------|-----------------------------|-----------|
| TC-EN-01 | Crear envío manual exitoso         | POST /api/envios con datos válidos         | 201 Created, envío guardado | Alta      |
| TC-EN-02 | Crear envío sin House              | POST /api/envios sin house                 | 400 Bad Request             | Alta      |
| TC-EN-03 | Crear envío con House duplicado    | POST /api/envios con house existente       | 400 Bad Request             | Alta      |
| TC-EN-04 | Listar envíos con filtros          | GET /api/envios?estado=pendiente           | 200 OK, lista filtrada      | Alta      |
| TC-EN-05 | Buscar envío por House             | GET /api/envios/buscar/:house              | 200 OK, envío encontrado    | Alta      |
| TC-EN-06 | Buscar envío por House inexistente | GET /api/envios/buscar/:house inexistente  | 404 Not Found               | Alta      |
| TC-EN-07 | Actualizar estado de envío         | PUT /api/envios/:id con estado="entregado" | 200 OK, estado actualizado  | Alta      |
| TC-EN-08 | Eliminar envío                     | DELETE /api/envios/:id existente           | 204 No Content              | Alta      |
| TC-EN-09 | Estadísticas de envíos             | GET /api/envios/estadisticas               | 200 OK, datos estadísticos  | Media     |

#### 3.1.3 Importación de Manifiesto

| ID       | Caso de Prueba                                   | Pasos                                               | Resultado Esperado                      | Prioridad |
|----------|--------------------------------------------------|-----------------------------------------------------|-----------------------------------------|-----------|
| TC-IM-01 | Importar Excel con mapeo correcto                | Subir archivo Excel, mapear columnas correctamente  | 200 OK, envíos importados               | Crítica   |
| TC-IM-02 | Importar Excel con mapeo incorrecto              | Subir archivo, mapear columna de peso a descripción | Error, mensaje de validación            | Alta      |
| TC-IM-03 | Importar Excel con datos inválidos               | House duplicado, Carnet de 10 dígitos               | Reporte de errores detallado            | Crítica   |
| TC-IM-04 | Importar Excel con campos obligatorios faltantes | Sin destinatario_nombre                             | Error, campo obligatorio                | Alta      |
| TC-IM-05 | Importar Excel con filas vacías                  | Archivo con filas sin datos                         | Filas ignoradas, importación exitosa    | Media     |
| TC-IM-06 | Vista previa de importación                      | Ver todos los registros antes de importar           | Todos los registros mostrados           | Alta      |
| TC-IM-07 | Reporte de errores en pantalla                   | Importar archivo con errores                        | Todos los errores mostrados             | Alta      |
| TC-IM-08 | Validación de Carnet (11 dígitos)                | Importar con Carnet "9012311234" (10 dígitos)       | Error: debe tener 11 dígitos            | Crítica   |
| TC-IM-09 | Validación de Unidad de destino                  | Importar sin unidad_destino                         | Error: campo obligatorio                | Crítica   |
| TC-IM-10 | Columnas extras ignoradas                        | Archivo con columnas no mapeadas                    | Columnas ignoradas, importación exitosa | Media     |
| TC-IM-11 | Importar CSV con mapeo correcto                  | Subir archivo CSV, mapear columnas                  | 200 OK, envíos importados               | Alta      |
| TC-IM-12 | 🆕 Validación de Prioridad                       | Importar con prioridad "urgente"                    | Prioridad asignada correctamente        | Alta      |

### 3.2 🆕 Módulo de Autenticación JWT ⏳ PENDIENTE (SPRINT 3)

| ID         | Caso de Prueba                    | Pasos                                               | Resultado Esperado                           | Prioridad |
|------------|-----------------------------------|-----------------------------------------------------|----------------------------------------------|-----------|
| TC-AUTH-01 | Login exitoso                     | POST /api/auth/login con credenciales correctas     | 200 OK, accessToken y refreshToken generados | Crítica   |
| TC-AUTH-02 | Login fallido                     | POST /api/auth/login con contraseña incorrecta      | 401 Unauthorized                             | Crítica   |
| TC-AUTH-03 | Login sin email                   | POST /api/auth/login sin email                      | 400 Bad Request                              | Alta      |
| TC-AUTH-04 | Login sin contraseña              | POST /api/auth/login sin password                   | 400 Bad Request                              | Alta      |
| TC-AUTH-05 | Usuario inactivo                  | POST /api/auth/login con usuario inactivo           | 401 Unauthorized                             | Alta      |
| TC-AUTH-06 | Acceso protegido con token válido | GET /api/auth/me con token válido                   | 200 OK, datos del usuario                    | Crítica   |
| TC-AUTH-07 | Acceso protegido sin token        | GET /api/auth/me sin token                          | 401 Unauthorized                             | Crítica   |
| TC-AUTH-08 | Acceso con token expirado         | GET /api/auth/me con token expirado                 | 401 Unauthorized                             | Alta      |
| TC-AUTH-09 | Refresh token exitoso             | POST /api/auth/refresh con refresh token válido     | 200 OK, nuevos tokens                        | Crítica   |
| TC-AUTH-10 | Refresh token inválido            | POST /api/auth/refresh con refresh token inválido   | 401 Unauthorized                             | Alta      |
| TC-AUTH-11 | Refresh token expirado            | POST /api/auth/refresh con refresh token expirado   | 401 Unauthorized                             | Alta      |
| TC-AUTH-12 | Refresh token revocado            | POST /api/auth/refresh después de logout            | 401 Unauthorized                             | Alta      |
| TC-AUTH-13 | Logout exitoso                    | POST /api/auth/logout con token válido              | 200 OK, token revocado                       | Alta      |
| TC-AUTH-14 | Autorización por rol - Admin      | Usuario admin accede a endpoint de admin            | 200 OK                                       | Crítica   |
| TC-AUTH-15 | Autorización por rol - Agencia    | Usuario agencia intenta acceso de admin             | 403 Forbidden                                | Crítica   |
| TC-AUTH-16 | Autorización por rol - Chofer     | Usuario chofer accede a su ruta                     | 200 OK                                       | Alta      |
| TC-AUTH-17 | Rate limiting en login            | 100 intentos de login en 1 minuto                   | 429 Too Many Requests                        | Alta      |

### 3.3 🆕 Pruebas de Componentes Comunes ⏳ PENDIENTE (SPRINT 2)

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-COM-01 | Button renderizado | Renderizar Button con texto | Texto visible, estilo correcto | Alta |
| TC-COM-02 | Button onClick | Hacer clic en Button | Evento onClick ejecutado | Alta |
| TC-COM-03 | Button deshabilitado | Renderizar Button con disabled=true | Button deshabilitado, sin click | Alta |
| TC-COM-04 | Table con datos | Renderizar Table con datos | Datos mostrados correctamente | Alta |
| TC-COM-05 | Table vacía | Renderizar Table sin datos | Mensaje "Sin datos" mostrado | Media |
| TC-COM-06 | Modal abrir/cerrar | Abrir y cerrar Modal | Modal visible y oculto correctamente | Alta |
| TC-COM-07 | Input con validación | Ingresar datos en Input | Valor actualizado correctamente | Alta |
| TC-COM-08 | Input con error | Ingresar datos inválidos | Mensaje de error mostrado | Alta |
| TC-COM-09 | Select con opciones | Seleccionar opción en Select | Opción seleccionada correctamente | Alta |
| TC-COM-10 | Toast notificación | Disparar Toast | Toast visible y desaparece | Alta |
| TC-COM-11 | Badge estado | Renderizar Badge con diferentes estados | Color y texto correctos | Media |
| TC-COM-12 | Pagination | Navegar entre páginas | Página actualizada correctamente | Alta |
| TC-COM-13 | ConfirmDialog | Abrir ConfirmDialog y confirmar | Acción confirmada ejecutada | Alta |
| TC-COM-14 | ConfirmDialog cancelar | Abrir ConfirmDialog y cancelar | Acción cancelada, sin cambios | Alta |
| TC-COM-15 | ErrorBoundary | Lanzar error en componente hijo | Fallback UI mostrada | Alta |

### 3.4 🆕 Pruebas de Store Zustand ⏳ PENDIENTE (SPRINT 3)

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-STOR-01 | Login en store | Llamar login en auth.store | Estado de autenticación actualizado | Crítica |
| TC-STOR-02 | Logout en store | Llamar logout en auth.store | Estado de autenticación limpiado | Crítica |
| TC-STOR-03 | Cargar envíos en store | Llamar fetchEnvios en envio.store | Envíos cargados en store | Alta |
| TC-STOR-04 | Persistencia de auth | Recargar página | Estado de autenticación persistido | Alta |
| TC-STOR-05 | UI store - loading | Llamar setLoading(true) | Estado de loading actualizado | Media |
| TC-STOR-06 | UI store - toast | Llamar addToast | Toast agregado y removido | Media |

### 3.5 Módulo de Rutas (VRPTW v3.0) ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-RU-01 | Optimizar rutas con 10 envíos | POST /api/rutas/optimizar con 10 envíos | Rutas optimizadas en <10 segundos | Crítica |
| TC-RU-02 | Optimizar rutas con 50 envíos | POST /api/rutas/optimizar con 50 envíos | Rutas optimizadas en <30 segundos | Alta |
| TC-RU-03 | Optimizar rutas sin envíos | POST /api/rutas/optimizar sin envíos | 400 Bad Request | Alta |
| TC-RU-04 | Obtener rutas de una semana | GET /api/rutas/semana/2026-08-16 | 200 OK, lista de rutas | Alta |
| TC-RU-05 | Obtener detalle de ruta | GET /api/rutas/:id | 200 OK, detalle de ruta | Alta |
| TC-RU-06 | Asignar ruta a chofer | POST /api/rutas/:id/asignar | 200 OK, ruta asignada | Alta |
| TC-RU-07 | 🆕 Reoptimizar ruta ante incidencia | POST /api/rutas/:id/reoptimizar | Ruta actualizada en <5 segundos | Crítica |
| TC-RU-08 | Generar manifiesto PDF | GET /api/rutas/:id/manifiesto | PDF generado correctamente | Alta |
| TC-RU-09 | Drag and drop en UI | Mover punto de entrega en mapa | Secuencia actualizada | Alta |
| TC-RU-10 | Mapa muestra rutas correctamente | Visualizar ruta en mapa | Rutas y paradas visibles | Alta |
| TC-RU-11 | 🆕 Optimización con prioridad de entregas | Envíos urgentes en primeras 3 posiciones | Urgentes posicionados correctamente | Crítica |
| TC-RU-12 | 🆕 Cálculo de combustible optimizado | Consumo específico por vehículo | Costo combustible calculado correctamente | Alta |
| TC-RU-13 | 🆕 Reoptimización con nuevo pedido urgente | Agregar pedido urgente en ruta activa | Ruta reoptimizada en <5 segundos | Crítica |
| TC-RU-14 | 🆕 Análisis Post-Ruta | GET /api/rutas/:id/analisis-post-ruta | Métricas de eficiencia generadas | Alta |
| TC-RU-15 | 🆕 Comparativa planificado vs real | Ver desviaciones de distancia, tiempo, combustible | Tabla comparativa visible | Alta |

### 3.6 Módulo de Aduana ⏳ PENDIENTE

#### 3.6.1 Consulta de Costos de Aduana

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-AD-01 | Consulta exitosa de costo | POST /api/finanzas/consultar-aduana con AWB y House válidos | importe_aduana > 0, numero_factura | Crítica |
| TC-AD-02 | Consulta de house sin importe | POST con AWB y House sin importe | importe_aduana = null, estado "pendiente" | Alta |
| TC-AD-03 | Consulta de house inexistente | POST con House inválido | estado "error", mensaje de error | Alta |
| TC-AD-04 | Consulta masiva (127 envíos) | POST con 127 envíos | Tiempo <5 minutos, ≥95% consultados | Crítica |
| TC-AD-05 | Timeout en consulta | Simular timeout de Aerovaradero | estado "error", reintento en próxima ejecución | Alta |
| TC-AD-06 | Construcción de URL correcta | Verificar URL generada | `https://www.aerovaradero.com.cu/payment/?cod_la=230&cod_awb=66684660&cod_house=24014926` | Alta |
| TC-AD-07 | Asignación de costos a envío | Verificar que costo_aduana se guarde en envio | costo_aduana asignado correctamente | Crítica |
| TC-AD-08 | Reporte de costos de aduana | GET /api/finanzas/costos-aduana | Reporte generado correctamente | Media |

#### 3.6.2 Automatización de Facturación de Aduana

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-AU-01 | Ejecución a las 8:00 AM | Verificar que el cron job se ejecuta a las 8 AM | Ejecución iniciada | Crítica |
| TC-AU-02 | Ejecución a las 12:00 PM | Verificar que el cron job se ejecuta a las 12 PM | Ejecución iniciada | Crítica |
| TC-AU-03 | Ejecución a las 4:00 PM | Verificar que el cron job se ejecuta a las 4 PM | Ejecución iniciada | Crítica |
| TC-AU-04 | Ejecución a las 12:00 AM | Verificar que el cron job se ejecuta a las 12 AM | Ejecución iniciada | Crítica |
| TC-AU-05 | SOLO houses "Arribados" | Verificar que solo consulta houses con estado "Arribado" | Houses "Facturados" ignorados | Crítica |
| TC-AU-06 | Detección de importe y factura | House con importe > 0 y factura existente | Cambio a "Facturado" | Crítica |
| TC-AU-07 | Sin importe o factura | House sin importe o sin factura | Permanece en "Arribado" | Alta |
| TC-AU-08 | Incremento de intentos | House sin importe/factura | intentos_consulta_aduana +1 | Alta |
| TC-AU-09 | Registro de logs | Verificar logs de cada consulta | Logs completos registrados | Alta |
| TC-AU-10 | House "Facturado" ignorado | Verificar que no se consulta nuevamente | House "Facturado" no aparece en consultas | Crítica |
| TC-AU-11 | Estado de automatización | GET /api/finanzas/automatizacion/status | Resumen de ejecución correcto | Media |

### 3.7 Módulo Financiero ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-FI-01 | Registrar ingreso | POST /api/finanzas/ingreso | 201 Created, ingreso guardado | Alta |
| TC-FI-02 | Registrar gasto | POST /api/finanzas/gasto | 201 Created, gasto guardado | Alta |
| TC-FI-03 | Resumen financiero | GET /api/finanzas/resumen | 200 OK, resumen calculado | Alta |
| TC-FI-04 | Generar factura | POST /api/finanzas/factura | 201 Created, factura generada | Alta |
| TC-FI-05 | Registrar pago de factura | POST /api/finanzas/facturas/:id/pagar | 200 OK, estado actualizado | Alta |
| TC-FI-06 | Listar facturas | GET /api/finanzas/facturas | 200 OK, lista de facturas | Media |
| TC-FI-07 | 🆕 Cálculo de costo de combustible por ruta | Verificar costo combustible en ficha de costo | Costo calculado correctamente | Alta |

### 3.8 Módulo de Parámetros ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-PA-01 | Obtener todos los parámetros | GET /api/parametros | 200 OK, lista de parámetros | Alta |
| TC-PA-02 | Obtener parámetro por clave | GET /api/parametros/tasa_cambio | 200 OK, valor del parámetro | Alta |
| TC-PA-03 | Actualizar parámetro | PUT /api/parametros/tasa_cambio con valor 240.00 | 200 OK, parámetro actualizado | Alta |
| TC-PA-04 | Historial de cambios | GET /api/parametros/historial/tasa_cambio | 200 OK, historial de cambios | Alta |
| TC-PA-05 | Actualizar parámetro inválido | PUT con valor negativo | 400 Bad Request | Media |
| TC-PA-06 | 🆕 Actualizar peso de combustible | PUT /api/parametros/peso_combustible | Parámetro actualizado | Alta |
| TC-PA-07 | 🆕 Actualizar penalización urgente | PUT /api/parametros/penalizacion_urgente | Parámetro actualizado | Alta |

### 3.9 Módulo de Choferes ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-CH-01 | Registrar chofer | POST /api/choferes con datos válidos | 201 Created, chofer guardado | Alta |
| TC-CH-02 | Listar choferes | GET /api/choferes | 200 OK, lista de choferes | Alta |
| TC-CH-03 | Obtener desempeño | GET /api/choferes/:id/desempeno | 200 OK, datos de desempeño | Alta |
| TC-CH-04 | Calcular pago - esquema fijo | POST /api/choferes/calcular-pago con esquema "fijo" | 200 OK, cálculo correcto | Crítica |
| TC-CH-05 | Calcular pago - esquema por km | POST con esquema "por_km" | 200 OK, cálculo correcto | Crítica |
| TC-CH-06 | Calcular pago - esquema por entrega | POST con esquema "por_entrega" | 200 OK, cálculo correcto | Crítica |
| TC-CH-07 | Calcular pago - esquema combinado | POST con esquema "combinado" | 200 OK, cálculo correcto | Crítica |
| TC-CH-08 | Precisión de 2 decimales | Verificar cálculos con decimales | 2 decimales exactos | Crítica |
| TC-CH-09 | 🆕 Bonificación por urgente | Chofer con entregas urgentes | Bonificación calculada correctamente | Alta |
| TC-CH-10 | 🆕 Eficiencia del chofer | GET /api/choferes/:id/eficiencia | Métricas de eficiencia calculadas | Media |

### 3.10 Módulo de Ficha de Costo ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-FC-01 | Generar ficha de costo | GET /api/rutas/:id/ficha-costo | 200 OK, ficha generada | Crítica |
| TC-FC-02 | Tiempo de generación <5 segundos | Medir tiempo de respuesta | <5 segundos | Crítica |
| TC-FC-03 | Costos directos calculados correctamente | Verificar combustible, peajes, mantenimiento, neumáticos, salario | Cálculos precisos a 2 decimales | Crítica |
| TC-FC-04 | Costos indirectos calculados correctamente | Verificar depreciación, seguros, administrativos, impuestos | Cálculos precisos a 2 decimales | Crítica |
| TC-FC-05 | Costos de importación calculados | Verificar costos de aduana incluidos | Cálculos precisos a 2 decimales | Crítica |
| TC-FC-06 | Utilidad y margen calculados | Verificar utilidad_neta y margen_utilidad | Cálculos precisos a 2 decimales | Alta |
| TC-FC-07 | Exportar a PDF | GET /api/rutas/:id/ficha-costo/exportar | PDF generado correctamente | Alta |
| TC-FC-08 | Exportar a CSV | GET /api/rutas/:id/ficha-costo/exportar/csv | CSV generado correctamente | Alta |
| TC-FC-09 | Ficha de costo de ruta sin datos | GET con ruta vacía | Ficha con ceros, sin errores | Media |
| TC-FC-10 | 🆕 Inclusión de combustible real | Verificar combustible real vs estimado | Ambos valores mostrados | Alta |
| TC-FC-11 | 🆕 Desviación de combustible | Calcular desviación porcentual | Desviación calculada correctamente | Alta |

### 3.11 App Móvil (Chofer) ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-MO-01 | Login offline | Iniciar sesión sin conexión | Login exitoso | Crítica |
| TC-MO-02 | Ver ruta del día | Abrir app, ver ruta asignada | Ruta visible correctamente | Crítica |
| TC-MO-03 | Ver mapa con ruta | Abrir mapa de ruta | Ruta y paradas visibles | Alta |
| TC-MO-04 | Registrar entrega exitosa | Seleccionar entrega, marcar como entregada | Registro guardado localmente | Crítica |
| TC-MO-05 | Registrar incidencia | Seleccionar entrega, marcar incidencia | Incidencia guardada | Alta |
| TC-MO-06 | Capturar firma digital | Dibujar firma en pantalla | Firma capturada y guardada | Media |
| TC-MO-07 | Registrar costos reales | Ingresar combustible, peajes | Costos guardados | Alta |
| TC-MO-08 | Modo offline completo | Realizar operaciones sin conexión | Todas las operaciones funcionan | Crítica |
| TC-MO-09 | Sincronización automática | Recuperar conexión, sincronizar datos | Datos sincronizados correctamente | Crítica |
| TC-MO-10 | Resolución de conflictos | Cambiar estado en servidor y en app | Conflicto resuelto correctamente | Alta |
| TC-MO-11 | Ver historial de entregas | Navegar a historial | Historial visible | Media |
| TC-MO-12 | Ver ficha de costo de ruta | Navegar a ficha de costo | Ficha visible correctamente | Media |
| TC-MO-13 | 🆕 Solicitar reoptimización | Marcar incidencia, solicitar reoptimización | Ruta reoptimizada en <5 segundos | Alta |
| TC-MO-14 | 🆕 Ver ruta reoptimizada | Recibir nueva ruta en app | Ruta actualizada visible en mapa | Alta |
| TC-MO-15 | 🆕 Visualización de prioridad | Ver badge "Urgente" en entregas | Badge visible correctamente | Alta |

### 3.12 Dashboard ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-DA-01 | Dashboard carga en <3 segundos | Cargar página de dashboard | <3 segundos | Crítica |
| TC-DA-02 | KPIs actualizados | Ver KPIs en dashboard | Datos actualizados | Alta |
| TC-DA-03 | Gráfico de rentabilidad | Ver gráfico en dashboard | Gráfico visible correctamente | Alta |
| TC-DA-04 | Exportar reporte a PDF | Hacer clic en exportar PDF | PDF generado | Media |
| TC-DA-05 | Alertas automáticas | Simular mantenimiento vencido | Alerta visible | Media |
| TC-DA-06 | 🆕 Panel de Análisis Post-Ruta | Ver métricas de eficiencia | Gráficos y datos visibles | Alta |
| TC-DA-07 | 🆕 Panel de Eficiencia | Ver eficiencia por chofer, vehículo, zona | Datos de eficiencia visibles | Alta |
| TC-DA-08 | 🆕 Simulador de Optimización | Ejecutar simulación con parámetros | Resultados de simulación visibles | Media |

### 3.13 Auditoría ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-AU-01 | Registro de acción | Realizar acción en el sistema | Registro en auditoria | Crítica |
| TC-AU-02 | Obtener logs | GET /api/auditoria/logs | 200 OK, logs obtenidos | Alta |
| TC-AU-03 | Historial por entidad | GET /api/auditoria/entidad/envio/:id | Historial de cambios visible | Alta |
| TC-AU-04 | Exportar logs | GET /api/auditoria/exportar | CSV/PDF generado | Media |
| TC-AU-05 | 🆕 Registro de reoptimización | Realizar reoptimización de ruta | Evento registrado en auditoría | Alta |
| TC-AU-06 | 🆕 Registro de análisis post-ruta | Generar análisis post-ruta | Evento registrado en auditoría | Alta |
| TC-AU-07 | 🆕 Registro de eventos de IA | Predicción de tiempo de entrega | Evento registrado en auditoría | Media |
| TC-AU-08 | 🆕 Registro de login/logout | Iniciar y cerrar sesión | Eventos registrados en auditoría | Crítica |
| TC-AU-09 | 🆕 Registro de refresh token | Refrescar token | Evento registrado en auditoría | Alta |

### 3.14 Infraestructura ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-IN-01 | Despliegue en VPS ETECSA | Ejecutar guía de despliegue | Sistema funcionando | Crítica |
| TC-IN-02 | SSL/HTTPS funcionando | Acceder a https://dominio.com | Conexión segura | Crítica |
| TC-IN-03 | Redirección HTTP → HTTPS | Acceder a http://dominio.com | Redirige a HTTPS | Alta |
| TC-IN-04 | Nginx como proxy inverso | Acceder a /api | Petición redirigida a backend | Alta |
| TC-IN-05 | PM2 gestionando proceso | Verificar estado de PM2 | Proceso activo | Alta |
| TC-IN-06 | Cron Jobs ejecutándose | Verificar logs de automatización | Tareas programadas ejecutándose | Crítica |
| TC-IN-07 | 🆕 Reoptimización en producción | Verificar que reoptimización funciona en VPS | Tiempo de respuesta <5 segundos | Alta |
| TC-IN-08 | 🆕 Modelo IA en producción | Verificar predicciones de tiempo | Predicciones generadas correctamente | Media |

### 3.15 🆕 Pruebas Unitarias ⏳ PENDIENTE (SPRINT 5.5)

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-UNIT-01 | Cobertura de pruebas backend | Ejecutar `npm run test:coverage` en backend | Cobertura ≥70% | Alta |
| TC-UNIT-02 | Cobertura de pruebas frontend | Ejecutar `npm run test:coverage` en frontend | Cobertura ≥70% | Alta |
| TC-UNIT-03 | Cobertura de ClienteService | Ejecutar pruebas de ClienteService | Todas las pruebas pasan | Alta |
| TC-UNIT-04 | Cobertura de EnvioService | Ejecutar pruebas de EnvioService | Todas las pruebas pasan | Alta |
| TC-UNIT-05 | Cobertura de ImportacionService | Ejecutar pruebas de ImportacionService | Todas las pruebas pasan | Alta |
| TC-UNIT-06 | Cobertura de AuthService | Ejecutar pruebas de AuthService | Todas las pruebas pasan | Alta |
| TC-UNIT-07 | Cobertura de API frontend | Ejecutar pruebas de envio.api | Todas las pruebas pasan | Alta |
| TC-UNIT-08 | Cobertura de componentes | Ejecutar pruebas de componentes | Todas las pruebas pasan | Alta |
| TC-UNIT-09 | Cobertura de store | Ejecutar pruebas de store Zustand | Todas las pruebas pasan | Alta |
| TC-UNIT-10 | CI/CD con cobertura | Push a PR con cobertura <70% | Pipeline falla | Alta |

### 3.16 🆕 Pruebas E2E con Cypress ⏳ PENDIENTE (SPRINT 6)

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-E2E-01 | Flujo de login | Navegar a /login, ingresar credenciales | Redirige a dashboard | Crítica |
| TC-E2E-02 | Flujo de logout | Hacer clic en logout | Redirige a /login | Alta |
| TC-E2E-03 | Flujo de importación | Subir archivo Excel, mapear columnas, importar | Envíos importados correctamente | Crítica |
| TC-E2E-04 | Flujo de creación de envío | Crear envío manual | Envío creado y visible en lista | Alta |
| TC-E2E-05 | Flujo de optimización de rutas | Optimizar rutas semanales | Rutas generadas y visibles en mapa | Alta |
| TC-E2E-06 | Flujo de consulta de aduana | Consultar costos de aduana | Costos mostrados correctamente | Alta |
| TC-E2E-07 | Flujo de generación de ficha de costo | Generar ficha de costo de ruta | Ficha generada y visible | Alta |
| TC-E2E-08 | Flujo de reoptimización | Simular incidencia y reoptimizar | Ruta reoptimizada en <5 segundos | Alta |
| TC-E2E-09 | Flujo de login fallido | Ingresar credenciales incorrectas | Mensaje de error mostrado | Alta |

### 3.17 🆕 Pruebas de SonarQube ⏳ PENDIENTE (SPRINT 5.5)

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-SONAR-01 | Análisis de deuda técnica | Ejecutar análisis de SonarQube | Deuda Técnica <5% | Alta |
| TC-SONAR-02 | Bugs críticos | Ejecutar análisis de SonarQube | Cero Bugs Críticos | Alta |
| TC-SONAR-03 | Vulnerabilidades | Ejecutar análisis de SonarQube | Cero Vulnerabilidades | Alta |
| TC-SONAR-04 | Código duplicado | Ejecutar análisis de SonarQube | <3% código duplicado | Media |
| TC-SONAR-05 | Cobertura de pruebas | Ejecutar análisis de SonarQube | Cobertura ≥70% | Alta |
| TC-SONAR-06 | CI/CD con SonarQube | Push a PR con calidad insuficiente | Pipeline falla | Alta |

---

## 4. PRUEBAS DE RENDIMIENTO

### 4.1 Objetivos de Rendimiento

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| Tiempo de carga de dashboard | <3 segundos | Lighthouse, Chrome DevTools |
| Optimización de rutas (50 envíos) | <30 segundos | Jest (tiempo de ejecución) |
| Importación de Excel (127 envíos) | <10 segundos | Jest (tiempo de ejecución) |
| Consulta de aduana (127 envíos) | <5 minutos | Jest (tiempo de ejecución) |
| Generación de ficha de costo | <5 segundos | Jest (tiempo de ejecución) |
| Sincronización offline (50 entregas) | <60 segundos | Jest (tiempo de ejecución) |
| API Concurrencia (10 req/s) | <500ms respuesta | K6 / Artillery |
| **🆕 Login/Refresh** | **<500ms** | **K6 / Artillery** |
| **🆕 Reoptimización dinámica** | **<5 segundos** | **Jest (tiempo de ejecución)** |
| **🆕 Predicción de IA** | **<2 segundos** | **Jest (tiempo de ejecución)** |
| **🆕 Análisis Post-Ruta** | **<3 segundos** | **Jest (tiempo de ejecución)** |

### 4.2 Escenarios de Carga

| ID | Escenario | Usuarios Concurrentes | Duración | Objetivo |
|----|-----------|----------------------|----------|----------|
| PE-01 | Optimización de rutas | 5 | 5 min | <30 segundos por solicitud |
| PE-02 | Consulta de aduana | 3 | 5 min | <5 minutos por lote |
| PE-03 | Dashboard | 10 | 10 min | <3 segundos de carga |
| PE-04 | Sincronización móvil | 10 | 10 min | <60 segundos por dispositivo |
| PE-05 | **🆕 Login/Refresh** | **20** | **5 min** | **<500ms por solicitud** |
| PE-06 | **🆕 Reoptimización dinámica** | **5** | **5 min** | **<5 segundos por solicitud** |
| PE-07 | **🆕 Análisis Post-Ruta** | **5** | **5 min** | **<3 segundos por solicitud** |

---

## 5. PRUEBAS DE SEGURIDAD

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TS-01 | Autenticación JWT válida | Login con credenciales correctas | Token JWT generado | Crítica |
| TS-02 | Autenticación JWT inválida | Login con credenciales incorrectas | 401 Unauthorized | Crítica |
| TS-03 | Acceso sin token | GET /api/envios sin token | 401 Unauthorized | Crítica |
| TS-04 | Acceso con token expirado | GET /api/envios con token expirado | 401 Unauthorized | Alta |
| TS-05 | Acceso con token inválido | GET /api/envios con token manipulado | 401 Unauthorized | Alta |
| TS-06 | Autorización por rol | Usuario Agencia intenta eliminar envío | 403 Forbidden | Crítica |
| TS-07 | Refresh token seguro | Verificar que refresh token sea aleatorio y seguro | Token generado correctamente | Alta |
| TS-08 | Rate limiting en login | 100 peticiones en 1 minuto | 429 Too Many Requests | Alta |
| TS-09 | Rate limiting en API | 1000 peticiones en 1 minuto | 429 Too Many Requests | Alta |
| TS-10 | Inyección SQL | Enviar SQL en parámetros | Inyección bloqueada | Crítica |
| TS-11 | XSS | Enviar scripts en campos | XSS bloqueado | Alta |
| TS-12 | Contraseña hasheada | Verificar en base de datos | Contraseña hasheada con bcrypt | Crítica |
| TS-13 | **🆕 API de reoptimización protegida** | Acceder sin token | 401 Unauthorized | Alta |
| TS-14 | **🆕 API de IA protegida** | Acceder sin token | 401 Unauthorized | Alta |
| TS-15 | **🆕 HTTPS obligatorio** | Acceder por HTTP | Redirige a HTTPS | Alta |
| TS-16 | **🆕 JWT_SECRET seguro** | Verificar que JWT_SECRET no sea el valor por defecto | Valor seguro y único | Crítica |

---

## 6. PRUEBAS DE USABILIDAD

### 6.1 Criterios de Éxito

| Métrica | Objetivo | Método |
|---------|----------|--------|
| Tiempo de entrenamiento chofer | <2 horas | Capacitación + observación |
| Tiempo de entrenamiento administrador | <4 horas | Capacitación + observación |
| Satisfacción del usuario | ≥4.5/5 | Encuesta formal |
| Tareas completadas sin asistencia | 100% | Pruebas de usabilidad |
| Errores críticos en piloto | 0 | Monitoreo de operación real |
| **🆕 Uso de reoptimización** | **>80% de adopción** | **Monitoreo de uso** |
| **🆕 Interpretación de análisis post-ruta** | **>70% comprensión** | **Encuesta de usabilidad** |
| **🆕 Facilidad de login** | **<30 segundos** | **Observación** |

### 6.2 Usuarios Piloto

| Perfil | Cantidad | Período | Objetivo |
|--------|----------|---------|----------|
| Choferes | 2-3 | 2 semanas | Validar usabilidad de app móvil y reoptimización |
| Jefe de Operaciones | 1 | 2 semanas | Validar planificación de rutas y análisis post-ruta |
| Administrador | 1 | 2 semanas | Validar dashboard y reportes de eficiencia |
| Agencia de Envíos | 1-2 | 2 semanas | Validar importación y tracking |

---

## 7. CRITERIOS DE ACEPTACIÓN POR MÓDULO

### 7.1 Módulo de Envíos ✅ IMPLEMENTADO

| # | Criterio | Estado |
|---|----------|--------|
| 1 | CRUD de clientes implementado y probado | ⏳ Pendiente |
| 2 | CRUD de envíos implementado y probado | ⏳ Pendiente |
| 3 | Importación de Excel con mapeo flexible | ⏳ Pendiente |
| 4 | Validación de Carnet (11 dígitos) | ⏳ Pendiente |
| 5 | Validación de Unidad de destino (obligatoria) | ⏳ Pendiente |
| 6 | Vista previa de importación (todos los registros) | ⏳ Pendiente |
| 7 | Reporte de errores en pantalla | ⏳ Pendiente |
| 8 | Historial por cliente con exportación PDF/CSV | ⏳ Pendiente |
| 9 | Todas las pruebas unitarias pasan | ⏳ Pendiente |
| 10 | Cobertura de código ≥70% | ⏳ Pendiente |

### 7.2 🆕 Módulo de Autenticación JWT ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Login con JWT y expiración de 24 horas | ⏳ Pendiente |
| 2 | Refresh token con expiración de 7 días | ⏳ Pendiente |
| 3 | Registro de usuarios con roles (5 perfiles) | ⏳ Pendiente |
| 4 | Protección de rutas con middleware de autenticación | ⏳ Pendiente |
| 5 | Hash de contraseñas con bcrypt | ⏳ Pendiente |
| 6 | Rate limiting para prevenir ataques de fuerza bruta | ⏳ Pendiente |
| 7 | Logout que revoca el token | ⏳ Pendiente |
| 8 | Registro de intentos de login fallidos en auditoría | ⏳ Pendiente |
| 9 | Todas las pruebas de autenticación pasan | ⏳ Pendiente |

### 7.3 🆕 Pruebas Unitarias ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Jest configurado en backend | ⏳ Pendiente |
| 2 | Vitest configurado en frontend | ⏳ Pendiente |
| 3 | Pruebas de ClienteService (backend) | ⏳ Pendiente |
| 4 | Pruebas de EnvioService (backend) | ⏳ Pendiente |
| 5 | Pruebas de ImportacionService (backend) | ⏳ Pendiente |
| 6 | Pruebas de AuthService (backend) | ⏳ Pendiente |
| 7 | Pruebas de API (frontend) | ⏳ Pendiente |
| 8 | Pruebas de componentes (frontend) | ⏳ Pendiente |
| 9 | Pruebas de store Zustand (frontend) | ⏳ Pendiente |
| 10 | Cobertura de código ≥70% | ⏳ Pendiente |

### 7.4 🆕 Módulo de SonarQube ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | SonarQube configurado en Docker Compose | ⏳ Pendiente |
| 2 | Integración con GitHub Actions | ⏳ Pendiente |
| 3 | Deuda Técnica <5% | ⏳ Pendiente |
| 4 | Cero Bugs Críticos | ⏳ Pendiente |
| 5 | Cero Vulnerabilidades | ⏳ Pendiente |
| 6 | Cobertura de código ≥70% | ⏳ Pendiente |
| 7 | Código duplicado <3% | ⏳ Pendiente |

### 7.5 Módulo de Aduana ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Consulta automática de costos de aduana | ⏳ Pendiente |
| 2 | ≥95% de envíos consultados en <5 minutos | ⏳ Pendiente |
| 3 | Asignación correcta de costos a cada envío | ⏳ Pendiente |
| 4 | Automatización en 4 horarios (8AM, 12PM, 4PM, 12AM) | ⏳ Pendiente |
| 5 | SOLO houses "Arribados" consultados | ⏳ Pendiente |
| 6 | Houses "Facturados" ignorados | ⏳ Pendiente |
| 7 | Cambio automático de "Arribado" a "Facturado" | ⏳ Pendiente |
| 8 | Registro de importe y factura | ⏳ Pendiente |
| 9 | Logs detallados de cada consulta | ⏳ Pendiente |
| 10 | Entrada manual de costos como contingencia | ⏳ Pendiente |

### 7.6 🆕 Módulo de Rutas (VRPTW v3.0) ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Ruta optimizada reduce distancia en ≥15% vs manual | ⏳ Pendiente |
| 2 | Tiempo de cálculo <30 segundos para ≤50 paradas | ⏳ Pendiente |
| 3 | 🆕 Optimización de combustible considera consumo específico | ⏳ Pendiente |
| 4 | 🆕 Envíos urgentes colocados en primeras 3 posiciones | ⏳ Pendiente |
| 5 | 🆕 Reoptimización en <5 segundos ante incidencias | ⏳ Pendiente |
| 6 | 🆕 Análisis post-ruta generado con métricas de eficiencia | ⏳ Pendiente |
| 7 | Mapa muestra ruta correctamente | ⏳ Pendiente |
| 8 | Drag and drop funciona correctamente | ⏳ Pendiente |
| 9 | Manifiesto de ruta generado en formato legible | ⏳ Pendiente |

### 7.7 Módulo de Ficha de Costo ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Generación de ficha en <5 segundos | ⏳ Pendiente |
| 2 | Incluye costos directos (combustible, peajes, mantenimiento, neumáticos, salario) | ⏳ Pendiente |
| 3 | Incluye costos indirectos (depreciación, seguros, administrativos, impuestos) | ⏳ Pendiente |
| 4 | Incluye costos de importación (aduana) | ⏳ Pendiente |
| 5 | Precisión de 2 decimales en todos los cálculos | ⏳ Pendiente |
| 6 | Exportación a PDF funcionando | ⏳ Pendiente |
| 7 | Exportación a CSV funcionando | ⏳ Pendiente |
| 8 | Cálculos auditables y reproducibles | ⏳ Pendiente |
| 9 | 🆕 Incluye combustible real vs estimado | ⏳ Pendiente |
| 10 | 🆕 Desviación de combustible calculada | ⏳ Pendiente |

### 7.8 🆕 Sistema de IA ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Modelo de regresión lineal implementado | ⏳ Pendiente |
| 2 | Precisión ≥85% en estimaciones de tiempo | ⏳ Pendiente |
| 3 | Reentrenamiento automático con nuevos datos | ⏳ Pendiente |
| 4 | Integración con el algoritmo de optimización de rutas | ⏳ Pendiente |

### 7.9 App Móvil ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Funciona sin internet (offline) | ⏳ Pendiente |
| 2 | Sincronización automática al recuperar conexión | ⏳ Pendiente |
| 3 | Registro de incidencias y costos en <3 clics | ⏳ Pendiente |
| 4 | Firma digital capturada correctamente | ⏳ Pendiente |
| 5 | Geolocalización enviada cuando hay conexión | ⏳ Pendiente |
| 6 | 🆕 Solicitud de reoptimización en <3 clics | ⏳ Pendiente |
| 7 | 🆕 Recepción de ruta reoptimizada en <5 segundos | ⏳ Pendiente |
| 8 | 🆕 Visualización de prioridad "Urgente" | ⏳ Pendiente |

### 7.10 Estándares de Codificación ✅ IMPLEMENTADO

| # | Criterio | Estado |
|---|----------|--------|
| 1 | ≥95% del código cumple con ESLint/Prettier | ✅ Cumplido |
| 2 | ≥95% del código cumple con Dart Analyzer | ✅ Cumplido |
| 3 | ≥80% de funciones públicas documentadas con JSDoc | ✅ Cumplido |
| 4 | API documentada con OpenAPI (Swagger) | ✅ Cumplido |
| 5 | Pipeline de CI/CD incluye verificación automática | ✅ Cumplido |
| 6 | Mensajes de commit siguen Conventional Commits | ✅ Cumplido |

### 7.11 Infraestructura ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Sistema funcionando en VPS ETECSA con Ubuntu 22.04 LTS | ⏳ Pendiente |
| 2 | SSL/HTTPS configurado con Let's Encrypt | ⏳ Pendiente |
| 3 | Redirección HTTP → HTTPS funcionando | ⏳ Pendiente |
| 4 | Nginx configurado como proxy inverso | ⏳ Pendiente |
| 5 | PM2 gestionando procesos Node.js | ⏳ Pendiente |
| 6 | Cron Jobs ejecutándose en horarios correctos | ⏳ Pendiente |
| 7 | App publicada en Google Play Store | ⏳ Pendiente |
| 8 | App publicada en APKlis | ⏳ Pendiente |
| 9 | Descarga directa de APK disponible | ⏳ Pendiente |

---

## 8. HERRAMIENTAS DE PRUEBA

| Herramienta | Propósito | Configuración | Estado |
|-------------|-----------|---------------|--------|
| **Jest** | Pruebas unitarias backend | `npm test` en backend | ✅ |
| **🆕 Vitest** | Pruebas unitarias frontend | `npm test` en frontend | ⏳ Pendiente |
| **Flutter Test** | Pruebas unitarias mobile | `flutter test` en mobile | ✅ |
| **Supertest** | Pruebas de integración API | `npm run test:integration` | ✅ |
| **🆕 Cypress** | Pruebas E2E frontend | `npm run test:e2e` | ⏳ Pendiente |
| **K6** | Pruebas de rendimiento | `k6 run script.js` | ⏳ Pendiente |
| **OWASP ZAP** | Pruebas de seguridad | Configuración en Docker | ⏳ Pendiente |
| **Lighthouse** | Rendimiento frontend | Extensión de Chrome | ✅ |
| **ESLint** | Análisis estático backend | `npm run lint` | ✅ |
| **ESLint-plugin-jsdoc** | Validación de JSDoc | `npm run lint:docs` | ✅ |
| **🆕 SonarQube** | Análisis de calidad general | Configuración en Docker | ⏳ Pendiente |
| **🆕 Jest + nock** | Pruebas de IA | `npm run test:ia` | ⏳ Pendiente |
| **🆕 Jest + cron-mock** | Pruebas de reoptimización | `npm run test:reopt` | ⏳ Pendiente |
| **🆕 Testing Library** | Pruebas de componentes React | `npm run test:components` | ⏳ Pendiente |

---

## 9. CRONOGRAMA DE PRUEBAS

| Fase | Período | Actividades | Responsable |
|------|---------|-------------|-------------|
| **Pruebas Unitarias** | Durante cada Sprint | Desarrollar y ejecutar pruebas unitarias | Desarrolladores |
| **Pruebas de Integración** | Fin de cada Sprint | Ejecutar pruebas de integración | Desarrolladores / QA |
| **Pruebas de Sistema** | Sprint 6 | Ejecutar E2E completos | QA |
| **Pruebas de Usabilidad (Piloto)** | Sprint 6 | Operación real con 2-3 usuarios | Usuarios Piloto |
| **Pruebas de Rendimiento** | Sprint 7 | Ejecutar pruebas de carga | QA |
| **Pruebas de Seguridad** | Sprint 7 | Ejecutar análisis de seguridad | QA |
| **Pruebas de Aceptación (UAT)** | Sprint 7 | Validación final por stakeholders | Stakeholders |
| **Pruebas de Infraestructura** | Sprint 6-7 | Verificar despliegue en VPS ETECSA | DevOps / QA |
| **Pruebas de Automatización Aduana** | Sprint 5-7 | Verificar 4 horarios, criterios y logs | QA |
| **Pruebas de Precisión Financiera** | Sprint 5-7 | Validar cálculos de ficha de costo y pagos | QA |
| **🆕 Pruebas de Autenticación JWT** | **Sprint 3-7** | **Validar login, refresh, roles** | **QA** |
| **🆕 Pruebas de Componentes Comunes** | **Sprint 2-7** | **Validar componentes reutilizables** | **QA** |
| **🆕 Pruebas de Store Zustand** | **Sprint 3-7** | **Validar gestión de estado global** | **QA** |
| **🆕 Pruebas de VRPTW v3.0** | **Sprint 2-7** | **Validar optimización de combustible, prioridad, reoptimización** | **QA** |
| **🆕 Pruebas de Sistema de IA** | **Sprint 5-7** | **Validar precisión del modelo de estimación** | **QA** |
| **🆕 Pruebas de Análisis Post-Ruta** | **Sprint 4-7** | **Validar métricas de eficiencia** | **QA** |
| **🆕 Pruebas de SonarQube** | **Sprint 5.5-7** | **Validar métricas de calidad** | **QA / DevOps** |
| **🆕 Pruebas E2E con Cypress** | **Sprint 6-7** | **Validar flujos críticos** | **QA** |

---

## 10. REPORTE DE DEFECTOS

### 10.1 Escala de Severidad

| Nivel | Descripción | Ejemplo | Tiempo de Resolución |
|-------|-------------|---------|---------------------|
| **S1 - Crítico** | Bloquea funcionalidad principal | No se puede importar manifiesto, reoptimización no funciona, **login no funciona** | <24 horas |
| **S2 - Alto** | Afecta funcionalidad importante | Cálculo de ficha de costo incorrecto, IA con baja precisión, **refresh token falla** | <48 horas |
| **S3 - Medio** | Afecta funcionalidad secundaria | Error en exportación a CSV, **error en componente común** | <1 semana |
| **S4 - Bajo** | Problema estético o de usabilidad | Color de botón incorrecto, **texto de error poco claro** | <2 semanas |
| **🆕 S1 - Crítico IA** | Modelo de IA no funciona | Predicciones de tiempo fallan | <24 horas |
| **🆕 S2 - Alto Reopt** | Reoptimización excede 5 segundos | Tiempo de respuesta >5 segundos | <48 horas |
| **🆕 S1 - Crítico Seguridad** | Vulnerabilidad de seguridad | **JWT_SECRET expuesto, inyección SQL** | <12 horas |
| **🆕 S2 - Alto Calidad** | SonarQube detecta bug crítico | **Bug crítico en SonarQube** | <48 horas |

### 10.2 Plantilla de Reporte de Defecto

```markdown
## 🐛 REPORTE DE DEFECTO - SIGMA-T

**ID:** DEF-XXX
**Fecha:** dd/mm/yyyy
**Reportado por:** Nombre
**Severidad:** S1 / S2 / S3 / S4
**Módulo:** Envíos / Rutas / Aduana / Ficha de Costo / App / Dashboard / VRPTW / IA / Reoptimización / Autenticación / Componentes / Store / SonarQube

### Descripción
[Descripción clara del problema]

### Pasos para Reproducir
1. Paso 1
2. Paso 2
3. Paso 3

### Resultado Esperado
[Lo que debería pasar]

### Resultado Actual
[Lo que realmente pasa]

### Evidencia
- [ ] Captura de pantalla
- [ ] Logs
- [ ] Video
- [ ] 🆕 Métricas de IA
- [ ] 🆕 Reporte de SonarQube

### Entorno
- Navegador: Chrome/Firefox/Edge
- Versión: X.X.X
- Dispositivo: Android/iOS
- 🆕 Token JWT: [Válido / Expirado / Ausente]

### Notas Adicionales
[Cualquier información adicional]
```

---

## 11. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| **Líder del Proyecto** | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| **Ingeniero de QA** | Equipo SIGMA-T | _________ | ___/___/2026 |

---

## 📌 CONCLUSIÓN

Este Plan de Pruebas Versión 2.1 ahora incluye:

- ✅ **Estrategia general de pruebas** con pirámide actualizada
- ✅ **170+ casos de prueba** documentados (20+ nuevos)
- ✅ **🆕 17 nuevos casos de prueba** para autenticación JWT (TC-AUTH-01 a TC-AUTH-17)
- ✅ **🆕 15 nuevos casos de prueba** para componentes comunes (TC-COM-01 a TC-COM-15)
- ✅ **🆕 6 nuevos casos de prueba** para store Zustand (TC-STOR-01 a TC-STOR-06)
- ✅ **🆕 10 nuevos casos de prueba** para pruebas unitarias (TC-UNIT-01 a TC-UNIT-10)
- ✅ **🆕 9 nuevos casos de prueba** para E2E con Cypress (TC-E2E-01 a TC-E2E-09)
- ✅ **🆕 6 nuevos casos de prueba** para SonarQube (TC-SONAR-01 a TC-SONAR-06)
- ✅ **🆕 Nuevos objetivos de rendimiento** para login/refresh (<500ms)
- ✅ **🆕 Nuevas pruebas de seguridad** para JWT, refresh token y HTTPS
- ✅ **🆕 Nuevos criterios de aceptación** para autenticación, pruebas unitarias, SonarQube
- ✅ **🆕 Nuevas herramientas de prueba** (Vitest, Cypress, Testing Library)
- ✅ **🆕 Cronograma de pruebas** actualizado con nuevas fases
- ✅ **🆕 Nueva escala de severidad** para seguridad y calidad

**Próximos Pasos:**
1. Configurar herramientas de prueba (Jest, Vitest, Supertest, Cypress, K6, SonarQube)
2. Implementar pruebas unitarias durante cada Sprint
3. Implementar pruebas de autenticación en Sprint 3
4. Implementar pruebas de componentes en Sprint 2
5. Implementar pruebas de store en Sprint 3
6. Ejecutar pruebas de integración al final de cada Sprint
7. Realizar pruebas de sistema en Sprint 6
8. Configurar SonarQube en Sprint 5.5
9. Validación final con usuarios piloto
10. Pruebas de infraestructura en VPS ETECSA
11. Pruebas de precisión financiera (ficha de costo, pagos a choferes)
12. Pruebas de automatización de aduana (4 horarios, criterios)
13. **🆕 Pruebas de Autenticación JWT** (login, refresh, roles, protección de rutas)
14. **🆕 Pruebas de VRPTW v3.0** (optimización de combustible, prioridad, reoptimización)
15. **🆕 Pruebas del Sistema de IA** (precisión del modelo de estimación)
16. **🆕 Pruebas de Análisis Post-Ruta** (métricas de eficiencia)
17. **🆕 Pruebas E2E con Cypress** (flujos críticos)
18. **🆕 Pruebas de SonarQube** (deuda técnica, seguridad, cobertura)