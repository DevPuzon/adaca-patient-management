import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  async onModuleInit() {
    if (!this.isConnected) {
      try {
        await this.$connect();
        this.isConnected = true;
        this.logger.log('Successfully connected to the database');
      } catch (error) {
        this.logger.error('Failed to connect to the database', error);
        throw error;
      }
    } else {
      this.logger.log('Already connected to the database');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.isConnected = false;
  }
}
