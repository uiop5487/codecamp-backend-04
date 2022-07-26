import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') prodcutId: string, //
  ) {
    return this.productService.findOne({ prodcutId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productService.create({ createProductInput });
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료 여부 확인
    await this.productService.checkSoldOut({ productId });

    // 수정
    return this.productService.update({ productId, updateProductInput });
  }
}
