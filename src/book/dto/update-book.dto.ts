// update-book.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ example: 'The Great Gatsby', required: false })
  title?: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', required: false })
  author?: string;

  @ApiProperty({ example: 1925, required: false })
  year?: number;
}