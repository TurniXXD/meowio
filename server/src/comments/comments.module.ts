import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthModule } from '@auth/auth.module';
import { Tenant } from '@tenants/entities/tenant.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
