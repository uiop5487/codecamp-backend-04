import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersServices } from '../users/users.service';
import { AuthsService } from './auths.service';

interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    name: string;
    phone: string;
    address: string;
    rank: string;
  };
}

@Controller()
export class AuthsController {
  constructor(
    private readonly usersService: UsersServices, //
    private readonly authsService: AuthsService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findEmail({ email: req.user.email });

    if (!user)
      user = await this.usersService.create({
        createUserInput: req.user,
        hashedPassword: req.user.hashedPassword,
      });

    this.authsService.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
