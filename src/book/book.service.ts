import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  findAll() {
    return this.prisma.book.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const Book = await this.prisma.book.findUnique({ where: { id } });
    if (!Book) throw new NotFoundException('Book not found');
    return Book;
  }
  
  async findByTitle(title: string) {
    const books = await this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      orderBy: { id: 'asc' },
    });
  
    if (books.length === 0) {
      throw new NotFoundException('Book not found');
    }
  
    return books;
  }
  

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.book.delete({ where: { id } });
    return { message: `Book ${id} deleted` };
  }

  async filter(id?: string, title?: string) {
    return this.prisma.book.findMany({
      where: {
        id: id ? Number(id) : undefined,
        title: title
          ? {
              contains: title,
            }
          : undefined,
      },
    });
  }
  
}

