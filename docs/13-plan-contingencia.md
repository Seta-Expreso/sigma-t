## 📄 DOCUMENTO: PLAN DE CONTINGENCIA Y RECUPERACIÓN - SIGMA-T (VERSIÓN 2.0)

**Basado en ISO 22301 - Gestión de Continuidad del Negocio**

**Proyecto:** SIGMA-T (Sistema Integral de Gestión para MiPYME de Transporte)  
**Cliente / Sponsor:** Osleyder Gonzalez Acosta  
**Fecha de Emisión:** 15 de agosto de 2026  
**Versión del Documento:** 2.0 (Completa - Top Mundial con VRPTW v3.0, Optimización de Combustible, Reoptimización Dinámica, IA y Análisis Post-Ruta)

---

## 1. INTRODUCCIÓN Y PROPÓSITO

### 1.1 Propósito del Documento
Este documento define las estrategias, procedimientos y planes de acción para garantizar la continuidad operativa del sistema SIGMA-T ante eventos adversos. Establece cómo prevenir, responder y recuperarse de incidentes que puedan afectar la disponibilidad, integridad o confidencialidad del sistema, incluyendo las nuevas funcionalidades de **VRPTW v3.0**, **optimización de combustible**, **reoptimización dinámica**, **sistema de IA** y **análisis post-ruta**.

### 1.2 Alcance
El plan de contingencia cubre:
- Fallas de infraestructura (VPS ETECSA)
- Fallas de servicios externos (Aerovaradero, OSRM, APIs de mapas)
- Pérdida de datos
- Incidentes de seguridad
- Errores críticos en el sistema
- Fallas en la automatización de aduana
- **🆕 Fallas en el algoritmo VRPTW v3.0**
- **🆕 Fallas en el sistema de reoptimización dinámica**
- **🆕 Fallas en el sistema de IA (estimación de tiempos)**
- **🆕 Fallas en el análisis post-ruta**
- Desastres naturales o humanos

### 1.3 Objetivos de Recuperación

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| **RTO (Recovery Time Objective)** | <4 horas | Tiempo máximo para restaurar el servicio |
| **RPO (Recovery Point Objective)** | <1 hora | Pérdida máxima de datos aceptable |
| **MTD (Maximum Tolerable Downtime)** | <8 horas | Tiempo máximo sin servicio antes de impacto crítico |
| **🆕 RTO (Reoptimización)** | <5 segundos | Tiempo máximo para reoptimizar una ruta |
| **🆕 RTO (IA)** | <2 segundos | Tiempo máximo para estimación de tiempos por IA |

---

## 2. ANÁLISIS DE RIESGOS Y ESCENARIOS

### 2.1 Escenarios de Contingencia

| ID | Escenario | Probabilidad | Impacto | Prioridad |
|----|-----------|--------------|---------|-----------|
| **E1** | Caída de VPS ETECSA | Media | Alto | **Crítica** |
| **E2** | Cambio en sitio web de Aerovaradero | Alta | Alto | **Crítica** |
| **E3** | Falla en automatización de aduana | Media | Alto | **Alta** |
| **E4** | Pérdida de datos en PostgreSQL | Baja | Crítico | **Crítica** |
| **E5** | Incidente de seguridad (brecha) | Baja | Crítico | **Crítica** |
| **E6** | Falla de OSRM (motor de rutas) | Media | Alto | **Alta** |
| **E7** | Error crítico en app móvil | Media | Alto | **Alta** |
| **E8** | Bloqueo de Google Play Store en Cuba | Alta | Medio | **Media** |
| **E9** | Desastre natural (inundación, incendio) | Baja | Crítico | **Media** |
| **E10** | Falla humana (error de configuración) | Media | Alto | **Alta** |
| **🆕 E11** | **Falla en algoritmo VRPTW v3.0** | **Media** | **Alto** | **Alta** |
| **🆕 E12** | **Falla en reoptimización dinámica** | **Media** | **Alto** | **Alta** |
| **🆕 E13** | **Falla en sistema de IA** | **Media** | **Medio** | **Alta** |
| **🆕 E14** | **Falla en análisis post-ruta** | **Media** | **Medio** | **Media** |

---

## 3. PLANES DE CONTINGENCIA POR ESCENARIO

### 3.1 E1: Caída de VPS ETECSA

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | El servidor VPS de ETECSA deja de funcionar o es inaccesible |
| **Probabilidad** | Media |
| **Impacto** | Alto - Sistema completo inaccesible |
| **Tiempo de Recuperación** | <4 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Confirmar la caída (ping, acceso SSH) | DevOps | 5 min |
| 2 | Notificar al Líder del Proyecto | DevOps | 5 min |
| 3 | Activar servidor de contingencia (nube internacional) | DevOps | 30 min |
| 4 | Restaurar base de datos desde backup | DevOps | 30 min |
| 5 | Actualizar DNS para apuntar al servidor de contingencia | DevOps | 15 min |
| 6 | Verificar funcionamiento del sistema | QA | 30 min |
| 7 | Notificar a stakeholders que el sistema está operativo | Líder | 15 min |

