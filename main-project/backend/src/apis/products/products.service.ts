import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageService } from '../productsImage/productImage.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private readonly prdouctRepository: Repository<Product>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,

    private readonly productImageService: ProductImageService,
  ) {}

  async findAll() {
    return this.prdouctRepository.find({
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
        'productImage',
      ],
    });
  }

  async findOne({ prodcutId }) {
    return this.prdouctRepository.findOne({
      where: { id: prodcutId },
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
        'productImage',
      ],
    });
  }

  findWithDeleted() {
    return this.prdouctRepository.find({
      withDeleted: true,
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
        'productImage',
      ],
    });
  }

  async create({ createProductInput }) {
    const { productCategoryId, productTypeId, sellerId, tags, ...product } =
      createProductInput;

    const productTags = [];

    for (let i = 0; i < tags.length; i++) {
      const newTag = tags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        where: { name: tags[i] },
      });

      if (prevTag) {
        productTags.push(prevTag);
      } else {
        const aaa = await this.productTagRepository.save({ name: newTag });
        productTags.push(aaa);
      }
    }

    const result2 = await this.prdouctRepository.save({
      ...product,
      seller: { id: sellerId },
      category: { id: productCategoryId },
      type: { id: productTypeId },
      tags: productTags,
    });

    const aaa = await this.productImageService.createImage({
      image: createProductInput.productImage,
      product: result2,
    });

    console.log(aaa);

    return {
      ...result2,
      productImage: createProductInput.productImage,
    };
  }

  async update({ productId, updateProductInput }) {
    const product = await this.prdouctRepository.findOne({
      where: { id: productId },
    });

    const image = await this.productImageService.updateImage({
      image: updateProductInput.productImage,
      product: product,
    });

    const find = await this.productImageService.findImage({ image });

    const result = await this.prdouctRepository.save({
      ...product,
      id: productId,
      ...updateProductInput,
    });

    return {
      ...result,
      productImage: find,
    };
  }

  async checkSoldOut({ productId }) {
    const product = await this.prdouctRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async delete({ productId }) {
    const result = await this.prdouctRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const retoreResopnse = await this.prdouctRepository.restore(productId);
    return retoreResopnse.affected ? true : false;
  }

  async asd({ image, product }) {
    this.productImageService.updateImage({ image, product });
  }
}
