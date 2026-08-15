# ============================================
# SIGMA-T - BACKEND DOCKERFILE
# ============================================
# Usa una imagen ligera de Node.js
FROM node:20-alpine

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache tzdata

# Establecer zona horaria
ENV TZ=America/Havana

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar caché)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar el resto del código
COPY . .

# Ejecutar linting (opcional, puede fallar si hay errores)
# RUN npm run lint || true

# Compilar TypeScript
RUN npm run build

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer el puerto
EXPOSE 3000

# Healthcheck para orquestación
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicio
CMD ["npm", "start"]