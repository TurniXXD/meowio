import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { verifyPassword } from './auth.utils';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { Tenant } from '@tenants/entities/tenant.entity';
import { uid } from '@utils/index';

export enum Role {
  Owner = 'owner',
  User = 'user',
}

export interface Payload {
  sub: string;
  role: Role;
}

@Injectable()
export class AuthService {
  private readonly tokenExpirationTime = 3600;
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      username,
    });
    if (!user) {
      return null;
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return null;
    }

    return user;
  }

  async resolveRole(username: string, password: string): Promise<Role> {
    const owner = await this.tenantRepository.findOneBy({ name: username });
    if (!owner) {
      return Role.User;
    }

    // Verify password again in tenant table just to be sure
    const passwordValid = await verifyPassword(password, owner.password);
    if (!passwordValid) {
      throw new Error(`Error wrong admin password`);
    }

    return Role.Owner;
  }

  async generateToken(username: string, password: string): Promise<string> {
    const payload: Payload = {
      role: await this.resolveRole(username, password),
      sub: uid(),
    };

    const signedToken = this.jwtService.sign(payload);
    return signedToken;
  }

  async login({ username, password }: LoginDto) {
    const user = await this.validateUser(username, password);
    if (user === null) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.generateToken(username, password),
      expires_in: this.tokenExpirationTime,
      token_type: 'bearer',
    };
  }

  logout() {
    return 'This action adds a new auth';
  }
}
