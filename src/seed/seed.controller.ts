import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('seed')
export class SeedController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async seed() {
    const adminPass = await bcrypt.hash('admin123', 10);
    const teacherPass = await bcrypt.hash('teacher123', 10);

    await this.prisma.user.deleteMany();

    await this.prisma.user.createMany({
      data: [
        { username: 'admin', password: adminPass, role: 'ADMIN' },
        { username: 'teacher', password: teacherPass, role: 'PETUGAS' },
      ],
    });

    return { message: 'Seeded successfully' };
  }
}