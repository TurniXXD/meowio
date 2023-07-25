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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
