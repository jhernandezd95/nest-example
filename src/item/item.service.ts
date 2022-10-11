import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { FindAllDto } from './dto/find-all.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);
    await this.itemRepository.save(item);
    return item;
  }

  findAll(findAllDto: FindAllDto) {
    const { limit = 10, skip = 0 } = findAllDto;

    return this.itemRepository.find({
      take: limit,
      skip,
    });
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found.`);
    }
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.preload({
      id,
      ...updateItemDto,
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found.`);
    }

    return this.itemRepository.save(item);
  }

  async remove(id: string) {
    await this.itemRepository.softDelete({ id });
  }
}