**Plan de Contingencia (Servidor Alternativo):**

```bash
# Configuración del servidor de contingencia en DigitalOcean / AWS
# (Pre-configurado con los mismos servicios)

# 1. Levantar el servidor de contingencia
docker-compose -f docker-compose.contingency.yml up -d

# 2. Restaurar último backup
./scripts/restore-backup.sh /backups/latest.sql

# 3. Verificar servicios
curl https://api.sigma-t.com/health
```

**Prevención:**
- Monitoreo activo del VPS ETECSA (alertas en caída)
- Backups automáticos diarios en ubicación externa
- Servidor de contingencia configurado y probado trimestralmente

---

### 3.2 E2: Cambio en Sitio Web de Aerovaradero

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Aerovaradero modifica la estructura HTML de su sitio, rompiendo el web scraping |
| **Probabilidad** | Alta |
| **Impacto** | Alto - Consulta automática de costos de aduana falla |
| **Tiempo de Recuperación** | <24 horas (parche) / <1 hora (contingencia) |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo en consultas (alertas de error) | Sistema | Inmediato |
| 2 | Confirmar el cambio en Aerovaradero | DevOps / QA | 15 min |
| 3 | Activar contingencia: Entrada manual de costos | Líder | 15 min |
| 4 | Notificar a Agencias sobre la contingencia | Líder | 15 min |
| 5 | Analizar nueva estructura HTML | Backend | 2 horas |
| 6 | Actualizar scraper (Cheerio/Puppeteer) | Backend | 4-8 horas |
| 7 | Probar en staging | QA | 2 horas |
| 8 | Desplegar a producción | DevOps | 30 min |
| 9 | Desactivar contingencia | Líder | 15 min |

**Plan de Contingencia (Entrada Manual):**

```typescript
// backend/src/services/aduana.contingency.service.ts

async function consultarCostoAduanaManual(envioId: number, importe: number, factura: string): Promise<void> {
    // 1. Validar que el usuario tenga permiso de Administrador
    // 2. Actualizar el envío con el importe y factura ingresados manualmente
    // 3. Cambiar estado a "Facturado" si corresponde
    // 4. Registrar en auditoría la acción manual
    await actualizarEnvio(envioId, {
        importe_aduana: importe,
        numero_factura_aduana: factura,
        estado_aduana: 'consultado'
    });
    
    await registrarAuditoria({
        usuario: usuarioActual,
        accion: 'consulta_aduana_manual',
        detalle: { envioId, importe, factura }
    });
}
```

**Prevención:**
- Monitoreo periódico del sitio de Aerovaradero (semanal)
- Sistema de alertas de fallo en extracción
- Documentación de la estructura HTML para actualización rápida

---

### 3.3 E3: Falla en Automatización de Facturación de Aduana

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Los cron jobs de automatización de aduana fallan (no se ejecutan, errores en consultas, etc.) |
| **Probabilidad** | Media |
| **Impacto** | Alto - Houses no se facturan automáticamente |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo (alertas de cron job) | Sistema | Inmediato |
| 2 | Revisar logs de automatización | DevOps | 15 min |
| 3 | Ejecutar manualmente la automatización | DevOps | 15 min |
| 4 | Verificar que los houses se facturaron correctamente | QA | 30 min |
| 5 | Identificar causa raíz del fallo | Backend | 2 horas |
| 6 | Implementar solución | Backend | 4 horas |
| 7 | Probar en staging | QA | 2 horas |
| 8 | Desplegar a producción | DevOps | 30 min |

**Plan de Contingencia (Ejecución Manual):**

```bash
# Ejecutar manualmente el job de automatización
node /var/www/sigma-t/backend/dist/jobs/aduana.job.js

# Verificar logs
tail -f /var/log/sigma-t/automation.log

# Si hay errores, ejecutar con modo de depuración
node /var/www/sigma-t/backend/dist/jobs/aduana.job.js --debug
```

**Plan de Contingencia (Facturación Manual):**

