import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookDto): import(".prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        year: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        year: number;
    }>;
    findByTitle(title: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        year: number;
    }[]>;
    update(id: number, dto: UpdateBookDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        year: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    filter(id?: string, title?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        year: number;
    }[]>;
}
