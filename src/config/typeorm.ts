import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: 'src/.env' });

const config = {
  type: 'postgres',
  host: 'db.gensxfjaulxfysakxmbx.supabase.co',
  port: 5432,
  username: 'postgres',
  password: 'Consorcio123',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false // Esto ayuda a evitar problemas de certificado
  },
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  synchronize: true,
  logging: true, // Cambiado a true para obtener más información en los logs
  dropSchema: false
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);