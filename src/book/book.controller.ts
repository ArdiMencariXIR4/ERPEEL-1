import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/auth/roles.guard';
import { Roles } from '../auth/auth/roles.decorator';
import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';

import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';



@ApiTags('Books')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  
  @Get('title/:title')
  findByTitle(@Param('title') title: string) {
    return this.booksService.findByTitle(title);
  }
  
  @Get('filter')
  filter(
    @Query('id') id?: string,
    @Query('title') title?: string,
  ) {
    return this.booksService.filter(id, title);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }
  // 🔐 PETUGAS + ADMIN only
  @Roles('ADMIN', 'PETUGAS')
  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Roles('ADMIN', 'PETUGAS')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.update(Number(id), dto);
  }

  @Roles('ADMIN', 'PETUGAS')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}
