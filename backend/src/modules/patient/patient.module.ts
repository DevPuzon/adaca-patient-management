import { Module } from '@nestjs/common';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from '@/common/guards/gql-auth.guard';

@Module({
  providers: [ 
    PatientResolver,
    PatientService,
  ],
})
export class PatientModule {}
