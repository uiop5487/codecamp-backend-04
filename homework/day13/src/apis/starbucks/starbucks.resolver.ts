import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/createstarbucks.input';
import { Starbucks } from './entities/starbucks';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly boardsService: StarbucksService) {}

  @Query(() => [Starbucks])
  fetchStarbucks() {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    return this.boardsService.create({ createStarbucksInput });
  }
}
