import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';
import { Image } from './entities/image.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [TypeOrmModule.forFeature([Item, Image]), AuthModule],
  exports: [ItemService, TypeOrmModule],
})
export class ItemModule {}
