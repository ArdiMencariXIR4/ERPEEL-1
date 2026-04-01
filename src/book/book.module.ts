import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
