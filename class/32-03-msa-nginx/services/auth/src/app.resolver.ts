import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(() => String)
  login() {
    return '로그인 성공';
  }

  @Query(() => String)
  aaa() {
    return 'aaa';
  }
}
