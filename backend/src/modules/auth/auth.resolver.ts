import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './models/auth.model';
import { RegisterInput } from './dto/register.input';
import { CommonResponsePayload } from '@/common/models/response-payload.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    const { token, user } = await this.authService.validateUser(
      input.email,
      input.password,
    );
    return { message: 'Login Successfully', token, user };
  }

  @Mutation(() => CommonResponsePayload)
  async register(
    @Args('input') input: RegisterInput,
  ): Promise<CommonResponsePayload> {
    const token = await this.authService.registerUser(
      input.name,
      input.email,
      input.password,
    );
    return { message: 'Successfully Created' };
  }
}
