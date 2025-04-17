# Imagen base
FROM node:20

# Crear y usar directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto que usa NestJS
EXPOSE 3000

# Comando para iniciar la app en producción
CMD ["npm", "run", "start:prod"]
