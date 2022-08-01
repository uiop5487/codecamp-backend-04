import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PointCharge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  point: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => User)
  user: User;
}
