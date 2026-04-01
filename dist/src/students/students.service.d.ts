import { PrismaService } from '../../prisma/prisma.service';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    filter(id?: string, nis?: string, name?: string): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: any): import("@prisma/client").Prisma.Prisma__StudentClient<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: any): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
