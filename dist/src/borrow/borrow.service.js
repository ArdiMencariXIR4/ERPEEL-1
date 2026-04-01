"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BorrowService = class BorrowService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const activeBorrow = await this.prisma.borrow.findFirst({
            where: {
                bookId: dto.bookId,
                returnDate: null,
            },
        });
        if (activeBorrow) {
            throw new common_1.BadRequestException('Book is currently borrowed and not returned yet');
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
    async update(id, dto) {
        return this.prisma.borrow.update({
            where: { id_borrow: id },
            data: {
                returnDate: new Date(dto.returnDate),
            },
        });
    }
    async filter(id, date) {
        const where = {};
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
};
exports.BorrowService = BorrowService;
exports.BorrowService = BorrowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BorrowService);
//# sourceMappingURL=borrow.service.js.map