```typescript
// backend/src/services/aduana.manual.service.ts

async function facturarHouseManual(house: string, importe: number, factura: string): Promise<void> {
    // 1. Buscar el house en la base de datos
    const envio = await buscarEnvioPorHouse(house);
    
    // 2. Validar que esté en estado "Arribado"
    if (envio.estado_aerovaradero !== 'Arribado') {
        throw new Error('El house debe estar en estado "Arribado" para facturar');
    }
    
    // 3. Actualizar el envío
    await actualizarEnvio(envio.id_envio, {
        estado_aerovaradero: 'Facturado',
        importe_aduana: importe,
        numero_factura_aduana: factura,
        fecha_ultima_consulta_aduana: new Date(),
        intentos_consulta_aduana: 0
    });
    
    // 4. Registrar en auditoría
    await registrarAuditoria({
        usuario: usuarioActual,
        accion: 'facturar_house_manual',
        detalle: { house, importe, factura }
    });
}
```

**Prevención:**
- Monitoreo activo de cron jobs (alertas en fallo)
- Logs detallados de cada ejecución
- Pruebas periódicas de la automatización
- Reintentos automáticos con backoff exponencial

---

### 3.4 E4: Pérdida de Datos en PostgreSQL

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Pérdida de datos en la base de datos PostgreSQL (corrupción, eliminación accidental, etc.) |
| **Probabilidad** | Baja |
| **Impacto** | Crítico - Pérdida de información de envíos, clientes, rutas, fichas de costo, métricas de IA |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Identificar la pérdida de datos | DevOps / DBA | 15 min |
| 2 | Detener el servicio para prevenir más pérdidas | DevOps | 5 min |
| 3 | Restaurar desde el último backup completo | DevOps | 30 min |
| 4 | Aplicar backups incrementales (si existen) | DevOps | 30 min |
| 5 | Verificar integridad de los datos restaurados | QA | 30 min |
| 6 | Reiniciar el servicio | DevOps | 5 min |
| 7 | Notificar a stakeholders | Líder | 15 min |

**Plan de Contingencia (Backups):**

```bash
# 1. Ubicar el backup más reciente
ls -la /backups/postgres/

# 2. Restaurar backup completo
pg_restore -d sigma_t -U admin /backups/postgres/sigma_t_$(date +%Y%m%d_%H%M%S).sql

# 3. Verificar integridad
psql -d sigma_t -U admin -c "SELECT COUNT(*) FROM envios;"
psql -d sigma_t -U admin -c "SELECT COUNT(*) FROM rutas;"
psql -d sigma_t -U admin -c "SELECT COUNT(*) FROM modelo_ia;"
```

**Estrategia de Backups:**

| Tipo | Frecuencia | Retención | Ubicación |
|------|------------|-----------|-----------|
| **Backup Completo** | Diario (2 AM) | 30 días | VPS ETECSA + S3 externo |
| **Backup Incremental** | Cada hora | 7 días | VPS ETECSA |
| **Backup de Logs** | Diario | 30 días | VPS ETECSA |
| **🆕 Backup de Modelo IA** | Semanal | 90 días | VPS ETECSA + S3 externo |

**Prevención:**
- Backups automáticos diarios e incrementales
- Almacenamiento en ubicación externa (fuera del VPS)
- Pruebas de restauración mensuales
- Auditoría de cambios en la base de datos

---

### 3.5 E5: Incidente de Seguridad (Brecha)

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Acceso no autorizado al sistema, robo de datos, ataque cibernético |
| **Probabilidad** | Baja |
| **Impacto** | Crítico - Datos sensibles expuestos, interrupción del servicio |
| **Tiempo de Recuperación** | Variable (depende de la naturaleza del ataque) |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar actividad sospechosa (alertas de seguridad) | Sistema | Inmediato |
| 2 | Aislar el sistema (desconectar de internet) | DevOps | 5 min |
| 3 | Notificar al Líder del Proyecto | DevOps | 5 min |
| 4 | Activar equipo de respuesta a incidentes | Líder | 15 min |
| 5 | Analizar el alcance de la brecha | Equipo Seguridad | 2 horas |
| 6 | Contener la brecha (cambiar contraseñas, revocar tokens) | DevOps | 30 min |
| 7 | Erradicar la causa raíz | Equipo Seguridad | 4 horas |
| 8 | Recuperar el sistema (reinstalar si es necesario) | DevOps | 2 horas |
| 9 | Notificar a stakeholders afectados | Líder | 1 hora |
| 10 | Implementar medidas de seguridad adicionales | Equipo Seguridad | 1 semana |

**Plan de Contingencia:**

```bash
# 1. Aislar el servidor
sudo ufw deny out
sudo ufw deny in

# 2. Cambiar todas las contraseñas
passwd admin
# Actualizar en .env

# 3. Revocar todos los tokens JWT
# (Cambiar JWT_SECRET en .env)

# 4. Rotar claves API
# (Actualizar todas las claves API en .env)

# 5. Analizar logs de acceso
grep "ERROR" /var/log/sigma-t/*.log
```

