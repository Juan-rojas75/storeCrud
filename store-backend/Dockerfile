# Imagen base para Node.js
FROM node:16-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (si existe)
COPY store-backend/package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto de los archivos
COPY store-backend ./

# Exponer el puerto en el que corre la aplicación
EXPOSE 3001

# Comando para correr la aplicación en producción
CMD ["npm", "run", "start:prod"]
