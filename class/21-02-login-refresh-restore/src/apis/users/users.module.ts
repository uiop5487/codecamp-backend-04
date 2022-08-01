import { Module } from '@nestjs/common';
import { User } from './entites/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy, //
    UsersResolver, //
    UsersService,
  ],
})
export class UsersModule {}
