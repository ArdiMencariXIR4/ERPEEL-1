import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  PETUGAS = 'PETUGAS',
}

export class RegisterDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.PETUGAS })
  role: UserRole;
}