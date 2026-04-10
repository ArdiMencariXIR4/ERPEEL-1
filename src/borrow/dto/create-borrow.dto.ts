// create-borrow.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {
  @ApiProperty({ example: 1 })
  studentId: number;

  @ApiProperty({ example: 1 })
  bookId: number;
}