import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

// Cargar variables de entorno desde el archivo src/.env
dotenvConfig({ path: 'src/.env' });

// Verificar que las variables de entorno estén definidas
console.log("Variables cargadas:", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  // No mostramos la contraseña por seguridad
  DB_PASSWORD_EXISTS: !!process.env.DB_PASSWORD
});

// Si las variables no están definidas, usar valores de respaldo genéricos
const dbHost = process.env.DB_HOST ?? 'localhost';
const dbPort = process.env.DB_PORT ?? '5432';
const dbUser = process.env.DB_USER ?? 'postgres';
const dbPassword = process.env.DB_PASSWORD ?? 'password';
const dbName = process.env.DB_NAME ?? 'postgres';
const config = {
  type: 'postgres',
  host: dbHost,
  port: parseInt(dbPort, 10),
  username: dbUser,
  password: dbPassword,
  database: dbName,
  ssl: {
    rejectUnauthorized: false
  },
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  synchronize: true,
  logging: true,
  dropSchema: false
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);