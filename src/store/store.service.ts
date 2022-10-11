import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllDto } from 'src/item/dto/find-all.dto';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const store = this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(store);
    return store;
  }

  findAll(findAllDto: FindAllDto) {
    const { limit = 10, skip = 0 } = findAllDto;

    return this.storeRepository.find({
      take: limit,
      skip,
    });
  }

  async findOne(id: string) {
    const store = await this.storeRepository.findOneBy({ id });

    if (!store) {
      throw new NotFoundException(`Item with id ${id} not found.`);
    }
    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeRepository.preload({
      id,
      ...updateStoreDto,
    });

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found.`);
    }

    return this.storeRepository.save(store);
  }

  async remove(id: string) {
    await this.storeRepository.softDelete({ id });
  }
}
