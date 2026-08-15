# SIGMA-T - Sistema Integral de Gestión para MiPYME de Transporte

## 🚀 Visión
SIGMA-T es una plataforma de clase mundial diseñada para gestionar de forma integral una MiPYME de transporte terrestre de carga y pasajeros en Cuba.

## 📋 Módulos Principales
- **Administración de Flota:** Gestión de vehículos y mantenimiento
- **Gestión de Choferes:** Conductores, disponibilidad y esquemas de pago
- **Gestión de Envíos:** Importación Excel, registro manual e historial
- **Planificación de Rutas:** Optimización con algoritmo VRPTW
- **Módulo Financiero:** Costos, facturación y rentabilidad
- **App del Chofer:** Offline, entregas, incidencias y firma digital
- **Dashboard y Reportes:** KPIs en tiempo real
- **Integración con Aduana:** Consulta automática de costos en Aerovaradero
- **Ficha de Costo:** Desglose completo de costos por ruta

## 🆕 Funcionalidades Avanzadas (VRPTW v3.0)
- **Optimización de Combustible:** Minimiza el consumo real de combustible considerando el tipo de vehículo y precio del combustible
- **Prioridad de Entregas:** Los envíos urgentes se colocan automáticamente en las primeras 3 posiciones de la ruta
- **Reoptimización Dinámica:** Ajuste de rutas en <5 segundos ante incidencias (cliente no encontrado, tráfico, nuevos pedidos)
- **Sistema de IA:** Estimación de tiempos de entrega con precisión ≥85% usando regresión lineal
- **Análisis Post-Ruta:** Métricas de eficiencia por chofer, vehículo y zona con comparativa planificado vs real

## 🛠️ Tecnologías
- **Backend:** Node.js + TypeScript
- **Frontend:** React + Vite + Tailwind CSS
- **Mobile:** Flutter
- **Base de Datos:** PostgreSQL + PostGIS
- **Infraestructura:** Docker, VPS ETECSA, Nginx, SSL/HTTPS

## 📚 Documentación
La documentación completa del proyecto se encuentra en la carpeta `/docs`.

- [Project Charter](docs/01-project-charter.md)
- [SRS (Requisitos)](docs/02-srs.md)
- [SPMP (Plan de Proyecto)](docs/03-spmp.md)
- [Maquetas UI/UX](docs/04-maquetas-uiux.md)
- [Análisis de Competencia](docs/05-analisis-competencia.md)
- [Arquitectura de Software](docs/06-arquitectura.md)
- [Onboarding Guide](docs/07-onboarding-guide.md)

## 🏗️ Setup del Entorno de Desarrollo

### Prerrequisitos
- Node.js 22.14.0 o superior
- Docker 24.x+
- Docker Compose 2.x
- Flutter SDK 3.x
- Visual Studio Code

### Configuración Rápida
1. Clonar el repositorio
2. Ejecutar las tareas de setup en VSCode (Ctrl+Shift+P → Tasks: Run Task → Setup: Inicializar Entorno)
3. O usar Docker Compose: `docker-compose up`

## 📄 Licencia
MIT License

---

**Desarrollado por SIGMA-T Team**