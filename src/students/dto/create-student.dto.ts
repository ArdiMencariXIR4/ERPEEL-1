// create-student.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: '12345' })
  nis: string;

  @ApiProperty({ example: 'Budi Santoso' })
  name: string;

  @ApiProperty({ example: 'budi@email.com', required: false })
  email?: string;

  @ApiProperty({ example: 'XII' })
  kelas: string;

  @ApiProperty({ example: 'RPL' })
  jurusan: string;
}