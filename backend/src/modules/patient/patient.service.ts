import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PatientPaginated } from './models/patient-paginated.model';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePatientDto) {
    data.birthDate = new Date(data.birthDate);
    return this.prisma.patient.create({ data });
  }

  async findAll() {
    return this.prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: number, data: UpdatePatientDto) {
    await this.findOne(id);
    return this.prisma.patient.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.prisma.patient.delete({ where: { id } });
    return true;
  }

  async findPaginated({
    page,
    limit,
    search,
    gender,
  }: {
    page: number;
    limit: number;
    search?: string;
    gender?: string;
  }): Promise<PatientPaginated> {
    const skip = (page - 1) * limit;

    const where: any = {
      AND: [
        search
          ? {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
              ],
            }
          : undefined,
        gender ? { gender } : undefined,
      ].filter(Boolean),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }
}
