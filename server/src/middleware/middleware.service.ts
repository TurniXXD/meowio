import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MiddlewareService {
  resolveRequiredParams(params: any) {
    if (Object.keys(params).length === 0) {
      throw new BadRequestException('Required body params missing');
    }
  }
}
