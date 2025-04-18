import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

// Logs para depuración
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD exists:', !!process.env.DB_PASSWORD);
console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD);

// Usa configuración hardcoded mientras solucionamos el problema de variables de entorno
const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', '**', '*.migration{.ts,.js}')],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  ssl: { rejectUnauthorized: false }, // Configuración SSL para Supabase
  retryAttempts: 10,          // Número de reintentos
  retryDelay: 3000,           // Tiempo de espera entre reintentos (ms)
  connectTimeoutMS: 10000,    // Tiempo de espera de conexión (ms)
  extra: {
    family: 4 // Esto fuerza el uso de IPv4
  }  
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);