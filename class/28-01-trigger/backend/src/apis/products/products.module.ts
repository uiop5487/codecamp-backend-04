import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesloacation } from '../productsSaleslocations/entities/productsSalesloaction.entity';
import { ProductTag } from '../productsTags/entities/productsTags.entity';
import { Product } from './entities/product.entity';
import { ProductsSubscripber } from './entities/product.subscriber';
import { ProductResolvers } from './products.resolver';
import { ProductServices } from './products.service';

@Module({
  imports: [
    // typeorm 모듈은 엔티티를 전달한다. 없으면 데이터베이스와 연동이 안됨
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesloacation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductResolvers, //
    ProductServices,
    ProductsSubscripber,
  ],
})
export class ProductModules {}
