import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductServices } from './products.service';

@Resolver()
export class ProductResolvers {
  constructor(private readonly productServices: ProductServices) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productServices.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') prodcutId: string, //
  ) {
    return this.productServices.findOne({ prodcutId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productServices.create({ createProductInput });
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료 여부 확인
    await this.productServices.checkSoldOut({ productId });

    // 수정
    return this.productServices.update({ productId, updateProductInput });
  }
}
