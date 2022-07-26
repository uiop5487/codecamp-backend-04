import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productsCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
  imports: [
    // typeorm 모듈은 엔티티를 전달한다. 없으면 데이터베이스와 연동이 안됨
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],
  providers: [
    ProductCategoryResolver, //
    ProductCategoryService,
  ],
})
export class ProductCategoryModule {}
