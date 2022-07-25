import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductMainType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
