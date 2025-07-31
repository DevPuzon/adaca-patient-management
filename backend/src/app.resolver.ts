import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor() {}

  @Query(() => String)
  home(): string {
    return 'home';
  }
}
