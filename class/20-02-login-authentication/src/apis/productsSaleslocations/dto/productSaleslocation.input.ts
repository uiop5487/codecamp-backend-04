import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesloacation } from '../entities/productsSalesloaction.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSalesloacation,
  ['id'],
  InputType,
) {}
