import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';

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
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 데이터 베이스에서 찾기)
    const user = await this.usersService.findOne({ email });
    // 2. 유저가 있는지 여부확인
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    // 3. 비밀번호가 일치하는지 확인
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    // 4. 액세스 토큰 만들기
  }
}
