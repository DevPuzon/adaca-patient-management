import { CommonResponsePayload } from '@/common/models/response-payload.model';
import { User } from '@/modules/user/models/user.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload extends CommonResponsePayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
