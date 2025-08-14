import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../types/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET_KEY') as string,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['accessToken'],
      ]),
    });
  }
  validate(payload: IJwtPayload) {
    return payload;
  }
}
