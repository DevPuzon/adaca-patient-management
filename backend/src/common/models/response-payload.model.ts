import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonResponsePayload {
  @Field()
  message: string;
}
