import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/type/context';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 데이터 베이스에서 찾기)
    const user = await this.usersService.findOne({ email });

    // 2. 유저가 있는지 여부확인
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    // 3. 비밀번호가 일치하는지 확인
    const isAuth = await bcrypt.compare(password, user.password);
    console.log(isAuth);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    // 4. 리프레쉬토큰 만들어서 프론트엔드 쿠키에 보내주기
    this.authsService.setRefreshToken({ user, res: context.res });

    // 5. 액세스 토큰 만들기
    return this.authsService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authsService.getAccessToken({ user: context.req.user });
  }
}
