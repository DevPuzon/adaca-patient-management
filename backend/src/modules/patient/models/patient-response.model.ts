import { CommonResponsePayload } from '@/common/models/response-payload.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Patient } from './patient.model';

@ObjectType()
export class PatientResponse extends CommonResponsePayload {
  @Field(() => Patient)
  patient: Patient;
}
