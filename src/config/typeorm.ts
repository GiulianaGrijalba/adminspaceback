import{ config as dotenvConfig} from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: 'src/.env' });
const config ={
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
    synchronize: true,
    logging: false,
    dropSchema: false
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);