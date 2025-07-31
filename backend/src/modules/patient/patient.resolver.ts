import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Patient } from './models/patient.model';
import { PatientService } from './patient.service';
import { PatientPaginated } from './models/patient-paginated.model';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponse } from './models/patient-response.model';
import { CommonResponsePayload } from '@/common/models/response-payload.model';
import { GqlAuthGuard } from '@/common/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Mutation(() => PatientResponse)
  async createPatient(@Args('data') data: CreatePatientDto) {
    const patient = await this.patientService.create(data);
    return { message: 'Created Successfully', patient };
  }

  @Mutation(() => PatientResponse)
  async updatePatient(@Args('data') data: UpdatePatientDto) {
    const patient = await this.patientService.update(data.id, data);
    return { message: 'Updated Successfully ', patient };
  }

  @Mutation(() => CommonResponsePayload)
  async deletePatient(@Args('id', { type: () => Int }) id: number) {
    await this.patientService.delete(id);
    return { message: 'Deleted Successfully' };
  }

  @Query(() => [Patient])
  findAllPatients() {
    return this.patientService.findAll();
  }

  @Query(() => Patient)
  findOnePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientService.findOne(id);
  }

  @Query(() => PatientPaginated)
  getPatients(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('gender', { type: () => String, nullable: true }) gender?: string,
  ) {
    return this.patientService.findPaginated({ page, limit, search, gender });
  }
}
