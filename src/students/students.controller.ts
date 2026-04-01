import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { StudentsService } from './students.service';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/auth/roles.guard';
import { Roles } from '../auth/auth/roles.decorator';



import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // 🔎 Anyone logged in can search students
  @Get('filter')
  filter(
    @Query('id') id?: string,
    @Query('nis') nis?: string,
    @Query('name') name?: string,
  ) {
    return this.studentsService.filter(id, nis, name);
  }

  // 🔍 Anyone logged in can view
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(Number(id));
  }

  // ❗ Only ADMIN can modify students
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: any) {
    return this.studentsService.create(dto);
  }

  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.studentsService.update(Number(id), dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}
