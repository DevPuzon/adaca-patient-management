import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Patient } from './patient.model';

@ObjectType()
export class PatientPaginated {
  @Field(() => [Patient])
  items: Patient[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
