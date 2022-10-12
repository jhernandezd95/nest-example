import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FindAllDto } from 'src/store/dto/find-all.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Auth(ValidRoles.OWNER)
  @ApiResponse({
    status: 201,
    description: 'Created sucessfully',
    type: Store,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Server internal error' })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  @Auth(ValidRoles.ADMIN)
  @ApiQuery({})
  @ApiResponse({
    status: 201,
    description: 'Returned sucessfully',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server internal error' })
  findAll(@Query() findAllDto: FindAllDto) {
    return this.storeService.findAll(findAllDto);
  }

  @Get(':id')
  @Auth(ValidRoles.OWNER)
  @ApiResponse({
    status: 201,
    description: 'Returned sucessfully',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server internal error' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.OWNER)
  @ApiResponse({
    status: 201,
    description: 'Updated sucessfully',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server internal error' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.OWNER)
  @ApiResponse({
    status: 201,
    description: 'Removed sucessfully',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server internal error' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.storeService.remove(id);
  }
}
