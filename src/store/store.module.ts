import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from './entities/store.entity';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([Store])],
  exports: [StoreService, TypeOrmModule],
})
export class StoreModule {}
