# Imagen base para Node.js
FROM node:16-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (si existe)
COPY store-app/package*.json ./

# Instalar las dependencias del frontend
RUN npm install

# Copiar el resto de los archivos
COPY store-app ./

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para correr la aplicación en desarrollo
CMD ["npm", "run", "dev"]
