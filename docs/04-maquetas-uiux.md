# 🎨 DOCUMENTO: MAQUETAS UI/UX - SIGMA-T (VERSIÓN 2.3 - TOP MUNDIAL CON FINANZAS, ADUANA, FICHA DE COSTO E INFRAESTRUCTURA - ACTUALIZACIÓN 14/08/2026)

**Inspiración:** McLeod Software, OptimoRoute, Turvo, diseño moderno 2026
**Herramientas de Referencia:** Figma / Adobe XD (para maquetación de alta fidelidad)  
**Fecha:** 14 de agosto de 2026
**Versión:** 2.3 (Completa - Top Mundial con Finanzas, Aduana, Ficha de Costo e Infraestructura - ACTUALIZACIÓN 14/08/2026)
**Total de Pantallas:** 21

---

## 1. IDENTIDAD VISUAL Y GUÍA DE ESTILO (Top Mundial)

### 1.1 Fundamentos de Diseño
- **Principio Rector:** "Claridad Operativa". Cada elemento debe servir a la toma de decisiones rápida y la ejecución eficiente.
- **Filosofía:** Minimalista, orientado a datos y a la acción. Reducir la carga cognitiva del usuario.
- **Accesibilidad:** Contraste suficiente (WCAG 2.1 AA), tamaños de fuente legibles, soporte para lectores de pantalla.
- **Consistencia:** Mismos patrones de interacción y diseño en toda la plataforma.

### 1.2 Paleta de Colores

| Color | Código Hex | Uso Principal |
| :--- | :--- | :--- |
| **Azul Marino (Primario)** | `#1a2a3a` | Barras de navegación, encabezados, elementos de alta jerarquía. |
| **Azul Eléctrico (Acción)** | `#00b4d8` | Botones principales, enlaces, elementos interactivos. |
| **Azul Claro (Secundario)** | `#e8f4f8` | Fondos de tarjetas seleccionadas, hover en tablas. |
| **Verde Éxito (Estado)** | `#2ecc71` | Indicadores de "completado", "entregado", "activo". |
| **Ámbar Alerta (Atención)** | `#f39c12` | Indicadores de "pendiente", "en progreso", "advertencia". |
| **Rojo Crítico (Error)** | `#e74c3c` | Indicadores de "incidencia", "crítico", "alto riesgo". |
| **Gris Neutro (Fondo)** | `#f8f9fa` | Fondos de página y tarjetas. |
| **Gris Medio (Bordes)** | `#e9ecef` | Líneas divisorias, bordes de tarjetas. |
| **Gris Oscuro (Texto)** | `#495057` | Texto secundario, etiquetas. |
| **Negro (Texto Primario)** | `#212529` | Texto principal, títulos. |
| **Blanco (Base)** | `#ffffff` | Contenido principal, áreas de lectura. |

### 1.3 Tipografía
- **Fuente Principal:** **Inter**. Elegida por su excelente legibilidad en pantalla y su estilo moderno y limpio. Es la tipografía utilizada por plataformas líderes como Figma.
- **Fuente Alternativa:** **System Font Stack** (fallback para dispositivos sin Inter).
- **Jerarquía:**
    - **Títulos:** Inter Bold, 24-32px.
    - **Subtítulos:** Inter Semibold, 18-20px.
    - **Cuerpo:** Inter Regular, 14-16px.
    - **Etiquetas y Datos:** Inter Medium, 12-14px.
    - **Énfasis:** Inter Semibold, 14-16px.

### 1.4 Componentes UI (Patrones de Diseño)
- **Tarjetas (Cards):** Se usarán para agrupar información relacionada, con sombras suaves para dar profundidad. Bordes redondeados de 8px.
- **Tablas:** Limpias, con filas alternadas y hover para facilitar la lectura de datos. Encabezados fijos.
- **Botones:** Claramente diferenciados por jerarquía (primario, secundario, peligro, éxito). Con estados hover, focus y active.
- **Formularios:** Etiquetas claras, validación en tiempo real, mensajes de error descriptivos.
- **Feedback Visual:** Uso de toast notifications y loaders para cada acción del usuario.
- **Iconos:** Librería Lucide o FontAwesome, siempre acompañados de texto descriptivo.
- **Gráficos:** Uso de Recharts para visualización de datos en dashboards y reportes.

### 1.5 Tamaños de Pantalla Soportados
- **Web:** Escritorio (≥1024px), Tablet (768-1024px), Móvil (≥320px) - diseño responsive.
- **App Móvil:** Smartphones (≥320px), Tablets (≥600px).

---

## 2. MAPA DE NAVEGACIÓN (SITEMAP) - ACTUALIZADO

```mermaid
flowchart TD
    D[Dashboard] --> E[Envíos]
    D --> R[Rutas]
    D --> F[Flota]
    D --> C[Choferes]
    D --> N[Finanzas]
    D --> P[Reportes]
    D --> A[Auditoría]
    D --> M[Marketing]
    D --> S[Configuración]

    E --> E1[Importar Manifiesto]
    E --> E2[Lista de Envíos]
    E --> E3[Detalle de Envío]

    R --> R1[Planificación Semanal]
    R --> R2[Mapa de Rutas]
    R --> R3[Manifiesto de Ruta]
    R --> R4[Ficha de Costo]

    F --> F1[Gestión de Vehículos]
    F --> F2[Mantenimiento]

    C --> C1[Gestión de Choferes]
    C --> C2[Desempeño]

    N --> N1[Ingresos y Gastos]
    N --> N2[Facturación]
    N --> N3[Parámetros Financieros y Aduana]

    S --> S1[Parámetros del Sistema]
```

---

## 3. MAQUETAS DE ALTA FIDELIDAD (21 PANTALLAS)

### 3.1 MAQUETA 1: DASHBOARD PRINCIPAL (Vista del Líder)

**Objetivo:** Proporcionar una vista de 30 segundos del estado del negocio.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── RESUMEN EJECUTIVO ──────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │   │
│  │  │  📦 Envíos  │  │  🚚 En Ruta │  │  ⏰ A Tiempo│  │  💰 Utilidad│     │   │
│  │  │   127       │  │   12       │  │   94%      │  │  $4,250    │     │   │
│  │  │  +8% vs mes │  │  -2 vs ayer│  │  +3% vs mes│  │  +12% vs mes│   │   │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘     │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── KPI DETALLADOS ────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ┌────────────────────────┐  ┌────────────────────────────────────┐   │   │
│  │  │  Costo por Km           │  │  Entregas a Tiempo (%)            │   │   │
│  │  │  ┌────────────────┐     │  │  ┌──────────────────┐             │   │   │
│  │  │  │ ████████████░░ │     │  │  │ █████████████████│             │   │   │
│  │  │  │    $1.25        │     │  │  │   94%            │             │   │   │
│  │  │  └────────────────┘     │  │  └──────────────────┘             │   │   │
│  │  └────────────────────────┘  └────────────────────────────────────┘   │   │
│  │                                                                        │   │
│  │  ┌────────────────────────┐  ┌────────────────────────────────────┐   │   │
│  │  │  Utilidad por Viaje     │  │  Rendimiento por Ruta             │   │   │
│  │  │  ┌────────────────┐     │  │  ┌──────────────────┐             │   │   |
│  │  │  │ ████████████░░ │     │  │  │ Habana: 92% ████░│             │   │   │
│  │  │  │    $32.40       │     │  │  │ Camagüey: 96% ████│            │   │   │
│  │  │  └────────────────┘     │  │  │ Santiago: 88% ██░░│            │   │   │
│  │  └────────────────────────┘  └────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── ACTIVIDAD RECIENTE ────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📋 14:32  •  Ruta HAV-01  •  Entregas completadas (12/15)           │   │
│  │  ⚠️ 13:15  •  Incidencia  •  Chofer: Juan C. - Cliente no encontrado  │   │
│  │  ✅ 11:40  •  Sincronización  •  Datos de 3 choferes actualizados     │   │
│  │  📊 10:15  •  Aduana  •  Costos de 120 envíos actualizados           │   │
│  │  📄 09:30  •  Ficha de Costo  •  Ruta CAM-02 generada                │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── MAPA DE RUTAS EN TIEMPO REAL ─────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [Mapa de Cuba con ubicación de vehículos en tiempo real]             │   │
│  │                                                                        │   │
│  │  🟢 Vehículo 1 - Ruta HAV-01 - 5 entregas pendientes                 │   │
│  │  🟡 Vehículo 2 - Ruta CAM-02 - 8 entregas pendientes                 │   │
│  │  🔴 Vehículo 3 - Ruta SCU-01 - INCIDENCIA - Avería mecánica          │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.2 MAQUETA 2: PLANIFICACIÓN DE RUTAS SEMANAL (Vista del Dispatcher)

