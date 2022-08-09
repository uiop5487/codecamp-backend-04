import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  contents: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  unit: string;

  @Field(() => String)
  volume: string;

  @Field(() => String)
  origin: string;

  @Field(() => [String])
  productImage: string[];

  @Field(() => String)
  productCategoryId: string;

  @Field(() => String)
  productTypeId: string;

  @Field(() => String)
  sellerId: string;

  @Field(() => [String])
  tags: string[];
}
