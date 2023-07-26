import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { Tenant } from '@tenants/entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const api_key = request.headers['x-api-key'];

    try {
      const apiKeyValid = await this.tenantRepository.findOneBy({
        api_key,
      });

      if (!api_key || !apiKeyValid || api_key !== apiKeyValid.api_key) {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  private jwtAuthGuard = new JwtAuthGuard();
  private apiKeyGuard = new ApiKeyGuard(this.tenantRepository);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await this.apiKeyGuard.canActivate(context);
      await this.jwtAuthGuard.canActivate(context);

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
