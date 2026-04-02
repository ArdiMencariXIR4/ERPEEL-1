import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
export declare class BorrowController {
    private readonly borrowService;
    constructor(borrowService: BorrowService);
    create(dto: CreateBorrowDto): Promise<{
        borrowDate: Date;
        returnDate: Date | null;
        id_borrow: number;
        studentId: number;
        bookId: number;
    }>;
    update(id: string, dto: UpdateBorrowDto): Promise<{
        borrowDate: Date;
        returnDate: Date | null;
        id_borrow: number;
        studentId: number;
        bookId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        student: {
            id: number;
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
        };
        book: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            year: number;
        };
    } & {
        borrowDate: Date;
        returnDate: Date | null;
        id_borrow: number;
        studentId: number;
        bookId: number;
    })[]>;
    filter(id?: string, date?: string): Promise<({
        student: {
            id: number;
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
        };
        book: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            year: number;
        };
    } & {
        borrowDate: Date;
        returnDate: Date | null;
        id_borrow: number;
        studentId: number;
        bookId: number;
    })[]>;
}
