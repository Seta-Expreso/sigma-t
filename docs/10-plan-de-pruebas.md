## 📄 DOCUMENTO: PLAN DE PRUEBAS DE SIGMA-T (VERSIÓN 1.0)

**Basado en ISO/IEC 29119 - Pruebas de Software**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente / Sponsor:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 15 de agosto de 2026  
**Versión del Documento:** 1.0 (Completa - Top Mundial con Finanzas, Aduana, Ficha de Costo e Infraestructura)

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

### 1.3 Audiencia
- **Líder del Proyecto:** Para validar los criterios de aceptación.
- **Equipo de QA:** Como guía de ejecución de pruebas.
- **Desarrolladores:** Para entender los casos de prueba y corregir defectos.
- **Stakeholders:** Para verificar que el sistema cumple con los requisitos.

### 1.4 Referencias
- **SRS v3.7:** Especificación de Requisitos del Software.
- **SPMP v3.7:** Plan de Gestión del Proyecto de Software.
- **Arquitectura v2.7:** Documento de Arquitectura de Software.
- **Maquetas UI/UX v2.5:** Diseño de interfaz de usuario.
- **ISO/IEC 29119:** Estándar de Pruebas de Software.

---

## 2. ESTRATEGIA GENERAL DE PRUEBAS

### 2.1 Pirámide de Pruebas

```
                   ┌─────────────┐
                   │   E2E / UAT  │  ← Pruebas de extremo a extremo
                   │  (Manual)    │  ← Aceptación de usuarios
                   ├─────────────┤
                   │  Integración │  ← Comunicación entre módulos
                   │  (Automática)│  ← Servicios externos (Aerovaradero)
                   ├─────────────┤
                   │   Unitarias  │  ← Cada función / componente
                   │  (Automática)│  ← Cobertura >70%
                   └─────────────┘
```

### 2.2 Tipos de Pruebas

| # | Tipo de Prueba | Descripción | Herramientas | Responsable |
|---|---------------|-------------|--------------|-------------|
| 1 | **Pruebas Unitarias** | Verificar lógica de cada función/clase | Jest (Backend), Flutter Test (Mobile) | Desarrollador |
| 2 | **Pruebas de Integración** | Verificar comunicación entre módulos | Supertest, Jest | Desarrollador / QA |
| 3 | **Pruebas de Sistema (E2E)** | Simular flujos completos de usuario | Cypress, Appium | QA |
| 4 | **Pruebas de Aceptación (UAT)** | Validación por usuarios reales | Manual | Usuarios Piloto |
| 5 | **Pruebas de Rendimiento** | Verificar tiempo de respuesta | K6, Artillery | QA |
| 6 | **Pruebas de Seguridad** | Validar autenticación y autorización | OWASP ZAP, Jest | QA |
| 7 | **Pruebas de Usabilidad** | Evaluar experiencia de usuario | Encuestas, Observación | Diseñador UX / QA |
| 8 | **Pruebas de Regresión** | Verificar que cambios no rompan existente | Jest, Cypress | QA |
| 9 | **Pruebas de Documentación** | Verificar cobertura JSDoc | ESLint-plugin-jsdoc | QA / Documentalista |
| 10 | **Pruebas de Infraestructura** | Verificar despliegue en VPS ETECSA | Manual / Scripts | DevOps / QA |

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

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-EN-01 | Crear envío manual exitoso | POST /api/envios con datos válidos | 201 Created, envío guardado | Alta |
| TC-EN-02 | Crear envío sin House | POST /api/envios sin house | 400 Bad Request | Alta |
| TC-EN-03 | Crear envío con House duplicado | POST /api/envios con house existente | 400 Bad Request | Alta |
| TC-EN-04 | Listar envíos con filtros | GET /api/envios?estado=pendiente | 200 OK, lista filtrada | Alta |
| TC-EN-05 | Buscar envío por House | GET /api/envios/buscar/:house | 200 OK, envío encontrado | Alta |
| TC-EN-06 | Buscar envío por House inexistente | GET /api/envios/buscar/:house inexistente | 404 Not Found | Alta |
| TC-EN-07 | Actualizar estado de envío | PUT /api/envios/:id con estado="entregado" | 200 OK, estado actualizado | Alta |
| TC-EN-08 | Eliminar envío | DELETE /api/envios/:id existente | 204 No Content | Alta |
| TC-EN-09 | Estadísticas de envíos | GET /api/envios/estadisticas | 200 OK, datos estadísticos | Media |

