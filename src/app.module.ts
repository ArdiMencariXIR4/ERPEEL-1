import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BooksModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({        // 👈 moved INSIDE imports array
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env',
    }),
    PrismaModule,
    StudentsModule,
    BooksModule,
    BorrowModule,
    AuthModule,
    SeedModule,
  ],
})
export class AppModule {}