**Objetivo:** Planificar rutas optimizadas con interacción visual drag-and-drop.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── PLANIFICACIÓN SEMANAL ────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  Semana del:  [16/08/2026]  ◄───►  [Exportar]  [Optimizar Automático] │   │
│  │                                                                        │   │
│  │  ┌───────┬────────────────────────────────────────────────────────┐   │   │
│  │  │ LUN   │ 📦 15 envíos  │  🚚 Vehículo: CAC-01  │  🧑 Juan C. │   │   │
│  │  │ 16/08 │ 📍 Habana - 8│  ⏱️ 4.5h estimado      │  ✅ Asignado │   │   │
│  │  ├───────┼────────────────────────────────────────────────────────┤   │   │
│  │  │ MAR   │ 📦 22 envíos  │  🚚 Vehículo: CAC-02  │  🧑 Pedro M.│   │   │
│  │  │ 17/08 │ 📍 Habana -12│  ⏱️ 6.2h estimado      │  ✅ Asignado │   │   │
│  │  ├───────┼────────────────────────────────────────────────────────┤   │   │
│  │  │ MIE   │ 📦 18 envíos  │  🚚 Vehículo: CAC-03  │  🧑 María L.│   │   │
│  │  │ 18/08 │ 📍 Camagüey-18│ ⏱️ 7.0h estimado      │  ⚠️ Sin asignar│   │   │
│  │  ├───────┼────────────────────────────────────────────────────────┤   │   │
│  │  │ JUE   │ 📦 30 envíos  │  🚚 Vehículo: CAC-04  │  🧑 Carlos R.│   │   │
│  │  │ 19/08 │ 📍 SCU-30    │  ⏱️ 8.5h estimado      │  ✅ Asignado │   │   │
│  │  ├───────┼────────────────────────────────────────────────────────┤   │   │
│  │  │ VIE   │ 📦 25 envíos  │  🚚 Vehículo: CAC-05  │  🧑 Ana G.  │   │   │
│  │  │ 20/08 │ 📍 Holguín-25│  ⏱️ 7.8h estimado      │  ✅ Asignado │   │   │
│  │  └───────┴────────────────────────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── DETALLE DE RUTA: MIÉRCOLES 18/08 ────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [Mapa interactivo con la ruta optimizada]                             │   │
│  │                                                                        │   │
│  │  📍 Punto 1: 8:00 AM - Calle 10 #22, Camagüey                        │   │
│  │  📍 Punto 2: 8:35 AM - Calle V. Somonte #16, Guáimaro                │   │
│  │  📍 Punto 3: 9:15 AM - Calle Maceo #63, Abreus                       │   │
│  │  📍 Punto 4: 10:00 AM - Edif 15, RPTO Junco Sur, Cienfuegos          │   │
│  │  📍 Punto 5: 10:45 AM - Calle Salvador Cisneros #54, Camagüey        │   │
│  │  ...                                                                  │   │
│  │                                                                        │   │
│  │  [↕ Arrastra puntos para reordenar manualmente]                       │   │
│  │                                                                        │   │
│  │  Resumen: 18 entregas  |  245 km  |  7.0 horas  |  ⛽ 32 L estimado   │   │
│  │  💰 Costo estimado: $5,760  |  💰 Costo aduana incluido: $2,150      │   │
│  │                                                                        │   │
│  │  [  VER FICHA DE COSTO  ]                                             │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.3 MAQUETA 3: APP DEL CHOFER - INICIO (Vista Móvil)

**Objetivo:** Interfaz simple, clara, funcional sin internet.

```
┌─────────────────────────────────────────────────────────────────┐
│  📱 SIGMA-T CHOFER                                       09:41  │
│  ────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌─── BIENVENIDO ──────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  🧑 Juan Carlos Pérez                                   │    │
│  │  📅 Ruta del día: 18/08/2026                           │    │
│  │  🚚 Vehículo: CAC-03                                   │    │
│  │  📍 Zona: Camagüey - 18 entregas                       │    │
│  │                                                          │    │
│  │  [  INICIAR RUTA  ]  [  VER MAPA  ]                    │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── PROGRESO DE LA RUTA ────────────────────────────────┐    │
│  │                                                          │    │
│  │  ███████████████░░░░░░░░░░░░░░░░░░ 45% completado      │    │
│  │  📦 8 de 18 entregas realizadas                         │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── PRÓXIMA ENTREGA ─────────────────────────────────────┐    │
│  │                                                          │    │
│  │  📍 9:15 AM - CALLE ANTONIO MACEO #63                   │    │
│  │  🏠 Destinatario: Luis O. González                      │    │
│  │  📞 58518743                                            │    │
│  │  📦 CACC-24014873 - 22.4 kg                            │    │
│  │  💰 Costo Aduana: $1,250.00                            │    │
│  │                                                          │    │
│  │  [  📞 LLAMAR  ]  [  📍 NAVEGAR  ]                    │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │        [  ✅ ENTREGADO  ]                       │   │    │
│  │  │        [  ⚠️ INCIDENCIA  ]                     │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── REGISTRO DE COSTOS REALES ────────────────────────────┐    │
│  │                                                          │    │
│  │  ⛽ Combustible cargado hoy:  [ 25 L ]                  │    │
│  │  🧾 Peajes pagados:          [ $45.00 ]                │    │
│  │  🔧 Mantenimiento en ruta:    [ $0.00 ]                │    │
│  │                                                          │    │
│  │  [  GUARDAR COSTOS  ]                                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── ESTADO DE SINCRONIZACIÓN ─────────────────────────────┐    │
│  │                                                          │    │
│  │  📶 Sin conexión | 8 entregas pendientes de sincronizar │    │
│  │  [  Sincronizar ahora  ]                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  📱 Modo offline activo   🔋 87%                                │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3.4 MAQUETA 4: APP DEL CHOFER - DETALLE DE ENTREGA (Vista Móvil)

**Objetivo:** Registrar la entrega con todos los datos necesarios.

```
┌─────────────────────────────────────────────────────────────────┐
│  📱 SIGMA-T CHOFER                                       09:45  │
│  ────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌─── REGISTRO DE ENTREGA ────────────────────────────────┐    │
│  │                                                          │    │
│  │  ← Volver a la ruta                                     │    │
│  │                                                          │    │
│  │  📦 House: CACC-24014873                                │    │
│  │  📍 Destinatario: Luis O. González                      │    │
│  │  📞 58518743                                            │    │
│  │  📍 Calle Antonio Maceo #63B, Abreus, Cienfuegos      │    │
│  │  💰 Costo Aduana: $1,250.00                            │    │
│  │                                                          │    │
│  │  ──── ESTADO DE LA ENTREGA ────                        │    │
│  │                                                          │    │
│  │  [ ● Entregado ]  [ ○ No encontrado ]  [ ○ Dañado ]   │    │
│  │                                                          │    │
│  │  ──── FIRMA DEL CLIENTE ────                           │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │                                                  │   │    │
│  │  │   [ Área para firma digital ]                   │   │    │
│  │  │                                                  │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  ──── EVIDENCIA ────                                   │    │
│  │                                                          │    │
│  │  📷 [ Tomar foto del paquete ]                         │    │
│  │                                                          │    │
│  │  ──── INCIDENCIA ────                                  │    │
│  │                                                          │    │
│  │  [ Seleccionar tipo de incidencia... ]                 │    │
│  │                                                          │    │
│  │  [  ✅ COMPLETAR ENTREGA  ]                            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  📱 Modo offline activo                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3.5 MAQUETA 5: GESTIÓN DE FLOTA (Web - Escritorio)

**Objetivo:** Administrar vehículos, mantenimientos y estado operativo.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── FLOTA DE VEHÍCULOS ───────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Vehículo ]  [ Importar ]  [ Exportar ]  🔍 [ Buscar... ]   │   │
│  │                                                                        │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐│   │
│  │  │ Estado: [ ● Todos ] [ 🟢 Activos ] [ 🟡 En Taller ] [ 🔴 Inactivo ] ││   │
│  │  └────────────────────────────────────────────────────────────────────┘│   │
│  │                                                                        │   │
│  │  ┌─────┬───────────────┬─────────┬──────────┬──────────┬───────────┐  │   │
│  │  │ #   │ Matrícula     │ Marca   │ Modelo   │ Capacidad│ Estado    │  │   │
│  │  ├─────┼───────────────┼─────────┼──────────┼──────────┼───────────┤  │   │
│  │  │ 001 │ CAC-01        │ Isuzu   │ NPR 2019 │ 5,000 kg │ 🟢 Activo │  │   │
│  │  │ 002 │ CAC-02        │ Hino    │ 300 2020 │ 4,500 kg │ 🟢 Activo │  │   │
│  │  │ 003 │ CAC-03        │ Mercedes│ 814 2018 │ 6,000 kg │ 🟡 Taller │  │   │
│  │  │ 004 │ CAC-04        │ Foton   │ Aumark   │ 3,800 kg │ 🟢 Activo │  │   │
│  │  │ 005 │ CAC-05        │ Kia     │ Bongo    │ 1,200 kg │ 🔴 Inactivo│  │   │
│  │  └─────┴───────────────┴─────────┴──────────┴──────────┴───────────┘  │   │
│  │                                                                        │   │
│  │  [Mostrando 5 de 12 vehículos]  [ < 1 2 3 > ]                         │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── DETALLE DEL VEHÍCULO: CAC-01 ─────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📋 Información General                                               │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │ Matrícula: CAC-01  │ Marca: Isuzu  │ Modelo: NPR 2019        │   │   │
│  │  │ Capacidad: 5,000 kg / 22 m³  │ Combustible: Diesel           │   │   │
│  │  │ Consumo: 12 L/100km  │ Kilometraje: 45,230 km               │   │   │
│  │  │ Próximo Mantenimiento: 50,000 km (en 4,770 km)              │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  │                                                                        │   │
│  │  📋 Historial de Mantenimiento                                        │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │ 12/06/2026 │ Preventivo │ Cambio de aceite y filtros │ $180  │   │   │
│  │  │ 03/04/2026 │ Correctivo │ Reparación de frenos      │ $320  │   │   │
│  │  │ 15/01/2026 │ Preventivo │ Revisión general          │ $250  │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  │                                                                        │   │
│  │  [  EDITAR  ]  [  REGISTRAR MANTENIMIENTO  ]  [  ASIGNAR CHOFER  ]   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.6 MAQUETA 6: GESTIÓN DE CHOFERES (Web - Escritorio)