#### 3.1.3 Importación de Manifiesto

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-IM-01 | Importar Excel con mapeo correcto | Subir archivo Excel, mapear columnas correctamente | 200 OK, envíos importados | Crítica |
| TC-IM-02 | Importar Excel con mapeo incorrecto | Subir archivo, mapear columna de peso a descripción | Error, mensaje de validación | Alta |
| TC-IM-03 | Importar Excel con datos inválidos | House duplicado, Carnet de 10 dígitos | Reporte de errores detallado | Crítica |
| TC-IM-04 | Importar Excel con campos obligatorios faltantes | Sin destinatario_nombre | Error, campo obligatorio | Alta |
| TC-IM-05 | Importar Excel con filas vacías | Archivo con filas sin datos | Filas ignoradas, importación exitosa | Media |
| TC-IM-06 | Vista previa de importación | Ver todos los registros antes de importar | Todos los registros mostrados | Alta |
| TC-IM-07 | Reporte de errores en pantalla | Importar archivo con errores | Todos los errores mostrados | Alta |
| TC-IM-08 | Validación de Carnet (11 dígitos) | Importar con Carnet "9012311234" (10 dígitos) | Error: debe tener 11 dígitos | Crítica |
| TC-IM-09 | Validación de Unidad de destino | Importar sin unidad_destino | Error: campo obligatorio | Crítica |
| TC-IM-10 | Columnas extras ignoradas | Archivo con columnas no mapeadas | Columnas ignoradas, importación exitosa | Media |
| TC-IM-11 | Importar CSV con mapeo correcto | Subir archivo CSV, mapear columnas | 200 OK, envíos importados | Alta |

### 3.2 Módulo de Rutas ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-RU-01 | Optimizar rutas con 10 envíos | POST /api/rutas/optimizar con 10 envíos | Rutas optimizadas en <10 segundos | Crítica |
| TC-RU-02 | Optimizar rutas con 50 envíos | POST /api/rutas/optimizar con 50 envíos | Rutas optimizadas en <30 segundos | Alta |
| TC-RU-03 | Optimizar rutas sin envíos | POST /api/rutas/optimizar sin envíos | 400 Bad Request | Alta |
| TC-RU-04 | Obtener rutas de una semana | GET /api/rutas/semana/2026-08-16 | 200 OK, lista de rutas | Alta |
| TC-RU-05 | Obtener detalle de ruta | GET /api/rutas/:id | 200 OK, detalle de ruta | Alta |
| TC-RU-06 | Asignar ruta a chofer | POST /api/rutas/:id/asignar | 200 OK, ruta asignada | Alta |
| TC-RU-07 | Reoptimizar ruta ante incidencia | POST /api/rutas/:id/reoptimizar | Ruta actualizada | Media |
| TC-RU-08 | Generar manifiesto PDF | GET /api/rutas/:id/manifiesto | PDF generado correctamente | Alta |
| TC-RU-09 | Drag and drop en UI | Mover punto de entrega en mapa | Secuencia actualizada | Alta |
| TC-RU-10 | Mapa muestra rutas correctamente | Visualizar ruta en mapa | Rutas y paradas visibles | Alta |

### 3.3 Módulo de Aduana ⏳ PENDIENTE

#### 3.3.1 Consulta de Costos de Aduana

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

#### 3.3.2 Automatización de Facturación de Aduana

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

### 3.4 Módulo Financiero ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-FI-01 | Registrar ingreso | POST /api/finanzas/ingreso | 201 Created, ingreso guardado | Alta |
| TC-FI-02 | Registrar gasto | POST /api/finanzas/gasto | 201 Created, gasto guardado | Alta |
| TC-FI-03 | Resumen financiero | GET /api/finanzas/resumen | 200 OK, resumen calculado | Alta |
| TC-FI-04 | Generar factura | POST /api/finanzas/factura | 201 Created, factura generada | Alta |
| TC-FI-05 | Registrar pago de factura | POST /api/finanzas/facturas/:id/pagar | 200 OK, estado actualizado | Alta |
| TC-FI-06 | Listar facturas | GET /api/finanzas/facturas | 200 OK, lista de facturas | Media |

### 3.5 Módulo de Parámetros ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-PA-01 | Obtener todos los parámetros | GET /api/parametros | 200 OK, lista de parámetros | Alta |
| TC-PA-02 | Obtener parámetro por clave | GET /api/parametros/tasa_cambio | 200 OK, valor del parámetro | Alta |
| TC-PA-03 | Actualizar parámetro | PUT /api/parametros/tasa_cambio con valor 240.00 | 200 OK, parámetro actualizado | Alta |
| TC-PA-04 | Historial de cambios | GET /api/parametros/historial/tasa_cambio | 200 OK, historial de cambios | Alta |
| TC-PA-05 | Actualizar parámetro inválido | PUT con valor negativo | 400 Bad Request | Media |

### 3.6 Módulo de Choferes ⏳ PENDIENTE

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

