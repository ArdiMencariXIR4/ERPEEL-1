import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: any): import(".prisma/client").Prisma.Prisma__StudentClient<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: any): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
