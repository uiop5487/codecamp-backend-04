import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStarbucksInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  kcal: number;

  @Field(() => Number)
  fat: number;

  @Field(() => Number)
  protein: number;

  @Field(() => Number)
  salt: number;

  @Field(() => Number)
  sugars: number;

  @Field(() => Number)
  caffeine: number;
}
