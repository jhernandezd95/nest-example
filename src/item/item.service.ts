import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { FindAllDto } from './dto/find-all.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Image, Item } from './entities/';
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const { Images = [], ...itemDetails } = createItemDto;

    const item = this.itemRepository.create({
      ...itemDetails,
      Images: Images.map((image) =>
        this.imageRepository.create({ name: image }),
      ),
    });
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
    const { Images, ...toUpdate } = updateItemDto;

    const item = await this.itemRepository.preload({
      id,
      ...toUpdate,
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found.`);
    }

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (Images) {
        await queryRunner.manager.delete(Image, { Item: { id } });

        item.Images = Images.map((image) =>
          this.imageRepository.create({ name: image }),
        );
      }

      // await this.productRepository.save( product );
      await queryRunner.manager.save(item);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async remove(id: string) {
    await this.itemRepository.softDelete({ id });
  }
}
