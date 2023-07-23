import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@database/base.entity';
import { Article } from '@articles/entities/article.entity';
import { Tenant } from '@tenants/entities/tenant.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'article_id' })
  article_id: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.id)
  @JoinColumn({ name: 'author_id' })
  author_id: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  score: number;
}
