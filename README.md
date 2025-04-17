# AdminSpaceBack

API de backend para la gestión de consorcios o barrios cerrados, desarrollada con NestJS, TypeORM, PostgreSQL, Docker y JWT para autenticación.

## Requisitos previos

- Node.js (v18 o superior)
- Docker y Docker Compose
- Git

## Estructura del proyecto

```
adminspaceback/
├── src/
│   ├── administracion/       # Módulo de administración
│   ├── auth/                 # Módulo de autenticación
│   ├── Complementos/         # Enums y utilidades
│   ├── config/               # Configuraciones
│   ├── Entities/             # Entidades de la base de datos
│   ├── inquilinos/           # Módulo de inquilinos
│   ├── Propietarios/         # Módulo de propietarios
│   ├── app.module.ts         # Módulo principal
│   └── main.ts               # Punto de entrada
├── .dockerignore             # Archivos ignorados por Docker
├── .env                      # Variables de entorno (desarrollo)
├── .env.production           # Variables de entorno (producción)
├── docker-compose.yml        # Configuración de Docker para desarrollo
├── docker-compose.prod.yml   # Configuración de Docker para producción
├── Dockerfile                # Configuración de la imagen Docker
└── package.json              # Dependencias y scripts
```

## Configuración inicial

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd adminspaceback
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear el archivo `.env` con la siguiente configuración (o usar el archivo proporcionado):
   ```
   # Aplicación
   PORT=3000
   NODE_ENV=development

   # Base de datos
   DB_HOST=postgres
   DB_PORT=5432
   DB_USER=adminspace
   DB_PASSWORD=adminspace_password
   DB_NAME=adminspace_db
   DB_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

   # JWT
   JWT_SECRET=tu_clave_secreta_jwt_muy_segura
   JWT_EXPIRATION=1d
   ```

## Ejecución con Docker

1. Para construir y levantar los contenedores en modo desarrollo:
   ```bash
   docker-compose up --build
   ```
   
   O usar el script predefinido:
   ```bash
   npm run docker:dev
   ```

2. Para detener los contenedores:
   ```bash
   docker-compose down
   ```
   
   O usar el script predefinido:
   ```bash
   npm run docker:down
   ```

3. Para construir y levantar los contenedores en modo producción:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```
   
   O usar el script predefinido:
   ```bash
   npm run docker:prod
   ```

## Documentación API con Swagger

Una vez que la aplicación esté corriendo, puedes acceder a la documentación de la API en:

```
http://localhost:3000/api/docs
```

## Módulos principales

### Autenticación (Auth)
- Registro de usuarios
- Login con JWT
- Protección de rutas según roles

### Administración
- Gestión de usuarios (propietarios e inquilinos)
- Gestión de unidades
- Gestión de servicios
- Gestión de notificaciones
- Gestión de solicitudes

### Propietarios
- Consulta de unidades propias
- Gestión de inquilinos
- Solicitud de servicios

### Inquilinos
- Consulta de información de la unidad
- Solicitudes a la administración
- Consulta de servicios

## Despliegue en Render

Para desplegar la aplicación en Render:

1. Crea un nuevo servicio Web en Render.
2. Conecta con tu repositorio de GitHub.
3. Configura las siguientes opciones:
   - Environment: Docker
   - Branch: main (o la rama que uses para producción)
   - Build Command: automático (Render detectará el Dockerfile)
   - Instance Type: según tus necesidades

4. Configura las variables de entorno necesarias en la sección "Environment" de Render:
   - NODE_ENV=production
   - Las mismas variables que en el archivo .env pero con los valores de producción
   - Asegúrate de configurar correctamente la URL de la base de datos de Supabase

5. Haz clic en "Create Web Service"

## Conexión con Supabase

Para usar Supabase como base de datos:

1. Crea una nueva base de datos en Supabase.
2. Obtén la URL de conexión y las credenciales.
3. Actualiza las variables de entorno relacionadas con la base de datos:
   ```
   DB_URL=postgresql://<SUPABASE_USER>:<SUPABASE_PASSWORD>@<SUPABASE_HOST>:<SUPABASE_PORT>/<SUPABASE_DB>
   ```

## Contribuir al proyecto

1. Crea una nueva rama para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. Realiza tus cambios y haz commit:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   ```

3. Envía tus cambios al repositorio:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

4. Crea un Pull Request para revisar e integrar los cambios.