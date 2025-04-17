import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: 'src/.env' });
const config = {
  type: 'postgres',
  url: process.env.DB_URL,
  
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  synchronize: true,
  logging: false,
  dropSchema: false,
  ssl: false,

};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
