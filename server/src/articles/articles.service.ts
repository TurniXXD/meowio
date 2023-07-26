import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { EntityManager, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { ArticleDto, ArticleDtoPreview } from './dto/articles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { mapArticlesFromDBtoArticleDtoPreview } from './articles.utils';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    private readonly entityManager: EntityManager,
  ) {}

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

  async findAll(): Promise<Array<ArticleDtoPreview>> {
    const articles = await this.articlesRepository.find({
      order: { created_at: 'DESC' },
    });
    return mapArticlesFromDBtoArticleDtoPreview(articles);
  }

  async findOne(id: string): Promise<ArticleDto> {
    const article = await this.articlesRepository.findOneBy({ id });
    return {
      articleId: article.id,
      title: article.title,
      content: article.content,
      perex: article.perex,
      imageId: article.image_id,
      createdAt: article.created_at,
      lastUpdatedAt: article.updated_at,
      // In the end I would also include comments but I won't have time to finish that
    };
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
