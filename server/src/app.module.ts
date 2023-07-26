import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // Keep this first so that other imports have access to config
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    ArticlesModule,
    CommentsModule,
    TenantsModule,
    UsersModule,
    ImagesModule,
    // In production app I would most likely use third party storage like cloudinary or digital ocean space, but I didn't want to include my API secrets in this project
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        process.env.IMAGE_UPLOAD_PATH || 'images',
      ),
      serveRoot: '/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
