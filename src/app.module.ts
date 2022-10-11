import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiValidationSchema } from './config/joi.validations';

import { ItemModule } from './item/item.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: +process.env.DB_POSTGRES_PORT,
      database: process.env.DB_POSTGRES_NAME,
      username: process.env.DB_POSTGRES_USERNAME,
      password: process.env.DB_POSTGRES_PASS,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      logging: true,
      logger: 'file',
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    }),
    ItemModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
