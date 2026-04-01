import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBorrowDto) {

    // 🔎 check if book already borrowed and not returned
    const activeBorrow = await this.prisma.borrow.findFirst({
      where: {
        bookId: dto.bookId,
        returnDate: null,
      },
    });

    if (activeBorrow) {
      throw new BadRequestException('Book is currently borrowed and not returned yet');
    }

    return this.prisma.borrow.create({
      data: {
        studentId: dto.studentId,
        bookId: dto.bookId,
      },
    });
  }
  findAll() {
    return this.prisma.borrow.findMany({
      include: {
        student: true,
        book: true,
        
      },
    });
  }

  async update(id: number, dto: UpdateBorrowDto) {
    return this.prisma.borrow.update({
      where: { id_borrow: id },
      data: {
        returnDate: new Date(dto.returnDate),
      },
    });
  }

  async filter(id?: string, date?: string) {
    const where: any = {};

    if (id) {
      where.id_borrow = Number(id);
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      where.borrowDate = {
        gte: start,
        lt: end,
      };
    }

    return this.prisma.borrow.findMany({
      where,
      include: {
        student: true,
        book: true,
      },
    });
  }
}
