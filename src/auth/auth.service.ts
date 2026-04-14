import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(username: string, password: string) {
    // Only admin/admin123 works
    if (username !== 'admin' || password !== 'admin123') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException('User not found in database');

    return {
      access_token: this.jwt.sign({
        sub: user.id,
        role: user.role,
      }),
    };
  }

  async register(dto: RegisterDto) {
    // Check if username already exists
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existing) throw new ConflictException('Username already taken');

    // Hash password
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashed,
        role: dto.role as any,
      },
    });

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}