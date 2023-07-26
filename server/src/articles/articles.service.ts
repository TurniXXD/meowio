import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleDto } from './dto/articles.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    const article = new Article({
      title: createArticleDto.title,
      content: createArticleDto.content,
      image_id: createArticleDto.imageId,
      perex: createArticleDto.perex,
    });

    const articleCreated = await this.entityManager.save(article);

    return {
      articleId: articleCreated.id,
      title: articleCreated.title,
      content: articleCreated.content,
      imageId: articleCreated.image_id,
      perex: articleCreated.perex,
      createdAt: articleCreated.created_at,
      lastUpdatedAt: articleCreated.updated_at,
    };
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
