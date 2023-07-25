import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { Tenant } from '@tenants/entities/tenant.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
