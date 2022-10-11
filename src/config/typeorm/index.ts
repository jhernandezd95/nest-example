import { DataSourceOptions } from 'typeorm';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

// Check typeORM documentation for more information.
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: +process.env.DB_POSTGRES_PORT,
  database: process.env.DB_POSTGRES_NAME,
  username: process.env.DB_POSTGRES_USERNAME,
  password: process.env.DB_POSTGRES_PASS,
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export = config;
