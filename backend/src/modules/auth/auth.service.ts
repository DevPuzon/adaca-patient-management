import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { decrypt, encrypt } from '@/common/utils/encryption.util';
import { User } from '../user/models/user.model';
import { environment } from '@/common/utils/common.util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    email = email.toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    this.logger.debug('User', user, decrypt(user.password));
    if (!user || password !== decrypt(user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, environment('JWT_SECRET'), {
      expiresIn: '1d',
    });

    delete user.password;
    return {
      token,
      user,
    };
  }

  async registerUser(email: string, password: string): Promise<string> {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    email = email.toLowerCase();
    const hashedPassword = encrypt(password);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' },
    );

    return token;
  }
}
