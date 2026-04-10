// update-student.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty({ required: false })
  nis?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  kelas?: string;

  @ApiProperty({ required: false })
  jurusan?: string;
}