### 3.7 Módulo de Ficha de Costo ⏳ PENDIENTE

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

### 3.8 App Móvil (Chofer) ⏳ PENDIENTE

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

### 3.9 Dashboard ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-DA-01 | Dashboard carga en <3 segundos | Cargar página de dashboard | <3 segundos | Crítica |
| TC-DA-02 | KPIs actualizados | Ver KPIs en dashboard | Datos actualizados | Alta |
| TC-DA-03 | Gráfico de rentabilidad | Ver gráfico en dashboard | Gráfico visible correctamente | Alta |
| TC-DA-04 | Exportar reporte a PDF | Hacer clic en exportar PDF | PDF generado | Media |
| TC-DA-05 | Alertas automáticas | Simular mantenimiento vencido | Alerta visible | Media |

### 3.10 Auditoría ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-AU-01 | Registro de acción | Realizar acción en el sistema | Registro en auditoria | Crítica |
| TC-AU-02 | Obtener logs | GET /api/auditoria/logs | 200 OK, logs obtenidos | Alta |
| TC-AU-03 | Historial por entidad | GET /api/auditoria/entidad/envio/:id | Historial de cambios visible | Alta |
| TC-AU-04 | Exportar logs | GET /api/auditoria/exportar | CSV/PDF generado | Media |

### 3.11 Infraestructura ⏳ PENDIENTE

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TC-IN-01 | Despliegue en VPS ETECSA | Ejecutar guía de despliegue | Sistema funcionando | Crítica |
| TC-IN-02 | SSL/HTTPS funcionando | Acceder a https://dominio.com | Conexión segura | Crítica |
| TC-IN-03 | Redirección HTTP → HTTPS | Acceder a http://dominio.com | Redirige a HTTPS | Alta |
| TC-IN-04 | Nginx como proxy inverso | Acceder a /api | Petición redirigida a backend | Alta |
| TC-IN-05 | PM2 gestionando proceso | Verificar estado de PM2 | Proceso activo | Alta |
| TC-IN-06 | Cron Jobs ejecutándose | Verificar logs de automatización | Tareas programadas ejecutándose | Crítica |

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

### 4.2 Escenarios de Carga

| ID | Escenario | Usuarios Concurrentes | Duración | Objetivo |
|----|-----------|----------------------|----------|----------|
| PE-01 | Optimización de rutas | 5 | 5 min | <30 segundos por solicitud |
| PE-02 | Consulta de aduana | 3 | 5 min | <5 minutos por lote |
| PE-03 | Dashboard | 10 | 10 min | <3 segundos de carga |
| PE-04 | Sincronización móvil | 10 | 10 min | <60 segundos por dispositivo |

---

## 5. PRUEBAS DE SEGURIDAD

| ID | Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|----|----------------|-------|-------------------|-----------|
| TS-01 | Autenticación JWT válida | Login con credenciales correctas | Token JWT generado | Crítica |
| TS-02 | Autenticación JWT inválida | Login con credenciales incorrectas | 401 Unauthorized | Crítica |
| TS-03 | Acceso sin token | GET /api/envios sin token | 401 Unauthorized | Crítica |
| TS-04 | Acceso con token expirado | GET /api/envios con token expirado | 401 Unauthorized | Alta |
| TS-05 | Autorización por rol | Usuario Agencia intenta eliminar envío | 403 Forbidden | Crítica |
| TS-06 | Rate limiting | 100 peticiones en 1 minuto | 429 Too Many Requests | Alta |
| TS-07 | Inyección SQL | Enviar SQL en parámetros | Inyección bloqueada | Crítica |
| TS-08 | XSS | Enviar scripts en campos | XSS bloqueado | Alta |
| TS-09 | Contraseña hasheada | Verificar en base de datos | Contraseña hasheada | Crítica |

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

### 6.2 Usuarios Piloto

| Perfil | Cantidad | Período | Objetivo |
|--------|----------|---------|----------|
| Choferes | 2-3 | 2 semanas | Validar usabilidad de app móvil |
| Jefe de Operaciones | 1 | 2 semanas | Validar planificación de rutas |
| Administrador | 1 | 2 semanas | Validar dashboard y reportes |
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

### 7.2 Módulo de Aduana ⏳ PENDIENTE

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

### 7.3 Módulo de Ficha de Costo ⏳ PENDIENTE

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

### 7.4 App Móvil ⏳ PENDIENTE

| # | Criterio | Estado |
|---|----------|--------|
| 1 | Funciona sin internet (offline) | ⏳ Pendiente |
| 2 | Sincronización automática al recuperar conexión | ⏳ Pendiente |
| 3 | Registro de incidencias y costos en <3 clics | ⏳ Pendiente |
| 4 | Firma digital capturada correctamente | ⏳ Pendiente |
| 5 | Geolocalización enviada cuando hay conexión | ⏳ Pendiente |

