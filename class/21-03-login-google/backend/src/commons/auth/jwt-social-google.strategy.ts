import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '1933920826-eamfdvk75sfoqragst8vnjclp9slq7c4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log('액세스 토큰', accessToken);
    console.log('리프레쉬 토큰', refreshToken);
    console.log('프로필', profile);
    return {
      email: profile.emails[0].value,
      hashedPassword: '1234',
      name: profile.displayName,
      age: 0,
    };
  }
}
