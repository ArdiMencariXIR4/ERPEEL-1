import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

// 🔎 FILTER
async filter(id?: string, nis?: string, name?: string) {
  const where: any = {};

  if (id) {
    where.id = Number(id);
  }

  if (nis) {
    where.nis = nis;
  }

  if (name) {
    where.name = {
      contains: name,
    };
  }

  return this.prisma.student.findMany({ where });
}


  // ➕ CREATE
  create(dto: any) {
    return this.prisma.student.create({ data: dto });
  }

  // 📄 FIND ALL
  findAll() {
    return this.prisma.student.findMany({ orderBy: { id: 'asc' } });
  }

  // 🔍 FIND ONE
  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // ✏️ UPDATE
  async update(id: number, dto: any) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  // ❌ DELETE
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.student.delete({ where: { id } });
    return { message: `Student ${id} deleted` };
  }
}
