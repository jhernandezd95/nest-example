import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllDto extends PartialType(PaginationDto) {}
