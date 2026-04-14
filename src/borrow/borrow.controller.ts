import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/auth/roles.guard';
import { Roles } from '../auth/auth/roles.decorator';

import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OptionalJwtGuard } from '../auth/auth/optional-jwt.guard';

@ApiTags('Borrow')
@ApiBearerAuth('JWT-auth')
@UseGuards(OptionalJwtGuard, RolesGuard)
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  // 🔐 PETUGAS + ADMIN (transaction)
  @Roles('ADMIN', 'PETUGAS')
  @Post()
  create(@Body() dto: CreateBorrowDto) {
    return this.borrowService.create(dto);
  }

  @Roles('ADMIN', 'PETUGAS')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBorrowDto) {
    return this.borrowService.update(Number(id), dto);
  }

  // 🔓 any logged in user can view history
  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @Get('filter')
  filter(
    @Query('id') id?: string,
    @Query('date') date?: string,
  ) {
    return this.borrowService.filter(id, date);
  }
}
