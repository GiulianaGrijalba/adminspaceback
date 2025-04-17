# Imagen base
FROM node:20

# Instalar bash
RUN apt-get update && apt-get install -y bash

# Crear y usar directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .
COPY src/.env .env  

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto que usa NestJS
EXPOSE 3000

# Comando para iniciar la app en producción
CMD ["npm", "run", "start:prod"]
