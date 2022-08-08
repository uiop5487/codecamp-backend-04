import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productsCategory.entity';
import { ProductCategoriesService } from './productCategories.service';

@Resolver()
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoryService: ProductCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }
}
