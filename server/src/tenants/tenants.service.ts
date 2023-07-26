import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { User } from '@users/entities/user.entity';
import { getRandomAvatar } from '@utils/index';
import { hashPassword } from '@auth/auth.utils';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const { password, ...createTenantDtoRest } = createTenantDto;
    if (await this.tenantsRepository.findOneBy(createTenantDtoRest)) {
      return `Tenant with username ${createTenantDto.name} already exists`;
    }

    const passwordHash = await hashPassword(password);

    const user = new User({
      username: createTenantDtoRest.name,
      password: passwordHash,
      // I originally wanted to choose a random avatar for user, that he can later change, from 5 already existing avatars on third party storage. I would have these avatars in separate path from other images.
      avatar_id: getRandomAvatar(),
    });
    const userCreated = await this.entityManager.save(user);

    const tenant = new Tenant({
      ...createTenantDtoRest,
      password: passwordHash,
      user_id: userCreated.id,
    });

    const tenantCreated = await this.entityManager.save(tenant);

    return {
      tenantId: tenantCreated.id,
      apiKey: tenantCreated.api_key,
      name: tenantCreated.name,
      createdAt: tenantCreated.created_at,
      lastUsedAt: tenantCreated.updated_at,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }
}
