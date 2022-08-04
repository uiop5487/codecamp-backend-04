import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersServices,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  async sosialLogin({ req, res }) {
    let user = await this.usersService.findEmail({ email: req.user.email });

    if (!user)
      user = await this.usersService.create({
        createUserInput: req.user,
        hashedPassword: req.user.hashedPassword,
      });

    this.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
