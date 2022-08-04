import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productsCategory.entity';
import { ProductSalesloacation } from 'src/apis/productsSaleslocations/entities/productsSalesloaction.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productsTags.entity';
import { User } from 'src/apis/users/entites/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
  // @Field(() => Date)

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => ProductSalesloacation)
  @Field(() => ProductSalesloacation)
  productSaleslocation: ProductSalesloacation;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
