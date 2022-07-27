import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productsCategory.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly prdouctCategoryRepositoy: Repository<ProductCategory>,
  ) {}
  async create({ name }) {
    const result = await this.prdouctCategoryRepositoy.save({ name: name });
    console.log(result);
    return result;
  }
}
