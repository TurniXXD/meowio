import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { User } from '@users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TenantsModule } from '@tenants/tenants.module';
import { Tenant } from '@tenants/entities/tenant.entity';
import { MiddlewareModule } from '@middleware/middleware.module';
import { MiddlewareService } from '@middleware/middleware.service';

@Module({
  imports: [
    MiddlewareModule,
    ConfigModule,
    PassportModule,
    UsersModule,
    TenantsModule,
    // I didn't want to introduce state into the authorization process to prevent reading from the database on every request, this way I also have verified information if the user is owner
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, MiddlewareService],
})
export class AuthModule {}