**Objetivo:** Administrar conductores, disponibilidad y desempeño.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── GESTIÓN DE CHOFERES ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Chofer ]  [ Exportar ]  🔍 [ Buscar... ]                   │   │
│  │                                                                        │   │
│  │  ┌─────┬───────────────┬─────────────┬──────────┬──────────┬────────┐  │   │
│  │  │ #   │ Nombre        │ Carnet      │ Teléfono │ Licencia │ Estado │  │   │
│  │  ├─────┼───────────────┼─────────────┼──────────┼──────────┼────────┤  │   │
│  │  │ 001 │ Juan C. Pérez │ 901231-1234│ 55512345 │ B-2028  │ 🟢 Act │  │   │
│  │  │ 002 │ Pedro M. Díaz │ 880515-5678│ 55523456 │ B-2027  │ 🟢 Act │  │   │
│  │  │ 003 │ María L. Gómez│ 920831-9012│ 55534567 │ B-2029  │ 🟡 Desc│  │   │
│  │  │ 004 │ Carlos R. Díaz│ 870215-3456│ 55545678 │ B-2026  │ 🟢 Act │  │   │
│  │  │ 005 │ Ana G. Pérez  │ 900720-7890│ 55556789 │ B-2028  │ 🔴 Inac│  │   │
│  │  └─────┴───────────────┴─────────────┴──────────┴──────────┴────────┘  │   │
│  │                                                                        │   │
│  │  [Mostrando 5 de 12 choferes]  [ < 1 2 3 > ]                          │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── DETALLE DEL CHOFER: Juan C. Pérez ────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📋 Información Personal                                              │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │ Nombre: Juan Carlos Pérez Rodríguez                          │   │   │
│  │  │ Carnet: 901231-12345  │ Teléfono: 55512345  │ Email: -      │   │   │
│  │  │ Licencia: B-2028 (vigente)  │ Fecha Ingreso: 15/03/2021     │   │   │
│  │  │ Esquema de Pago: Salario Fijo + Bonos                       │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  │                                                                        │   │
│  │  📊 Desempeño (Últimos 30 días)                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │ Entregas: 47   │ A Tiempo: 94%   │ Incidencias: 2           │   │   │
│  │  │ Kms Recorridos: 2,350  │ Consumo: 11.8 L/100km              │   │   │
│  │  │ Salario Base: $8,500  │ Bonos: $1,200  │ Total: $9,700     │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  │                                                                        │   │
│  │  📅 Historial de Rutas                                                │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │ 16/08 │ Ruta HAV-01  │ 15 entregas │ 96% tiempo │ ✅ Complet│   │   │
│  │  │ 15/08 │ Ruta CAM-02  │ 18 entregas │ 88% tiempo │ ⚠️ Inciden│   │   │
│  │  │ 14/08 │ Ruta SCU-01  │ 22 entregas │ 100% tiempo│ ✅ Complet│   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  │                                                                        │   │
│  │  [  EDITAR  ]  [  ASIGNAR RUTA  ]  [  VER REPORTE  ]                 │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.7 MAQUETA 7: REPORTES AVANZADOS (Web - Escritorio)

**Objetivo:** Análisis profundo de rentabilidad, costos y eficiencia.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── REPORTES AVANZADOS ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  Período: [ Agosto 2026 ]  [ Aplicar ]  [ Exportar PDF ]  [ CSV ]    │   │
│  │                                                                        │   │
│  │  ┌───────────────┬───────────────┬───────────────┬─────────────────┐  │   │
│  │  │ 📊 RENTABILIDAD│ 📈 EFICIENCIA │ 💰 COSTOS    │ 🏆 DESEMPEÑO   │  │   │
│  │  │               │               │               │                 │  │   │
│  │  │ • Por Ruta    │ • Km/Litro   │ • Fijos      │ • Choferes      │  │   │
│  │  │ • Por Cliente │ • Entregas/h  │ • Variables  │ • Vehículos     │  │   │
│  │  │ • Por Chofer  │ • % Ocupación │ • Por Km     │ • Tiempos       │  │   │
│  │  │ • Con Aduana  │               │ • De Aduana  │                 │  │   │
│  │  │ • Ficha Costo │               │ • Por Ruta   │                 │  │   │
│  │  └───────────────┴───────────────┴───────────────┴─────────────────┘  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── RENTABILIDAD POR RUTA ────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │   │
│  │  │ Ruta  │  Ingresos  │  Costos  │  Aduana  │ Utilidad │ Margen  │  │   │
│  │  ├────────┼────────────┼──────────┼──────────┼──────────┼─────────┤  │   │
│  │  │ HAV-01 │ $12,450    │ $8,720   │ $1,200   │ $2,530   │ 20.3%   │  │   │
│  │  │ CAM-02 │ $8,900     │ $6,450   │ $850     │ $1,600   │ 18.0%   │  │   │
│  │  │ SCU-01 │ $15,200    │ $13,800  │ $2,400   │ -$1,000  │ -6.6%   │  │   │
│  │  │ HOG-01 │ $6,700     │ $5,100   │ $620     │ $980     │ 14.6%   │  │   │
│  │  └────────┴────────────┴──────────┴──────────┴──────────┴─────────┘ │   │
│  │                                                                        │   │
│  │  [💡 Recomendación: Revisar ruta SCU-01 - Costos de aduana elevados]  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── EVOLUCIÓN DE COSTOS ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [Gráfico de líneas: Costo por km (Ene-Ago 2026) - incluyendo aduana] │   │
│  │                                                                        │   │
│  │  $1.60 ──────────●─────────────────────────────────────               │   │
│  │  $1.50 ─────────────●─────────────────●───────────────               │   │
│  │  $1.40 ────────────────●─────●──────────●──────●─────               │   │
│  │  $1.30 ────────────────────●──────────────────────●──               │   │
│  │  $1.20 ──────────────────────────────────────────────────             │   │
│  │        Ene  Feb  Mar  Abr  May  Jun  Jul  Ago                        │   │
│  │                                                                        │   │
│  │  Tendencia: 📈 +8.5% en últimos 3 meses (incluye costos de aduana)   │   │
│  │  Costo promedio con aduana: $1.45  │  Sin aduana: $1.25              │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.8 MAQUETA 8: CONFIGURACIÓN Y AJUSTES (Web - Escritorio)

**Objetivo:** Configurar parámetros del sistema (costos, tarifas, etc.).

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── CONFIGURACIÓN ─────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ General ] [ Costos ] [ Rutas ] [ Notificaciones ] [ Usuarios ]    │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── COSTOS FIJOS ─────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📋 Configuración de Costos Fijos (mensuales)                         │   │
│  │                                                                        │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ Categoría        │ Monto (CUP) │ Frecuencia   │ Acción         │  │   │
│  │  ├──────────────────┼─────────────┼──────────────┼────────────────┤  │   │
│  │  │ Seguro de Flota  │ $2,500.00   │ Mensual     │ [✏️] [🗑️]      │  │   │
│  │  │ Impuesto de Ruta │ $1,200.00   │ Trimestral  │ [✏️] [🗑️]      │  │   │
│  │  │ Depreciación     │ $3,800.00   │ Mensual     │ [✏️] [🗑️]      │  │   │
│  │  │ Salario Admin    │ $15,000.00  │ Mensual     │ [✏️] [🗑️]      │  │   │
│  │  │ ...              │             │             │                │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                        │   │
│  │  [ + Agregar Costo Fijo ]                                             │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── TARIFAS POR RUTA ────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📋 Tarifas Negociadas por Cliente                                    │   │
│  │                                                                        │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ Cliente        │ Ruta     │ Tarifa/kg │ Tarifa/m³ │ Acción    │  │   │
│  │  ├────────────────┼──────────┼───────────┼───────────┼───────────┤  │   │
│  │  │ CAC Paquetería │ Habana   │ $45.00    │ $120.00   │ [✏️] [🗑️] │  │   │
│  │  │ CAC Paquetería │ Camagüey │ $55.00    │ $150.00   │ [✏️] [🗑️] │  │   │
│  │  │ CAC Paquetería │ Santiago │ $65.00    │ $180.00   │ [✏️] [🗑️] │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                        │   │
│  │  [ + Agregar Tarifa ]                                                │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── PARÁMETROS DEL SISTEMA ───────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ⛽ Costo de Combustible: [ $180.00 ] por litro                       │   │
│  │  ⏰ Hora de Inicio de Ruta: [ 08:00 AM ]                             │   │
│  │  🕐 Tiempo de Entrega Promedio: [ 15 ] minutos                       │   │
│  │  📍 API de Mapas: [ OpenStreetMap ] [ Google Maps ]                  │   │
│  │  🔄 Sincronización Automática: [ ✅ ] cada [ 15 ] minutos            │   │
│  │  💰 Mostrar costos en: [ CUP ] [ USD ]                              │   │
│  │                                                                        │   │
│  │  [  GUARDAR CONFIGURACIÓN  ]                                          │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.9 MAQUETA 9: APP DEL CHOFER - PERFIL E HISTORIAL (Móvil)

**Objetivo:** Chofer accede a su historial y datos personales.

