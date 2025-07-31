import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientDto {
  @Field() firstName: string;
  @Field() lastName: string;
  @Field() email: string;
  @Field() phone: string;
  @Field() birthDate: Date;
  @Field() gender: string;
}
