import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePatientDto } from './create-patient.dto';

@InputType()
export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @Field() id: number;
}
