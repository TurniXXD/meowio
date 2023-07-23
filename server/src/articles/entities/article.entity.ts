import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { BaseEntity } from '@database/base.entity';
import { Tenant } from '@tenants/entities/tenant.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.id)
  @JoinColumn({ name: 'author_id' })
  author_id: string;

  @Column({ unique: true })
  @Generated('uuid')
  image_id: string;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column()
  content: string;
}
