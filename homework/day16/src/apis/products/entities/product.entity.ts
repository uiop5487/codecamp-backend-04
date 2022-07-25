import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';
import { ProductSubType } from 'src/apis/productsSubType/entities/productSubType.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Seller } from 'src/apis/sellers/entities/seller.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contents: string;

  @Column()
  price: number;

  @Column()
  unit: string;

  @Column()
  volume: string;

  @Column()
  origin: string;

  @Column()
  isBest: boolean;

  @Column()
  isNew: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => ProductSubCategory)
  subCategory: ProductSubCategory;

  @ManyToOne(() => ProductSubType)
  subType: ProductSubType;

  @JoinTable()
  @ManyToMany(() => ProductTag, (ProductTag) => ProductTag.products)
  tags: ProductTag[];

  @ManyToOne(() => Seller)
  seller: Seller;
}