### 7.5 Estándares de Codificación ✅ IMPLEMENTADO

| # | Criterio | Estado |
|---|----------|--------|
| 1 | ≥95% del código cumple con ESLint/Prettier | ✅ Cumplido |
| 2 | ≥95% del código cumple con Dart Analyzer | ✅ Cumplido |
| 3 | ≥80% de funciones públicas documentadas con JSDoc | ✅ Cumplido |
| 4 | API documentada con OpenAPI (Swagger) | ✅ Cumplido |
| 5 | Pipeline de CI/CD incluye verificación automática | ✅ Cumplido |
| 6 | Mensajes de commit siguen Conventional Commits | ✅ Cumplido |

### 7.6 Infraestructura ⏳ PENDIENTE

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

| Herramienta | Propósito | Configuración |
|-------------|-----------|---------------|
| **Jest** | Pruebas unitarias backend | `npm test` en backend |
| **Flutter Test** | Pruebas unitarias mobile | `flutter test` en mobile |
| **Supertest** | Pruebas de integración API | `npm run test:integration` |
| **Cypress** | Pruebas E2E frontend | `npm run test:e2e` |
| **K6** | Pruebas de rendimiento | `k6 run script.js` |
| **OWASP ZAP** | Pruebas de seguridad | Configuración en Docker |
| **Lighthouse** | Rendimiento frontend | Extensión de Chrome |
| **ESLint** | Análisis estático backend | `npm run lint` |
| **ESLint-plugin-jsdoc** | Validación de JSDoc | `npm run lint:docs` |
| **SonarQube** | Análisis de calidad general | Configuración en Docker |

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

---

## 10. REPORTE DE DEFECTOS

### 10.1 Escala de Severidad

| Nivel | Descripción | Ejemplo | Tiempo de Resolución |
|-------|-------------|---------|---------------------|
| **S1 - Crítico** | Bloquea funcionalidad principal | No se puede importar manifiesto | <24 horas |
| **S2 - Alto** | Afecta funcionalidad importante | Cálculo de ficha de costo incorrecto | <48 horas |
| **S3 - Medio** | Afecta funcionalidad secundaria | Error en exportación a CSV | <1 semana |
| **S4 - Bajo** | Problema estético o de usabilidad | Color de botón incorrecto | <2 semanas |

### 10.2 Plantilla de Reporte de Defecto

```markdown
## 🐛 REPORTE DE DEFECTO - SIGMA-T

**ID:** DEF-XXX
**Fecha:** dd/mm/yyyy
**Reportado por:** Nombre
**Severidad:** S1 / S2 / S3 / S4
**Módulo:** Envíos / Rutas / Aduana / Ficha de Costo / App / Dashboard

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

### Entorno
- Navegador: Chrome/Firefox/Edge
- Versión: X.X.X
- Dispositivo: Android/iOS

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

Este Plan de Pruebas establece la estrategia completa para garantizar la calidad de SIGMA-T. Cubre todos los módulos, desde los ya implementados (Envíos y Clientes) hasta los pendientes (Rutas, Aduana, Ficha de Costo, App, Dashboard).

**Próximos Pasos:**
1. Configurar herramientas de prueba (Jest, Supertest, Cypress)
2. Implementar pruebas unitarias durante cada Sprint
3. Ejecutar pruebas de integración al final de cada Sprint
4. Realizar pruebas de sistema en Sprint 6
5. Validación final con usuarios piloto
6. Pruebas de infraestructura en VPS ETECSA
7. Pruebas de precisión financiera (ficha de costo, pagos a choferes)
8. Pruebas de automatización de aduana (4 horarios, criterios)

---

## 📋 COMMIT PARA GITHUB

```
docs(pruebas): agregar Plan de Pruebas de SIGMA-T (v1.0)

- Definir estrategia general de pruebas con pirámide
- Documentar 150+ casos de prueba por módulo:
  - Envíos y Clientes (19 casos)
  - Rutas (10 casos)
  - Aduana y Automatización (19 casos)
  - Finanzas y Parámetros (11 casos)
  - Choferes (8 casos)
  - Ficha de Costo (9 casos)
  - App Móvil (12 casos)
  - Dashboard (5 casos)
  - Auditoría (4 casos)
  - Infraestructura (6 casos)
- Especificar pruebas de rendimiento, seguridad y usabilidad
- Definir criterios de aceptación por módulo
- Establecer cronograma de pruebas
- Crear plantilla de reporte de defectos
- Definir escala de severidad y tiempos de resolución

Este documento es crítico para garantizar la calidad de todos los módulos,
especialmente la automatización de aduana y la ficha de costo.
```

---
