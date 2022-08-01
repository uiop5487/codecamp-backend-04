import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersServices } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersServices,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    const user = await this.usersService.findEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    return this.authsService.getAccessToken({ user });
  }
}
