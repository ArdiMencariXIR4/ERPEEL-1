import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BooksModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env',
})
@Module({
  imports: [PrismaModule, StudentsModule, BooksModule, BorrowModule, AuthModule, SeedModule],
})

export class AppModule {}