**Prevención:**
- HTTPS obligatorio (Let's Encrypt)
- Autenticación JWT con expiración
- Rate limiting para prevenir ataques de fuerza bruta
- Auditoría completa de todas las acciones
- Monitoreo de intentos de login fallidos
- Actualización regular de dependencias

---

### 3.6 E6: Falla de OSRM (Motor de Rutas)

*(Actualizado para VRPTW v3.0)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | OSRM deja de funcionar (caída, datos corruptos, timeout) |
| **Probabilidad** | Media |
| **Impacto** | Alto - No se pueden optimizar rutas con VRPTW v3.0 |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo en OSRM | Sistema | 5 min |
| 2 | Reiniciar servicio OSRM | DevOps | 5 min |
| 3 | Si persiste, restaurar datos de OSRM | DevOps | 30 min |
| 4 | Si falla el reinicio, usar alternativa (Nominatim para distancias) | Backend | 30 min |
| 5 | Planificación manual de rutas (contingencia) | Jefe de Operaciones | <1 hora |
| 6 | **🆕 Desactivar optimización de combustible** (usar distancias sin consumo) | Backend | 15 min |

**Plan de Contingencia (Alternativa de Distancias):**

```typescript
// backend/src/services/rutas.contingency.service.ts

async function calcularDistanciaAlternativa(origen: Coordenadas, destino: Coordenadas): Promise<number> {
    // 1. Si OSRM falla, usar fórmula de Haversine para distancia en línea recta
    const distancia = haversineDistance(origen, destino);
    
    // 2. Aplicar factor de corrección para caminos reales (1.3-1.5)
    const factorCorreccion = 1.4;
    
    // 3. Registrar que se usó método alternativo
    await registrarAuditoria({
        accion: 'distancia_alternativa',
        detalle: { origen, destino, distancia, factor: factorCorreccion }
    });
    
    return distancia * factorCorreccion;
}
```

**Plan de Contingencia (Planificación Manual):**

```markdown
## PLANIFICACIÓN MANUAL DE RUTAS

1. **Obtener lista de envíos pendientes** desde el sistema (dashboard de envíos)
2. **Agrupar por zona geográfica** usando mapa físico de Cuba
3. **Asignar vehículo y chofer** según disponibilidad
4. **Generar manifiesto manual** (Excel o papel)
5. **Registrar ruta en el sistema** cuando OSRM se recupere
6. **🆕 Priorizar urgentes manualmente** según lista de prioridades
```

**Prevención:**
- Monitoreo activo de OSRM
- Datos de Cuba pre-cargados y actualizados
- Servicio OSRM en contenedor independiente
- Pruebas periódicas de reinicio

---

### 3.7 E7: Error Crítico en App Móvil

*(Actualizado para reoptimización)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | La app móvil deja de funcionar (crash en startup, error en entrega, falla en reoptimización, etc.) |
| **Probabilidad** | Media |
| **Impacto** | Alto - Choferes no pueden registrar entregas ni solicitar reoptimización |
| **Tiempo de Recuperación** | <4 horas (parche) / <1 hora (rollback) |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar error en app (crashlytics, reporte de chofer) | Sistema / Líder | Inmediato |
| 2 | Verificar si es error generalizado o aislado | QA | 15 min |
| 3 | Si es generalizado, activar rollback a versión estable | Mobile Dev | 30 min |
| 4 | Si es aislado, guiar al chofer para resolver | Jefe de Operaciones | 15 min |
| 5 | Implementar parche (hotfix) | Mobile Dev | 2-4 horas |
| 6 | Publicar nueva versión en Play Store | Mobile Dev | 1 hora |
| 7 | Notificar a choferes sobre actualización | Líder | 15 min |
| 8 | **🆕 Si falla reoptimización, usar planificación manual alternativa** | **Jefe de Operaciones** | **15 min** |

**Plan de Contingencia (Registro Manual):**

```markdown
## REGISTRO MANUAL DE ENTREGAS

1. **Chofer** anota en papel cada entrega:
   - House
   - Destinatario
   - Fecha y hora
   - Estado (Entregado / Incidencia)
   - Firma (si aplica)
   - **🆕 Prioridad (Urgente/Normal/Economico)**

2. **Jefe de Operaciones** recibe el reporte al final del día

3. **Administrador** ingresa las entregas manualmente en el sistema

4. **🆕 Si hay urgentes, asignar manualmente a rutas prioritarias**

5. **Verificar** que los datos sean correctos

6. **Registrar** la incidencia en el sistema de auditoría
```

**Prevención:**
- Pruebas exhaustivas antes de cada release
- Beta testing con early adopters
- Crashlytics configurado para detección temprana
- Política de rollback rápido en caso de error

---

### 3.8 E8: Bloqueo de Google Play Store en Cuba

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Google Play Store bloqueada desde Cuba, choferes no pueden descargar la app |
| **Probabilidad** | Alta |
| **Impacto** | Medio - Choferes no pueden instalar la app |
| **Tiempo de Recuperación** | <1 hora |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Confirmar bloqueo (reporte de chofer) | Líder | 5 min |
| 2 | Activar canales alternativos de distribución | Líder | 15 min |
| 3 | Enviar enlace de descarga directa (APK) a choferes | Líder | 15 min |
| 4 | Verificar disponibilidad en APKlis | QA | 15 min |

**Plan de Contingencia (APK Directo):**

```html
<!-- sigma-t.com/download/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Descargar SIGMA-T</title>
</head>
<body>
    <h1>🚚 Descargar SIGMA-T</h1>
    
    <div>
        <h2>📱 Descarga Directa (APK)</h2>
        <a href="/downloads/sigma-t-v1.0.0.apk">Descargar APK (v1.0.0)</a>
        <p>Haz clic y permite la instalación desde fuentes desconocidas</p>
    </div>
    
    <div>
        <h2>📲 Tiendas Oficiales</h2>
        <a href="https://play.google.com/store/apps/details?id=com.sigma-t">Google Play Store</a>
        <a href="https://apklis.cu/app/com.sigma-t">APKlis</a>
    </div>
</body>
</html>
```

**Prevención:**
- Publicación en Google Play Store, APKlis y descarga directa
- Mantener APK firmado actualizado en el sitio web
- Comunicar a choferes los canales de descarga

---

### 3.9 E9: Desastre Natural

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Inundación, incendio, terremoto que afecta la oficina o el servidor |
| **Probabilidad** | Baja |
| **Impacto** | Crítico - Todo el sistema inaccesible |
| **Tiempo de Recuperación** | <24 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Activar plan de emergencia (evacuación si es necesario) | Líder | Inmediato |
| 2 | Confirmar que el sistema está en el servidor de contingencia | DevOps | 1 hora |
| 3 | Activar servidor de contingencia (nube internacional) | DevOps | 30 min |
| 4 | Restaurar datos desde backup externo | DevOps | 30 min |
| 5 | Establecer operaciones desde ubicación alternativa | Líder | 4 horas |

**Prevención:**
- Servidor de contingencia en nube internacional
- Backups en ubicación externa (S3, Google Cloud)
- Documentación de recuperación disponible fuera de la oficina
- Equipos de trabajo móviles (laptops)

---

### 3.10 E10: Falla Humana (Error de Configuración)

*(Se mantiene igual que en la versión anterior)*

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | Error humano al configurar el sistema (cambios incorrectos en .env, despliegue fallido, etc.) |
| **Probabilidad** | Media |
| **Impacto** | Alto - Sistema inaccesible o con errores |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Identificar el error | Equipo Dev | 15 min |
| 2 | Revertir el cambio (rollback de deploy / configuración) | DevOps | 15 min |
| 3 | Verificar que el sistema funciona correctamente | QA | 30 min |
| 4 | Documentar el error y la solución | Documentalista | 1 hora |

**Prevención:**
- Procedimientos documentados para cambios críticos
- Approval de cambios (al menos 2 personas)
- Entorno de staging para pruebas antes de producción
- Backups de archivos de configuración

---

### 🆕 3.11 E11: Falla en Algoritmo VRPTW v3.0

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | El algoritmo VRPTW v3.0 no produce rutas óptimas, genera errores o timeout |
| **Probabilidad** | Media |
| **Impacto** | Alto - No se pueden optimizar rutas con las nuevas funcionalidades |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo en el algoritmo (logs de error, timeout) | Sistema | 5 min |
| 2 | Verificar logs y métricas del algoritmo | Backend | 15 min |
| 3 | Si es timeout, aumentar límite de iteraciones temporalmente | Backend | 15 min |
| 4 | Si es error en optimización de combustible, desactivar temporalmente | Backend | 15 min |
| 5 | Si el problema persiste, usar versión anterior del algoritmo (VRPTW básico) | Backend | 30 min |
| 6 | Registrar incidencia y analizar causa raíz | Backend | 2 horas |
| 7 | Implementar solución y desplegar | Backend | 4 horas |

**Plan de Contingencia (Fallback a VRPTW Básico):**

```typescript
// backend/src/services/rutas.contingency.vrptw.ts

async function optimizarRutasFallback(envios: Envio[], vehiculos: Vehiculo[]): Promise<Ruta[]> {
    // 1. Usar algoritmo VRPTW básico (sin optimización de combustible)
    // 2. Ignorar prioridad de entregas (todas como normales)
    // 3. Usar distancias estándar sin considerar consumo
    // 4. Registrar que se usó el fallback
    await registrarAuditoria({
        accion: 'vrptw_fallback_activado',
        detalle: { motivo: 'Falla en VRPTW v3.0' }
    });

    return await optimizarRutasBasico(envios, vehiculos);
}
```

**Prevención:**
- Pruebas exhaustivas del algoritmo antes de cada release
- Monitoreo de tiempo de ejecución y errores
- Logs detallados del algoritmo
- Versión anterior disponible como fallback

---

### 🆕 3.12 E12: Falla en Reoptimización Dinámica

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | La reoptimización dinámica falla (no responde en <5 segundos, genera rutas incorrectas) |
| **Probabilidad** | Media |
| **Impacto** | Alto - Choferes no pueden reoptimizar rutas en tiempo real |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo en reoptimización (alertas de timeout) | Sistema | Inmediato |
| 2 | Verificar logs de reoptimización | Backend | 15 min |
| 3 | Si es timeout, aumentar límite temporalmente a 10 segundos | Backend | 15 min |
| 4 | Si el problema persiste, desactivar reoptimización automática | Backend | 15 min |
| 5 | Activar modo de reoptimización manual (Jefe de Operaciones) | Jefe de Operaciones | 15 min |
| 6 | Notificar a choferes que la reoptimización está en modo manual | Líder | 15 min |
| 7 | Implementar solución y desplegar | Backend | 4 horas |

**Plan de Contingencia (Reoptimización Manual):**

```markdown
## REOPTIMIZACIÓN MANUAL DE RUTAS

1. **Chofer** reporta incidencia a Jefe de Operaciones (WhatsApp/radio)
2. **Jefe de Operaciones** evalúa la incidencia:
   - Cliente no encontrado → eliminar entrega de la ruta
   - Tráfico → sugerir ruta alternativa
   - Nuevo pedido urgente → insertar en ruta actual
3. **Jefe de Operaciones** actualiza la ruta manualmente en el sistema
4. **Chofer** recibe la nueva ruta actualizada por WhatsApp
5. **Registrar** la reoptimización manual en el sistema de auditoría
```

**Prevención:**
- Pruebas de rendimiento de reoptimización (carga, estrés)
- Monitoreo de tiempo de respuesta de reoptimización
- Alertas en tiempo real de fallos
- Versión manual siempre disponible como fallback

---

### 🆕 3.13 E13: Falla en Sistema de IA

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | El sistema de IA (estimación de tiempos) falla o genera predicciones incorrectas |
| **Probabilidad** | Media |
| **Impacto** | Medio - Estimaciones de tiempo inexactas, afecta planificación |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo en IA (precisión <70%, errores en predicción) | Sistema | 5 min |
| 2 | Verificar logs del modelo de IA | Backend | 15 min |
| 3 | Activar fallback: usar estimación por defecto (tiempo promedio) | Backend | 15 min |
| 4 | Si el modelo está corrupto, restaurar versión anterior del modelo | Backend | 30 min |
| 5 | Registrar incidencia y analizar causa raíz | Backend | 2 horas |
| 6 | Reentrenar modelo con datos actualizados | Backend | 4 horas |
| 7 | Validar nueva precisión del modelo | QA | 2 horas |
| 8 | Desplegar nuevo modelo | DevOps | 30 min |

**Plan de Contingencia (Estimación por Defecto):**

```typescript
// backend/src/services/ia.contingency.service.ts

function estimarTiempoPorDefecto(envio: Envio): number {
    // 1. Usar tiempo promedio histórico
    const tiempoPromedio = obtenerTiempoPromedioHistorico();

    // 2. Aplicar factor por zona (rural > urbano)
    const factorZona = obtenerFactorZona(envio.unidad_destino);

    // 3. Registrar que se usó estimación por defecto
    await registrarAuditoria({
        accion: 'ia_fallback_activado',
        detalle: { envioId: envio.id_envio, motivo: 'Falla en modelo IA' }
    });

    return tiempoPromedio * factorZona;
}
```

**Prevención:**
- Monitoreo de precisión del modelo IA (alertas si <85%)
- Backups del modelo entrenado
- Reentrenamiento automático periódico
- Versión anterior del modelo disponible como fallback

---

### 🆕 3.14 E14: Falla en Análisis Post-Ruta

| Aspecto | Especificación |
|---------|----------------|
| **Descripción** | El análisis post-ruta no se genera correctamente (errores, métricas incorrectas) |
| **Probabilidad** | Media |
| **Impacto** | Medio - No se pueden obtener métricas de eficiencia |
| **Tiempo de Recuperación** | <2 horas |

**Procedimiento:**

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | Detectar fallo en análisis post-ruta (errores en logs) | Sistema | 5 min |
| 2 | Verificar logs del análisis | Backend | 15 min |
| 3 | Si el problema es de datos, verificar integridad de datos de ruta | QA | 30 min |
| 4 | Si el problema persiste, generar análisis básico (sin métricas avanzadas) | Backend | 30 min |
| 5 | Registrar incidencia y analizar causa raíz | Backend | 2 horas |
| 6 | Implementar solución y desplegar | Backend | 4 horas |

**Plan de Contingencia (Análisis Básico):**

```typescript
// backend/src/services/analisis.contingency.service.ts

function generarAnalisisBasico(ruta: Ruta): AnalisisBasico {
    // 1. Calcular solo métricas esenciales
    // 2. Ignorar métricas avanzadas (eficiencia por zona, etc.)
    // 3. Registrar que se usó análisis básico
    await registrarAuditoria({
        accion: 'analisis_post_ruta_fallback_activado',
        detalle: { rutaId: ruta.id_ruta }
    });

    return {
        distancia_total: ruta.distancia_total,
        tiempo_total: ruta.tiempo_total,
        entregas_completadas: ruta.entregas_completadas,
        // Métricas avanzadas omitidas
    };
}
```

**Prevención:**
- Pruebas de integridad de datos para análisis
- Logs detallados del proceso de análisis
- Generación automática de análisis básico como fallback

---

## 4. PLAN DE RECUPERACIÓN GENERAL

### 4.1 Pasos Generales de Recuperación

| Paso | Acción | Responsable | Tiempo |
|------|--------|-------------|--------|
| 1 | **Detección** - Confirmar el incidente | Sistema / Usuarios | Inmediato |
| 2 | **Notificación** - Informar al Líder y stakeholders | DevOps / Líder | 5 min |
| 3 | **Evaluación** - Determinar el alcance e impacto | Equipo Dev | 15 min |
| 4 | **Activación** - Activar el plan de contingencia correspondiente | Líder | 15 min |
| 5 | **Ejecución** - Implementar el plan de contingencia | Equipo Dev | Variable |
| 6 | **Verificación** - Verificar que el sistema funciona | QA | 30 min |
| 7 | **Cierre** - Notificar a stakeholders y documentar | Líder | 15 min |

### 4.2 Matriz de Activación de Contingencia

| Escenario | Acción Inmediata | Plan de Contingencia | Prioridad |
|-----------|------------------|---------------------|-----------|
| **Caída de VPS ETECSA** | Notificar a Líder | Servidor de contingencia | **Inmediato** |
| **Cambio en Aerovaradero** | Activar entrada manual | Actualizar scraper | **Inmediato** |
| **Falla en automatización** | Ejecutar manualmente | Facturación manual | **Inmediato** |
| **Pérdida de datos** | Detener servicio | Restaurar backup | **Inmediato** |
| **Incidente de seguridad** | Aislar sistema | Equipo de respuesta | **Inmediato** |
| **Falla de OSRM** | Reiniciar servicio | Distancias alternativas | **Alta** |
| **Error crítico en app** | Rollback / Hotfix | Registro manual | **Alta** |
| **Bloqueo de Play Store** | Activar descarga directa | APKlis | **Media** |
| **🆕 Falla VRPTW v3.0** | **Desactivar optimización** | **VRPTW básico** | **Alta** |
| **🆕 Falla reoptimización** | **Modo manual** | **Reoptimización manual** | **Alta** |
| **🆕 Falla IA** | **Activar fallback** | **Estimación por defecto** | **Alta** |
| **🆕 Falla análisis post-ruta** | **Generar análisis básico** | **Análisis básico** | **Media** |

---

## 5. COMUNICACIÓN DURANTE CONTINGENCIAS

### 5.1 Protocolo de Comunicación

| Evento | Canal | Mensaje | Audiencia |
|--------|-------|---------|-----------|
| **Detección de incidente** | WhatsApp | "⚠️ Se ha detectado [incidente]. Equipo de respuesta activado." | Líder, Equipo Dev |
| **Activación de contingencia** | WhatsApp / Correo | "🔧 Se activa plan de contingencia para [escenario]. Tiempo estimado: [X] horas." | Stakeholders |
| **Actualización de progreso** | WhatsApp / Correo | "📊 Progreso: [X]% completado. Próxima actualización en [X] horas." | Stakeholders |
| **Resolución del incidente** | WhatsApp / Correo | "✅ Incidente resuelto. Sistema operativo. Reporte detallado disponible." | Todos los stakeholders |

### 5.2 Plantilla de Comunicación de Incidente

```markdown
## 🚨 COMUNICACIÓN DE INCIDENTE - SIGMA-T

**ID:** INC-XXX
**Fecha:** [dd/mm/yyyy]
**Hora:** [hh:mm]
**Estado:** ⚠️ Activo / ✅ Resuelto

### 📋 Resumen
[Descripción clara del incidente y su impacto]

### 🔧 Acciones Tomadas
- [Acción 1] - [Estado]
- [Acción 2] - [Estado]

### ⏱️ Tiempo Estimado de Recuperación
[Fecha y hora estimada de resolución]

### 📌 Próximos Pasos
- [Acción 3]
- [Acción 4]

### 📝 Reporte Detallado
[Enlace al reporte completo]

### 📞 Contacto
- Líder del Proyecto: [Contacto]
- Equipo de Soporte: [Contacto]
```

---

## 6. PRUEBAS DE CONTINGENCIA

### 6.1 Calendario de Pruebas

| Prueba | Frecuencia | Responsable | Escenario |
|--------|------------|-------------|-----------|
| **Restauración de backups** | Mensual | DevOps | Pérdida de datos (E4) |
| **Servidor de contingencia** | Trimestral | DevOps | Caída de VPS (E1) |
| **Scraper de Aerovaradero** | Semanal (monitoreo) | Backend | Cambio en sitio (E2) |
| **Automatización de aduana** | Semanal (monitoreo) | Backend | Falla en automatización (E3) |
| **App Móvil (rollback)** | Trimestral | Mobile | Error crítico (E7) |
| **Plan de contingencia completo** | Semestral | Todos | Todos los escenarios |
| **🆕 VRPTW v3.0 (fallback)** | **Mensual** | **Backend** | **Falla VRPTW (E11)** |
| **🆕 Reoptimización (manual)** | **Mensual** | **Backend** | **Falla reoptimización (E12)** |
| **🆕 Sistema de IA** | **Mensual** | **Backend** | **Falla IA (E13)** |
| **🆕 Análisis post-ruta** | **Mensual** | **Backend** | **Falla análisis (E14)** |

### 6.2 Plantilla de Prueba de Contingencia

```markdown
## 📋 PRUEBA DE CONTINGENCIA - SIGMA-T

**Prueba ID:** PC-XXX
**Fecha:** [dd/mm/yyyy]
**Escenario:** [E1 / E2 / E3 / E4 / E5 / E6 / E7 / E8 / E9 / E10 / E11 / E12 / E13 / E14]
**Responsable:** [Nombre]

### 📋 Resultados

| Paso | Acción | Resultado | Tiempo |
|------|--------|-----------|--------|
| 1 | [Acción 1] | ✅ / ❌ | [X] min |
| 2 | [Acción 2] | ✅ / ❌ | [X] min |
| 3 | [Acción 3] | ✅ / ❌ | [X] min |

### ⏱️ Tiempos de Recuperación

| Métrica | Objetivo | Resultado | Cumple |
|---------|----------|-----------|--------|
| RTO | <4 horas | [X] horas | ✅ / ❌ |
| RPO | <1 hora | [X] minutos | ✅ / ❌ |
| **🆕 RTO Reoptimización** | **<5 segundos** | **[X] segundos** | **✅ / ❌** |
| **🆕 RTO IA** | **<2 segundos** | **[X] segundos** | **✅ / ❌** |

### 📝 Observaciones
[Observaciones, problemas encontrados, mejoras sugeridas]

### 📌 Próximos Pasos
- [Mejora 1]
- [Mejora 2]
```

---

## 7. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| **Líder del Proyecto** | Osleyder Gonzalez Acosta | _________ | ___/___/2026 |
| **DevOps Engineer** | Equipo SIGMA-T | _________ | ___/___/2026 |

---

## 📌 CONCLUSIÓN

Este Plan de Contingencia y Recuperación Versión 2.0 ahora incluye:

- ✅ **14 escenarios de contingencia** (4 nuevos: VRPTW v3.0, reoptimización, IA, análisis post-ruta)
- ✅ **Objetivos de recuperación actualizados** con RTO para reoptimización (<5 segundos) e IA (<2 segundos)
- ✅ **Planes específicos** para cada nuevo escenario
- ✅ **Procedimientos de fallback** para VRPTW v3.0, reoptimización, IA y análisis post-ruta
- ✅ **Calendario de pruebas actualizado** con pruebas para nuevas funcionalidades
- ✅ **Matriz de activación de contingencia** actualizada
- ✅ **Estrategia de backups** ampliada con backup de modelo IA

**El sistema SIGMA-T está preparado para recuperarse rápidamente ante cualquier eventualidad, incluyendo fallas en sus funcionalidades más avanzadas como VRPTW v3.0, reoptimización dinámica y sistema de IA.**

---
