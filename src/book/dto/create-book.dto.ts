// create-book.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  author: string;

  @ApiProperty({ example: 1925 })
  year: number;
}