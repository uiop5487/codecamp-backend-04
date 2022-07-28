import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersServices } from './users.service';

@Resolver()
export class UsersResolvers {
  constructor(private readonly usersServices: UsersServices) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersServices.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersServices.findOne({ userId });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.usersServices.create({ createUserInput });
  }

  @Mutation(() => User)
  updateUser(
    @Args('userEmail') userEmail: string, //
    @Args('password') password: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersServices.update({ userEmail, password, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('userEmail') userEmail: string, //
    @Args('password') password: string, //
  ) {
    return this.usersServices.delete({ userEmail, password });
  }
}