```
┌─────────────────────────────────────────────────────────────────┐
│  📱 SIGMA-T CHOFER                                       10:15  │
│  ────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌─── PERFIL ──────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  🧑 Juan Carlos Pérez                                   │    │
│  │  🚚 CAC-03 - Isuzu NPR                                 │    │
│  │  📅 Antigüedad: 2 años 5 meses                         │    │
│  │  📋 Esquema de Pago: Salario Fijo + Bonos              │    │
│  │                                                          │    │
│  │  [  VER PERFIL COMPLETO  ]                              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── ESTADÍSTICAS PERSONALES ─────────────────────────────┐    │
│  │                                                          │    │
│  │  Este Mes:                                               │    │
│  │  📦 47 entregas  │  ⏱️ 94% a tiempo  │  ⭐ 4.8/5      │    │
│  │  📍 2,350 km     │  ⛽ 11.8 L/100km  │  💰 $9,700     │    │
│  │                                                          │    │
│  │  [  VER DETALLE  ]                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── HISTORIAL DE RUTAS ─────────────────────────────────┐    │
│  │                                                          │    │
│  │  📅 18/08/2026 - Ruta CAM-02                           │    │
│  │     ✅ 18 entregas completadas                         │    │
│  │     ⏱️ 7.2 horas │ 📍 245 km                          │    │
│  │     💰 Ficha de Costo: $26,720.00                     │    │
│  │                                                          │    │
│  │  📅 17/08/2026 - Ruta SCU-01                           │    │
│  │     ✅ 22 entregas completadas                         │    │
│  │     ⏱️ 8.5 horas │ 📍 310 km                          │    │
│  │     💰 Ficha de Costo: $34,150.00                     │    │
│  │                                                          │    │
│  │  📅 16/08/2026 - Ruta HAV-01                           │    │
│  │     ✅ 15 entregas completadas                         │    │
│  │     ⏱️ 6.0 horas │ 📍 180 km                          │    │
│  │     💰 Ficha de Costo: $18,450.00                     │    │
│  │                                                          │    │
│  │  [  VER TODAS  ]                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─── CONFIGURACIÓN ──────────────────────────────────────┐    │
│  │                                                          │    │
│  │  📶 Modo Offline: [ ✅ Activado ]                      │    │
│  │  🔔 Notificaciones: [ ✅ Activado ]                    │    │
│  │  🌙 Modo Oscuro: [ ○ Activado ]                       │    │
│  │                                                          │    │
│  │  [  CERRAR SESIÓN  ]                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  📱 Modo offline activo   🔋 87%                                │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3.10 MAQUETA 10: PORTAL DEL CLIENTE (Web - Escritorio)

**Objetivo:** El cliente de paquetería puede rastrear sus envíos en tiempo real.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T CLIENTE              [Buscar Guía...]         🔔  👤 CAC Paquetería│
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── MIS ENVÍOS ────────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📦 Envíos Activos: 47  │  ✅ Entregados: 312  │  ⏳ Pendientes: 18   │   │
│  │                                                                        │   │
│  │  🔍 Buscar: [ Número de House... ]   [ Filtrar por Estado ▼ ]        │   │
│  │                                                                        │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐│   │
│  │  │ 📦 CACC-24014926  │ 📍 Camagüey  │ 🟢 En Ruta  │ Actualizado: 09:30││   │
│  │  │ Destinatario: Anilex M. Pérez    │ Chofer: Juan C.  │ [📞] [📍]   ││   │
│  │  │ 💰 Costo Aduana: $1,250.00       │ Estado Aduana: ✅ Pagado      ││   │
│  │  ├────────────────────────────────────────────────────────────────────┤│   │
│  │  │ 📦 CACC-24014927  │ 📍 Camagüey  │ 🟢 En Ruta  │ Actualizado: 09:25││   │
│  │  │ Destinatario: Anilex M. Pérez    │ Chofer: Juan C.  │ [📞] [📍]   ││   │
│  │  │ 💰 Costo Aduana: $850.00         │ Estado Aduana: ✅ Pagado      ││   │
│  │  ├────────────────────────────────────────────────────────────────────┤│   │
│  │  │ 📦 CACC-24014928  │ 📍 Camagüey  │ ⚪ Pendiente  │ Actualizado: 08:00││   │
│  │  │ Destinatario: Adianet F. Brito   │ Chofer: Por asignar│ [📞] [📍] ││   │
│  │  │ 💰 Costo Aduana: $0.00 (Exento)  │ Estado Aduana: ✅ Verificado  ││   │
│  │  ├────────────────────────────────────────────────────────────────────┤│   │
│  │  │ 📦 CACC-24014873  │ 📍 Cienfuegos│ ✅ Entregado │ Fecha: 17/08/2026 ││   │
│  │  │ Destinatario: Luis O. González   │ Firma: Luis G. │ [📄 Ver]    ││   │
│  │  │ 💰 Costo Aduana: $1,250.00       │ Estado Aduana: ✅ Pagado      ││   │
│  │  │ 📄 Ficha de Costo: $26,720.00    │                               ││   │
│  │  └────────────────────────────────────────────────────────────────────┘│   │
│  │                                                                        │   │
│  │  [Mostrando 4 de 47 envíos]  [ < 1 2 3 4 5 > ]                       │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── MAPA DE SEGUIMIENTO ───────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [Mapa con ubicación del vehículo y rutas en tiempo real]             │   │
│  │                                                                        │   │
│  │  🟢 Vehículo CAC-01: 6 entregas restantes  |  ETA promedio: 45 min   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── NOTIFICACIONES ────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  🔔 10:45 AM - Envío CACC-24014926 ha sido entregado en Camagüey     │   │
│  │  🔔 09:15 AM - Envío CACC-24014873 está en ruta hacia Abreus         │   │
│  │  🔔 08:00 AM - 18 envíos han sido asignados a ruta CAM-02            │   │
│  │  🔔 07:30 AM - Costos de aduana actualizados para 120 envíos         │   │
│  │  🔔 07:00 AM - Ficha de costo generada para ruta CAM-02              │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.11 MAQUETA 11: GESTIÓN FINANCIERA (Web - Escritorio)

**Objetivo:** Control total de ingresos, gastos y rentabilidad.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── DASHBOARD FINANCIERO ─────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📅 Período: [ Agosto 2026 ]  [ Aplicar ]  [ Exportar ]              │   │
│  │                                                                        │   │
│  │  ┌────────────┬────────────┬────────────┬────────────────────────┐   │   │
│  │  │ 💰 INGRESOS │ 💳 GASTOS  │ 📊 UTILIDAD │ 📈 MARGEN             │   │   │
│  │  │ $45,230.00  │ $32,180.00 │ $13,050.00 │ 28.9%                  │   │   │
│  │  │ ▲ +12% vs mes│ ▲ +8% vs mes│ ▲ +18% vs mes│ ▲ +3% vs mes      │   │   │
│  │  └────────────┴────────────┴────────────┴────────────────────────┘   │   │
│  │                                                                        │   │
│  │  [📌 Incluye costos de aduana e importación]                          │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── LIBRO DE INGRESOS ────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Ingreso ]  [ Importar ]  🔍 [ Buscar... ]                  │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬───────────┬─────┐  │   │
│  │  │ Fecha  │ Cliente      │ Concepto    │ Monto    │ Estado    │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼───────────┼─────┤  │   │
│  │  │ 18/08  │ CAC Paquetería│ Envíos HAV │ $12,450  │ ✅ Pagado │[📄]│  │   │
│  │  │ 15/08  │ CAC Paquetería│ Envíos CAM │ $8,900   │ ⏳ Pendiente│[📄]│  │   │
│  │  │ 12/08  │ Cliente X    │ Servicio    │ $3,200   │ ✅ Pagado │[📄]│  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴───────────┴─────┘  │   │
│  │                                                                        │   │
│  │  Total Ingresos: $24,550  │  Cobrado: $15,650  │  Pendiente: $8,900   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── LIBRO DE GASTOS ──────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Gasto ]  [ Importar ]  🔍 [ Buscar... ]                    │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬───────────┬─────┐  │   │
│  │  │ Fecha  │ Categoría    │ Concepto    │ Monto    │ Vehículo  │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼───────────┼─────┤  │   │
│  │  │ 18/08  │ Combustible  │ Diesel 50L  │ $9,000   │ CAC-01    │[📄]│  │   │
│  │  │ 17/08  │ Aduana       │ Costos 120  │ $25,000  │ -         │[📄]│  │   │
│  │  │ 17/08  │ Mantenimiento│ Cambio aceite│ $3,800   │ CAC-03    │[📄]│  │   │
│  │  │ 15/08  │ Salarios     │ Quincena    │ $12,000  │ -         │[📄]│  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴───────────┴─────┘  │   │
│  │                                                                        │   │
│  │  Total Gastos: $49,800  │  Por Categoría: Aduana 50%, Combustible 18% │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.12 MAQUETA 12: GESTIÓN DE MANTENIMIENTO (Web - Escritorio)

**Objetivo:** Programación y control de mantenimiento de la flota.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── PLAN DE MANTENIMIENTO ────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  🔔 Alertas: 2 vehículos requieren mantenimiento en los próximos 7 días│   │
│  │                                                                        │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐│   │
│  │  │ ⚠️ CAC-03 - Mercedes 814 - Próximo mantenimiento: 48,000 km     ││   │
│  │  │    📍 Km actual: 46,200 km  │  ⏳ Restante: 1,800 km (≈15 días)  ││   │
│  │  │    📋 Tipo: Preventivo (Cambio de aceite, filtros, revisión)     ││   │
│  │  │    💰 Costo estimado: $4,500  │  [  PROGRAMAR  ]                 ││   │
│  │  ├────────────────────────────────────────────────────────────────────┤│   │
│  │  │ ⚠️ CAC-05 - Kia Bongo - Próximo mantenimiento: 30,000 km        ││   │
│  │  │    📍 Km actual: 29,100 km  │  ⏳ Restante: 900 km (≈8 días)     ││   │
│  │  │    📋 Tipo: Preventivo (Revisión general, frenos)               ││   │
│  │  │    💰 Costo estimado: $3,200  │  [  PROGRAMAR  ]                 ││   │
│  │  └────────────────────────────────────────────────────────────────────┘│   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── HISTORIAL DE MANTENIMIENTO ───────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Registro ]  🔍 [ Buscar por vehículo... ]                  │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────┬──────────────┬─────────────┬────────┬────────┐  │   │
│  │  │ Fecha  │ Vehículo │ Tipo         │ Descripción │ Costo  │ Estado │  │   │
│  │  ├────────┼──────────┼──────────────┼─────────────┼────────┼────────┤  │   │
│  │  │ 12/08  │ CAC-01   │ Preventivo   │ Cambio aceite│ $2,800 │ ✅ Complet│  │   │
│  │  │ 05/08  │ CAC-03   │ Correctivo   │ Reparación  │ $4,200 │ ✅ Complet│  │   │
│  │  │ 28/07  │ CAC-02   │ Preventivo   │ Revisión    │ $3,100 │ ✅ Complet│  │   │
│  │  │ 20/07  │ CAC-04   │ Preventivo   │ Cambio frenos│ $1,900 │ ✅ Complet│  │   │
│  │  └────────┴──────────┴──────────────┴─────────────┴────────┴────────┘  │   │
│  │                                                                        │   │
│  │  Costo total de mantenimiento (2026): $45,230                          │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.13 MAQUETA 13: GESTIÓN DE ALMACÉN (Web - Escritorio)

**Objetivo:** Control de entrada/salida de paquetes en bodega.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── CONTROL DE ALMACÉN ────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📦 En Bodega: 38 paquetes  │  🚚 En Ruta: 47  │  ✅ Entregados: 312  │   │
│  │                                                                        │   │
│  │  [ + Registrar Entrada ]  [ + Registrar Salida ]  🔍 [ Buscar... ]    │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬──────────────┬────────────┬────────────┐   │   │
│  │  │ House  │ Destinatario │ Ubicación    │ Fecha Ing. │ Estado     │   │   │
│  │  ├────────┼──────────────┼──────────────┼────────────┼────────────┤   │   │
│  │  │ CACC-149│ A. Fonseca   │ Bodega A-12  │ 18/08/2026 │ 📦 Almacenado│   │   │
│  │  │ CACC-149│ L. González  │ Bodega B-05  │ 18/08/2026 │ 📦 Almacenado│   │   │
│  │  │ CACC-149│ M. Pérez     │ Bodega A-08  │ 17/08/2026 │ 🚚 En Ruta│   │   │
│  │  │ CACC-148│ O. González  │ -            │ 15/08/2026 │ ✅ Entregado│   │   │
│  │  └────────┴──────────────┴──────────────┴────────────┴────────────┘   │   │
│  │                                                                        │   │
│  │  [Mostrando 4 de 38 paquetes]  [ < 1 2 3 4 5 > ]                      │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── UBICACIÓN EN BODEGA ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ Plano interactivo de la bodega con distribución de paquetes ]      │   │
│  │                                                                        │   │
│  │  ┌─────┬─────┬─────┬─────┬─────┐                                     │   │
│  │  │ A-11│ A-12│ A-13│ A-14│ A-15│                                     │   │
│  │  │ 📦  │ 📦  │ 📦  │ 📦  │ 📦  │                                     │   │
│  │  ├─────┼─────┼─────┼─────┼─────┤                                     │   │
│  │  │ B-11│ B-12│ B-13│ B-14│ B-15│                                     │   │
│  │  │ 📦  │ 📦  │ 📦  │ 📦  │ 📦  │                                     │   │
│  │  └─────┴─────┴─────┴─────┴─────┘                                     │   │
│  │                                                                        │   │
│  │  📍 Paquete seleccionado: CACC-24014926 - Bodega A-12                │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.14 MAQUETA 14: FACTURACIÓN Y COBRANZA (Web - Escritorio)

**Objetivo:** Generar facturas y gestionar cobros.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── FACTURACIÓN ───────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nueva Factura ]  [ Buscar... ]  [ Exportar ]                     │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬───────────┬─────┐  │   │
│  │  │ #      │ Cliente      │ Fecha       │ Monto    │ Estado    │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼───────────┼─────┤  │   │
│  │  │ F-2026-│ CAC Paquetería│ 18/08/2026 │ $12,450  │ ✅ Pagado │[📄]│  │   │
│  │  │ F-2026-│ CAC Paquetería│ 15/08/2026 │ $8,900   │ ⏳ Pendiente│[📄]│  │   │
│  │  │ F-2026-│ Cliente X    │ 12/08/2026 │ $3,200   │ ✅ Pagado │[📄]│  │   │
│  │  │ F-2026-│ CAC Paquetería│ 10/08/2026 │ $5,600   │ ✅ Pagado │[📄]│  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴───────────┴─────┘  │   │
│  │                                                                        │   │
│  │  Total Facturado: $30,150  │  Cobrado: $21,250  │  Pendiente: $8,900  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── DETALLE DE FACTURA ───────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📄 FACTURA #F-2026-001                                                │   │
│  │  ────────────────────────────────────────────────────────────────────── │   │
│  │  Cliente: CAC Paquetería & Envío México                               │   │
│  │  Fecha: 18/08/2026  │  Vencimiento: 25/08/2026                       │   │
│  │                                                                        │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ Concepto                │ Cantidad │ Precio    │ Subtotal     │  │   │
│  │  ├─────────────────────────┼──────────┼───────────┼──────────────┤  │   │
│  │  │ Envíos Ruta HAV-01      │ 15       │ $45.00/kg │ $6,750.00    │  │   │
│  │  │ Envíos Ruta CAM-02      │ 18       │ $55.00/kg │ $9,900.00    │  │   │
│  │  │ Costos de Aduana        │ 33       │ -         │ $2,100.00    │  │   │
│  │  │ Servicio de Almacenaje  │ 1        │ $500.00   │ $500.00      │  │   │
│  │  ├─────────────────────────┼──────────┼───────────┼──────────────┤  │   │
│  │  │ Total                                   │ $19,250.00  │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                        │   │
│  │  [  ENVIAR POR EMAIL  ]  [  DESCARGAR PDF  ]  [  REGISTRAR PAGO  ]   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.15 MAQUETA 15: GESTIÓN DE INCIDENTES (Web - Escritorio)

**Objetivo:** Registro, seguimiento y resolución de incidentes.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── GESTIÓN DE INCIDENTES ─────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  🔔 Incidentes Activos: 3  │  ✅ Resueltos: 12  │  ⏳ En Proceso: 2   │   │
│  │                                                                        │   │
│  │  [ + Nuevo Incidente ]  🔍 [ Buscar... ]  [ Filtrar ▼ ]               │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬───────────┬─────┐  │   │
│  │  │ #      │ Tipo         │ Fecha       │ Estado   │ Prioridad │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼───────────┼─────┤  │   │
│  │  │ INC-001│ Cliente no   │ 18/08/2026 │ ⏳ En Pro │ 🔴 Alta  │[📄]│  │   │
│  │  │        │ encontrado   │             │          │           │     │  │   │
│  │  │ INC-002│ Avería       │ 17/08/2026 │ ✅ Resuel│ 🟡 Media  │[📄]│  │   │
│  │  │        │ mecánica     │             │          │           │     │  │   │
│  │  │ INC-003│ Paquete      │ 16/08/2026 │ ✅ Resuel│ 🟢 Baja   │[📄]│  │   │
│  │  │        │ dañado       │             │          │           │     │  │   │
│  │  │ INC-004│ Error Aduana │ 15/08/2026 │ ⏳ En Pro │ 🟡 Media  │[📄]│  │   │
│  │  │        │ consulta     │             │          │           │     │  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴───────────┴─────┘  │   │
│  │                                                                        │   │
│  │  [Mostrando 4 de 15 incidentes]  [ < 1 2 3 4 > ]                      │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── DETALLE DE INCIDENTE ─────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ⚠️ INC-001: Cliente no encontrado - CACC-24014873                   │   │
│  │  ────────────────────────────────────────────────────────────────────── │   │
│  │  📅 Fecha: 18/08/2026 09:15 AM  │  📍 Ubicación: Abreus, Cienfuegos │   │
│  │  🧑 Reportado por: Juan C. Pérez (Chofer)                            │   │
│  │                                                                        │   │
│  │  📝 Descripción:                                                       │   │
│  │  "El cliente no se encuentra en la dirección. El número de teléfono   │   │
│  │  no contesta. Se dejó notificación en la puerta."                     │   │
│  │                                                                        │   │
│  │  📋 Acciones Tomadas:                                                  │   │
│  │  □ Intentar contacto por teléfono (3 intentos) - 09:30 AM            │   │
│  │  □ Dejar notificación en la puerta - 09:45 AM                        │   │
│  │  □ Reagendar entrega para mañana - 10:00 AM                          │   │
│  │                                                                        │   │
│  │  [  AGREGAR COMENTARIO  ]  [  CERRAR INCIDENTE  ]                    │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.16 MAQUETA 16: PANEL DE AUDITORÍA (Web - Escritorio)

**Objetivo:** Control total de quién hizo qué y cuándo.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── PANEL DE AUDITORÍA ────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📅 Período: [ Agosto 2026 ]  🔍 [ Buscar... ]  [ Exportar Log ]     │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬──────────┬─────┐  │   │
│  │  │ Fecha  │ Usuario      │ Acción      │ Entidad  │ IP       │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼──────────┼─────┤  │   │
│  │  │ 18/08  │ Osleyder G.  │ Actualizó   │ Ruta     │ 192.168  │[📄]│  │   │
│  │  │ 09:30  │              │ ruta        │ CAM-02   │ .1.15    │     │  │   │
│  │  │ 18/08  │ Juan C.      │ Registró    │ Entrega  │ 10.0.0.5 │[📄]│  │   │
│  │  │ 09:15  │ (Chofer)     │ entrega     │ CACC-148 │          │     │  │   │
│  │  │ 17/08  │ Osleyder G.  │ Importó     │ Envíos   │ 192.168  │[📄]│  │   │
│  │  │ 16:00  │              │ manifiesto  │          │ .1.15    │     │  │   │
│  │  │ 17/08  │ Osleyder G.  │ Consultó    │ Aduana   │ 192.168  │[📄]│  │   │
│  │  │ 15:30  │              │ costos      │          │ .1.15    │     │  │   │
│  │  │ 17/08  │ Pedro M.     │ Registró    │ Costo    │ 10.0.0.6 │[📄]│  │   │
│  │  │ 14:20  │ (Chofer)     │ combustible │          │          │     │  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴──────────┴─────┘  │   │
│  │                                                                        │   │
│  │  [Mostrando 5 de 342 registros]  [ < 1 2 3 4 5 6 7 8 > ]             │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── ALERTAS DE SEGURIDAD ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ⚠️ 3 intentos fallidos de login - IP 10.0.0.99 - Hoy 08:45 AM       │   │
│  │  ✅ Sincronización completada - Chofer: María L. - 08:30 AM          │   │
│  │  ⚠️ 2 intentos fallidos de login - IP 10.0.0.50 - Ayer 23:15 PM     │   │
│  │                                                                        │   │
│  │  [  BLOQUEAR IP  ]  [  VER DETALLE  ]                                 │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── TRAZABILIDAD POR ENTIDAD ──────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  Selecciona una entidad para ver su historial:                        │   │
│  │  [ Envíos ▼ ] [ CACC-24014926 ]  [  VER HISTORIAL  ]                 │   │
│  │                                                                        │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ 18/08 09:30 - Estado cambiado a "Entregado" - Juan C.        │  │   │
│  │  │ 18/08 08:00 - Estado cambiado a "En Ruta" - Osleyder G.      │  │   │
│  │  │ 18/08 07:30 - Costo de aduana asignado: $1,250.00             │  │   │
│  │  │ 18/08 07:00 - Ficha de costo generada para ruta CAM-02        │  │   │
│  │  │ 17/08 16:00 - Importado desde manifiesto - Osleyder G.       │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.17 MAQUETA 17: GESTIÓN DE PROSPECTOS Y MARKETING (Web - Escritorio)

**Objetivo:** Capturar y dar seguimiento a nuevos clientes potenciales.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── GESTIÓN DE PROSPECTOS ─────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Prospecto ]  [ Importar ]  🔍 [ Buscar... ]                │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬──────────┬─────┐  │   │
│  │  │ #      │ Empresa      │ Contacto    │ Teléfono │ Estado   │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼──────────┼─────┤  │   │
│  │  │ 001    │ DHL Cuba     │ Jorge Pérez │ 555-1111 │ 🔵 Contact│[📄]│  │   │
│  │  │ 002    │ Correos Cuba │ María López │ 555-2222 │ 🟡 Cotiz  │[📄]│  │   │
│  │  │ 003    │ FedEx Cuba   │ Carlos Ruiz │ 555-3333 │ 🟢 Cliente│[📄]│  │   │
│  │  │ 004    │ TNT Cuba     │ Ana Díaz    │ 555-4444 │ 🔴 Inact  │[📄]│  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴──────────┴─────┘  │   │
│  │                                                                        │   │
│  │  [Mostrando 4 de 12 prospectos]  [ < 1 2 3 > ]                        │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── SEGUIMIENTO DE PROSPECTO ──────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  🏢 DHL Cuba                                                          │   │
│  │  ────────────────────────────────────────────────────────────────────── │   │
│  │  Contacto: Jorge Pérez  │  Cargo: Gerente Logístico                   │   │
│  │  Teléfono: 555-1111  │  Email: jorge.perez@dhl.cu                    │   │
│  │  Estado: 🔵 Contacto Inicial  │  Fuente: Referencia de CAC           │   │
│  │                                                                        │   │
│  │  📋 Historial de Contactos                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ 15/08/2026 - Llamada inicial - Interesado en servicio        │  │   │
│  │  │ 18/08/2026 - Enviada cotización #COT-2026-001                │  │   │
│  │  │ 20/08/2026 - Seguimiento programado                           │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                        │   │
│  │  [  AGREGAR CONTACTO  ]  [  GENERAR COTIZACIÓN  ]  [  CONVERTIR  ]   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── COTIZACIONES ──────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nueva Cotización ]  [ Buscar... ]                                │   │
│  │                                                                        │   │
│  │  ┌────────┬──────────────┬─────────────┬──────────┬──────────┬─────┐  │   │
│  │  │ #      │ Cliente      │ Fecha       │ Monto    │ Estado   │ Ver │  │   │
│  │  ├────────┼──────────────┼─────────────┼──────────┼──────────┼─────┤  │   │
│  │  │ COT-001│ DHL Cuba     │ 18/08/2026 │ $15,200  │ 📤 Enviado│[📄]│  │   │
│  │  │ COT-002│ Correos Cuba │ 15/08/2026 │ $8,900   │ ✏️ Borrador│[📄]│  │   │
│  │  └────────┴──────────────┴─────────────┴──────────┴──────────┴─────┘  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.18 MAQUETA 18: ENCUESTAS Y CASOS DE ÉXITO (Web - Escritorio)

**Objetivo:** Medir la calidad del servicio y generar casos de éxito.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── ENCUESTAS DE SATISFACCIÓN ─────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📊 Calificación Promedio: 4.7/5  │  🏆 95% Recomendaría             │   │
│  │                                                                        │   │
│  │  [ + Nueva Encuesta ]  [ Ver Resultados ]  [ Exportar ]              │   │
│  │                                                                        │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐│   │
│  │  │ 📊 Resultados del Mes                                            ││   │
│  │  │ ┌─────────────────────────────────────────────────────────────┐  ││   │
│  │  │ │ ⭐ Calidad del Servicio: 4.8/5  ████████████████████████░░│  ││   │
│  │  │ │ ⏱️ Cumplimiento de Tiempo: 4.6/5 ████████████████████████░░│  ││   │
│  │  │ │ 📦 Estado de Paquetes: 4.9/5    ██████████████████████████│  ││   │
│  │  │ │ 📞 Comunicación: 4.5/5           ████████████████████████░│  ││   │
│  │  │ │ 💰 Gestión de Costos: 4.7/5     ████████████████████████░│  ││   │
│  │  │ │ 📄 Ficha de Costo: 4.6/5        ████████████████████████░│  ││   │
│  │  │ └─────────────────────────────────────────────────────────────┘  ││   │
│  │  └────────────────────────────────────────────────────────────────────┘│   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── CASOS DE ÉXITO ─────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  [ + Nuevo Caso de Éxito ]  [ Ver Todos ]                             │   │
│  │                                                                        │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐│   │
│  │  │ 🏆 "Entregamos 127 paquetes en 5 días sin incidentes"            ││   │
│  │  │    Cliente: CAC Paquetería  │  Fecha: Agosto 2026                ││   │
│  │  │    📍 Cobertura: Camagüey, Santiago, Holguín                     ││   │
│  │  │    💬 "El servicio fue excelente. Llegaron a tiempo y en buen   ││   │
│  │  │        estado. Definitivamente repetiremos."                     ││   │
│  │  └────────────────────────────────────────────────────────────────────┘│   │
│  │  ┌────────────────────────────────────────────────────────────────────┐│   │
│  │  │ 🏆 "Primera entrega en zona rural sin incidentes"               ││   │
│  │  │    Cliente: Cliente X  │  Fecha: Julio 2026                      ││   │
│  │  │    📍 Cobertura: Zona rural de Granma                            ││   │
│  │  │    💬 "El chofer encontró la dirección a pesar de las           ││   │
│  │  │        condiciones difíciles. Muy profesional."                 ││   │
│  │  └────────────────────────────────────────────────────────────────────┘│   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.19 MAQUETA 19: GESTIÓN DE PARÁMETROS FINANCIEROS Y ADUANA (Web - Escritorio)

**Objetivo:** Centralizar la configuración de todos los parámetros financieros, gestionar la integración con aduanas para el cálculo de costos reales de importación y configurar los esquemas de pago a choferes.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── CONFIGURACIÓN FINANCIERA ──────────────────────────────────────────┐   │
│  │  [ PARÁMETROS GENERALES ] [ PAGO A CHOFERES ] [ ADUANA Y COSTOS ]   │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── PARÁMETROS GENERALES ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  💰 Tasa de Cambio USD → CUP: [ 240.00 ]  [ Actualizar ]             │   │
│  │  ⛽ Precio Combustible (Gasolina): [ $180.00 ] / L                    │   │
│  │  ⛽ Precio Combustible (Diesel):   [ $160.00 ] / L                    │   │
│  │  📦 Costo Fijo por Importación (USD): [ $5.00 ] / paquete            │   │
│  │  💱 Moneda de Reporte: [ CUP ] [ USD ]                               │   │
│  │                                                                        │   │
│  │  ──── COSTOS POR KILÓMETRO ────                                      │   │
│  │  🔧 Mantenimiento: [ $15.00 ] / km                                   │   │
│  │  🚗 Neumáticos:     [ $5.00 ] / km                                   │   │
│  │  📉 Depreciación:   [ $8.00 ] / km                                   │   │
│  │  🛡️ Seguros:        [ $3.00 ] / km                                   │   │
│  │  📋 Administrativos: [ $4.00 ] / km                                  │   │
│  │  🏛️ Impuestos:      [ $2.00 ] / km                                   │   │
│  │                                                                        │   │
│  │  📋 Historial de Actualizaciones                                      │   │
│  │  ┌──────────────────────────────────────────────────────────────┐    │   │
│  │  │ 18/08/2026 10:30 - Tasa: 240.00 - Usuario: Osleyder G.      │    │   │
│  │  │ 15/08/2026 09:00 - Tasa: 235.00 - Usuario: Osleyder G.      │    │   │
│  │  │ 10/08/2026 14:20 - Gasolina: $170.00 - Usuario: Osleyder G. │    │   │
│  │  └──────────────────────────────────────────────────────────────┘    │   │
│  │                                                                        │   │
│  │  [  GUARDAR PARÁMETROS  ]                                             │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── GESTIÓN DE ADUANA ─────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📦 **Consultar Costos de Aduana**                                    │   │
│  │                                                                        │   │
│  │  ➤ Desde el Manifiesto actual (127 envíos pendientes)                │   │
│  │  ➤ Desde selección manual de envíos                                  │   │
│  │                                                                        │   │
│  │  🌐 URL de Consulta: https://www.aerovaradero.com.cu/payment/        │   │
│  │  📝 Formato: ?cod_la={cod_la}&cod_awb={cod_awb}&cod_house={house}   │   │
│  │                                                                        │   │
│  │  [  🔍 CONSULTAR ADUANA  ]                                            │   │
│  │                                                                        │   │
│  │  ⏳ Última consulta: 18/08/2026 10:30 AM                             │   │
│  │  📊 120 de 127 envíos consultados exitosamente                       │   │
│  │  ⚠️ 7 envíos con errores (ver detalles)                              │   │
│  │                                                                        │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ AWB          │ House      │ Destinatario    │ Costo Aduana (CUP)│  │   │
│  │  ├──────────────┼────────────┼─────────────────┼───────────────────┤  │   │
│  │  │ 230-66684660 │ 24014926   │ Anilex M. Pérez │ $1,250.00         │  │   │
│  │  │ 230-66684660 │ 24014927   │ Anilex M. Pérez │ $850.00           │  │   │
│  │  │ 230-66684660 │ 24014928   │ Adianet F. Brito│ $0.00 (Exento)    │  │   │
│  │  │ 230-66684660 │ 24014929   │ Adianet F. Brito│ ⚠️ Error          │  │   │
│  │  │ 230-66684660 │ 24014930   │ Luis G. Díaz   │ $320.00           │  │   │
│  │  │ 230-66684660 │ 24014931   │ María R. Gómez │ $0.00 (Exento)    │  │   │
│  │  │ 230-66684660 │ 24014932   │ Carlos P. Ruiz │ $0.00 (Exento)    │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                        │   │
│  │  [  ASIGNAR COSTOS A ENVÍOS  ]  [  EXPORTAR REPORTE  ]                │   │
│  │  [  ENTRADA MANUAL  ]  [  VER DETALLES DE ERRORES  ]                 │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── ESQUEMAS DE PAGO A CHOFERES ──────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  Chofer: [ Juan C. Pérez ▼ ]                                          │   │
│  │                                                                        │   │
│  │  Esquema de Pago: [ ● Salario Fijo + Bonos ]                         │   │
│  │                    [ ○ Pago por Kilómetro ]                          │   │
│  │                    [ ○ Pago por Entrega ]                            │   │
│  │                    [ ○ Combinado ]                                   │   │
│  │                                                                        │   │
│  │  Parámetros:                                                          │   │
│  │    Salario Base Mensual:  [ $8,500.00 ]                              │   │
│  │    Bonificación por Entrega: [ $100.00 ]                             │   │
│  │    Bonificación por Eficiencia (≥95%): [ $1,200.00 ]                │   │
│  │    Pago por Kilómetro (si aplica): [ $2.50 ] / km                   │   │
│  │    Pago por Entrega (si aplica): [ $150.00 ] / entrega              │   │
│  │                                                                        │   │
│  │  📊 Resumen de Pago (Mes Actual)                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐    │   │
│  │  │ Rutas: 8  │ Kms: 2,350  │ Entregas: 47  │ Eficiencia: 94%  │    │   │
│  │  │ Total Estimado: $9,700  │ Bonos: $1,200  │ Base: $8,500    │    │   │
│  │  │ Pago por Kms: $0.00  │ Pago por Entregas: $0.00            │    │   │
│  │  └──────────────────────────────────────────────────────────────┘    │   │
│  │                                                                        │   │
│  │  [  GUARDAR ESQUEMA  ]  [  GENERAR REPORTE DE PAGO  ]                │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.20 MAQUETA 20: FICHA DE COSTO DETALLADA (Web - Escritorio)

**Objetivo:** Mostrar el desglose completo de costos de una ruta, incluyendo costos directos, indirectos y de importación.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       RUTA CAM-02 - 18/08/2026         🔔  👤 Osleyder G. │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── RESUMEN DEL VIAJE ─────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  📅 Fecha: 18/08/2026  │  🚚 Vehículo: CAC-01 (Isuzu NPR)           │   │
│  │  🧑 Chofer: Juan C. Pérez  │  📦 Entregas: 18  │  📍 Distancia: 245 km │   │
│  │  💰 Ingresos: $30,500.00  │  💵 Moneda: CUP                         │   │
│  │                                                                        │   │
│  │  [  EXPORTAR PDF  ]  [  EXPORTAR CSV  ]  [  IMPRIMIR  ]              │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── FICHA DE COSTO ────────────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ──── COSTOS DIRECTOS ────                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ Concepto              │ Cantidad  │ Precio    │ Subtotal       │  │   │
│  │  ├───────────────────────┼───────────┼───────────┼────────────────┤  │   │
│  │  │ Combustible (Diesel)  │ 32 L      │ $180.00/L │ $5,760.00      │  │   │
│  │  │ Peajes                │ -         │ -         │ $45.00         │  │   │
│  │  │ Mantenimiento         │ 245 km    │ $15.00/km │ $3,675.00      │  │   │
│  │  │ Neumáticos            │ 245 km    │ $5.00/km  │ $1,225.00      │  │   │
│  │  │ Salario del Chofer    │ -         │ -         │ $9,700.00      │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │  SUBTOTAL COSTOS DIRECTOS: $20,405.00                                 │   │
│  │                                                                        │   │
│  │  ──── COSTOS INDIRECTOS ────                                          │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ Concepto              │ Cantidad  │ Precio    │ Subtotal       │  │   │
│  │  ├───────────────────────┼───────────┼───────────┼────────────────┤  │   │
│  │  │ Depreciación          │ 245 km    │ $8.00/km  │ $1,960.00      │  │   │
│  │  │ Seguros               │ 245 km    │ $3.00/km  │ $735.00        │  │   │
│  │  │ Gastos Administrativos│ 245 km    │ $4.00/km  │ $980.00        │  │   │
│  │  │ Impuestos             │ 245 km    │ $2.00/km  │ $490.00        │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │  SUBTOTAL COSTOS INDIRECTOS: $4,165.00                                │   │
│  │                                                                        │   │
│  │  ──── COSTOS DE IMPORTACIÓN ────                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ Concepto              │ Cantidad  │ Precio    │ Subtotal       │  │   │
│  │  ├───────────────────────┼───────────┼───────────┼────────────────┤  │   │
│  │  │ Costo de Aduana       │ 18 envíos │ -         │ $2,150.00      │  │   │
│  │  │ Otros Importación     │ -         │ -         │ $0.00          │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │  SUBTOTAL COSTOS IMPORTACIÓN: $2,150.00                               │   │
│  │                                                                        │   │
│  │  ──── TOTALES ────                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │   │
│  │  │ TOTAL COSTOS: $26,720.00  │  INGRESOS: $30,500.00              │  │   │
│  │  │ UTILIDAD NETA: $3,780.00  │  MARGEN: 12.39%                    │  │   │
│  │  └─────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                        │   │
│  │  [  EXPORTAR FICHA DE COSTO  ]  [  VER DETALLE  ]                    │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  ┌─── DETALLE DE COSTOS POR ENVÍO ──────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  ┌──────────────┬───────────────┬───────────────┬───────────────────┐  │   │
│  │  │ House        │ Destinatario  │ Peso (kg)    │ Costo Aduana (CUP) │  │   │
│  │  ├──────────────┼───────────────┼───────────────┼───────────────────┤  │   │
│  │  │ CACC-24014926│ Anilex M. Pérez│ 30.0         │ $1,250.00         │  │   │
│  │  │ CACC-24014927│ Anilex M. Pérez│ 20.6         │ $850.00           │  │   │
│  │  │ CACC-24014928│ Adianet F. Brito│ 24.6         │ $0.00 (Exento)    │  │   │
│  │  │ ...          │ ...             │ ...          │ ...               │  │   │
│  │  └──────────────┴───────────────┴───────────────┴───────────────────┘  │   │
│  │                                                                        │   │
│  │  [Mostrando 3 de 18 envíos]  [ < 1 2 3 4 5 6 > ]                     │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.21 MAQUETA 21: MAPEO DE COLUMNAS PARA IMPORTACIÓN (Web - Escritorio) - **NUEVA**

**Objetivo:** Permitir al usuario mapear manualmente las columnas del Excel a los campos del sistema durante la importación de manifiestos.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🚚 SIGMA-T                       [Buscar...]            🔔  👤 Osleyder G.   │
│  ──────────────────────────────────────────────────────────────────────────── │
│  Inicio  │  Envíos  │  Rutas  │  Flota  │  Choferes  │  Finanzas  │  Reportes │
│  ──────────────────────────────────────────────────────────────────────────── │
│                                                                                │
│  ┌─── IMPORTAR MANIFIESTO ──────────────────────────────────────────────┐   │
│  │                                                                        │   │
│  │  Paso 1: Seleccionar archivo Excel                                    │   │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │   │
│  │  │ [ 📁 Seleccionar archivo ]   manifiesto_ago2026.xlsx            │ │   │
│  │  └──────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                        │   │
│  │  Paso 2: Mapear columnas del Excel a campos del sistema               │   │
│  │                                                                        │   │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │   │
│  │  │ Campo del Sistema        │ Columna en Excel (selector)          │ │   │
│  │  │──────────────────────────┼─────────────────────────────────────│ │   │
│  │  │ House (obligatorio)      │ [ House ▼ ]                         │ │   │
│  │  │ Descripción (obligatorio)│ [ Naturaleza y Cantidad ▼ ]         │ │   │
│  │  │ Peso (kg) (obligatorio)  │ [ Peso ▼ ]                          │ │   │
│  │  │ Bultos (obligatorio)     │ [ Bultos ▼ ]                        │ │   │
│  │  │ Remitente (obligatorio)  │ [ Remitente ▼ ]                     │ │   │
│  │  │ Passport (opcional)      │ [ Passport ▼ ]                      │ │   │
│  │  │ Destinatario (obligat.)  │ [ Destinatario ▼ ]                  │ │   │
│  │  │ Carnet Identidad (oblig.)│ [ Carnet de Identidad ▼ ]           │ │   │
│  │  │ Teléfono (obligatorio)   │ [ Teléfono ▼ ]                      │ │   │
│  │  │ Dirección (obligatorio)  │ [ Dirección ▼ ]                     │ │   │
│  │  │ Cobrado/No Cobrado (opc.)│ [ Cobrado/No Cobrado ▼ ]            │ │   │
│  │  │ Unidad destino (oblig.)  │ [ Unidad de destino ▼ ]             │ │   │
│  │  └──────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                        │   │
│  │  [  ⏭️ SIGUIENTE  ]                                                    │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  Paso 3: Vista previa de los datos                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ ⚠️ 127 envíos encontrados | Mostrando todos los registros            │   │
│  │ ┌──────────┬───────────────┬────────┬────────┬─────────┬───────────┐ │   │
│  │ │ House    │ Destinatario  │ Peso   │ Bultos │ Estado  │ Errores   │ │   │
│  │ ├──────────┼───────────────┼────────┼────────┼─────────┼───────────┤ │   │
│  │ │ CACC-001 │ Anilex Pérez  │ 30.0   │ 2      │ ✅ Válido│ -         │ │   │
│  │ │ CACC-002 │ Luis González │ 20.6   │ 1      │ ✅ Válido│ -         │ │   │
│  │ │ CACC-003 │ Adianet Brito │ 24.6   │ 3      │ ✅ Válido│ -         │ │   │
│  │ │ CACC-004 │ María Gómez   │ 0.0    │ 1      │ ❌ Error │ Peso 0    │ │   │
│  │ │ CACC-005 │ Pedro Ruiz    │ 15.2   │ 0      │ ❌ Error │ Bultos 0  │ │   │
│  │ │ ...      │ ...           │ ...    │ ...    │ ...     │ ...       │ │   │
│  │ └──────────┴───────────────┴────────┴────────┴─────────┴───────────┘ │   │
│  │                                                                        │   │
│  │ 📊 Resumen: 8 válidos | 2 con errores                                  │   │
│  │                                                                        │   │
│  │ [  ✅ CONFIRMAR IMPORTACIÓN  ]  [  ❌ CANCELAR  ]  [  📄 VER ERRORES ] │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
│  [Página 1/1]                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. FLUJOS DE USUARIO CLAVE - ACTUALIZADOS

### 4.1 Flujo: Importación de Manifiesto con Mapeo de Columnas (NUEVO)
1. Administrador abre Envíos → Selecciona "Importar Manifiesto".
2. Selecciona el archivo Excel desde su computadora.
3. El sistema muestra la pantalla de **mapeo de columnas**.
4. El administrador asigna manualmente qué columna del Excel corresponde a cada campo del sistema usando selectores desplegables.
5. El sistema valida que los campos obligatorios tengan una columna asignada.
6. El administrador hace clic en "SIGUIENTE".
7. El sistema muestra la **vista previa** de todos los registros con su estado (válido/error).
8. El administrador revisa los datos y confirma la importación.
9. El sistema procesa los datos válidos y genera un reporte de errores si los hay.

### 4.2 Flujo: El Líder - Gestión de Aduana y Costos
1. Líder abre Finanzas → Selecciona "Parámetros Financieros y Aduana".
2. Configura la tasa de cambio USD/CUP, el precio de los combustibles y los costos por km.
3. Navega a la pestaña "ADUANA Y COSTOS".
4. Selecciona el manifiesto actual o un conjunto de envíos.
5. Hace clic en "CONSULTAR ADUANA".
6. El sistema consulta automáticamente el sitio de Aerovaradero para cada par AWB/House utilizando la URL de payment.
7. El sistema muestra el progreso de la consulta en tiempo real (120/127).
8. Los costos obtenidos se asignan automáticamente a cada envío.
9. Líder revisa los resultados y exporta el reporte.

### 4.3 Flujo: El Líder - Gestión de Pago a Choferes
1. Líder abre Finanzas → Selecciona "Parámetros Financieros y Aduana".
2. Navega a la pestaña "PAGO A CHOFERES".
3. Selecciona un chofer de la lista desplegable.
4. Define el esquema de pago (Salario Fijo, por Km, por Entrega, o Combinado).
5. Configura los parámetros específicos (salario base, bonificaciones, tarifas).
6. El sistema calcula automáticamente el resumen de pago del mes actual.
7. Líder guarda el esquema y genera el reporte de pago.

### 4.4 Flujo: El Líder - Generación de Ficha de Costo
1. Líder abre Rutas → Selecciona "Planificación Semanal".
2. Selecciona una ruta específica (ej. CAM-02).
3. Hace clic en "VER FICHA DE COSTO".
4. El sistema calcula automáticamente todos los costos:
   - Directos: combustible, peajes, mantenimiento, neumáticos, salario.
   - Indirectos: depreciación, seguros, administrativos, impuestos.
   - Importación: costos de aduana (consultados previamente).
5. El sistema muestra la ficha de costo completa con:
   - Resumen del viaje.
   - Desglose por categoría.
   - Totales: costo total, utilidad neta, margen.
   - Detalle de costos por envío (opcional).
6. Líder puede exportar la ficha a PDF o CSV.

### 4.5 Flujo: El Chofer - Visualización de Costos de Aduana
1. Chofer abre la app y selecciona "Ruta del día".
2. En la lista de entregas, ve el costo de aduana asociado a cada paquete (si está disponible).
3. Al llegar a la entrega, el chofer puede ver el costo de aduana en el detalle.
4. Si el costo de aduana no está disponible, el sistema muestra "Costo pendiente de consulta".

---

## 5. PRINCIPIOS DE USABILIDAD (Heurísticas de Nielsen)

| Heurística | Aplicación en SIGMA-T |
| :--- | :--- |
| **Visibilidad del estado del sistema** | Indicadores de carga, notificaciones de sincronización, estado de los envíos (🟢🟡🔴), progreso de consultas de aduana, estado de generación de ficha de costo, progreso de importación. |
| **Relación entre el sistema y el mundo real** | Uso de iconos reconocibles (📦, 🚚, ⏰, 💰, 📄), lenguaje natural en mensajes. |
| **Control y libertad del usuario** | Edición manual de rutas (drag & drop), deshacer acciones, botones de "cancelar", mapeo flexible de columnas. |
| **Consistencia y estándares** | Misma paleta de colores y componentes UI en toda la plataforma. |
| **Prevención de errores** | Validación de datos al importar, confirmación de acciones críticas, validación en tiempo real de Carnet de Identidad (11 dígitos). |
| **Reconocimiento antes que recuerdo** | Menús visibles, búsqueda avanzada, historial de acciones, selectores de columnas en importación. |
| **Eficiencia y flexibilidad de uso** | Accesos directos (teclado), vistas de datos personalizables, exportación rápida, mapeo flexible. |
| **Estética y diseño minimalista** | Interfaces limpias, sin elementos distractores, enfocadas en datos clave. |
| **Ayuda y documentación** | Tooltips, mensajes de ayuda contextuales, manuales de usuario, guías de mapeo. |

---

## 6. CONCLUSIÓN

Este documento consolida un total de **21 pantallas de alta fidelidad** (20 existentes + 1 nueva para mapeo de columnas), diseñadas para cubrir todos los módulos de SIGMA-T incluyendo la nueva funcionalidad de ficha de costo detallada, los parámetros financieros actualizados y el mapeo flexible de columnas para importación de manifiestos. La identidad visual, los flujos de usuario y los principios de usabilidad implementados posicionan a SIGMA-T al mismo nivel que los sistemas de gestión de transporte líderes a nivel mundial, pero con la ventaja de estar diseñado específicamente para las necesidades del ecosistema cubano.

**Resumen de las nuevas funcionalidades:**
- **Mapeo flexible de columnas** para importación de Excel
- Gestión de parámetros financieros (tasa de cambio USD/CUP, precio de combustibles, **costos por km**)
- Consulta automática de costos de aduana desde el sitio web de Aerovaradero (**URL de payment**)
- Asignación de costos de aduana a cada envío
- Gestión de esquemas de pago a choferes (fijo, por km, por entrega, combinado)
- **Ficha de costo detallada por ruta** con desglose de costos directos, indirectos y de importación
- Exportación de ficha de costo a PDF y CSV
- Generación de reportes de pago
- **Validación de Carnet de Identidad (11 dígitos)** y **Unidad de destino (obligatoria)**

**Próximo Paso:** Con estas maquetas validadas e incluyendo las nuevas funcionalidades, estamos listos para el desarrollo técnico del Sprint 1 (Core de Envíos) con las tareas pendientes de importación con mapeo flexible.