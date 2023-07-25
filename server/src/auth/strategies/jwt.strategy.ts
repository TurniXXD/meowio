import { Injectable } from '@nestjs/common';
import { Payload, Role } from '@auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: Payload): Promise<{
    id: string;
    role: Role;
  }> {
    console.log({ payload });
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}
