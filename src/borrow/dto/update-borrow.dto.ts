// update-borrow.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBorrowDto {
  @ApiProperty({ example: '2025-12-31' })
  returnDate: Date;
}