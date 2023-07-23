import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';
import { BaseEntity } from '@database/base.entity';

@Entity()
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  avatar_id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  api_key: string;
}
