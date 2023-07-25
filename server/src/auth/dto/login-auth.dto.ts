import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty({ format: 'password' })
  password: string;
}

export class AccessTokenDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty({ description: 'token expiration in seconds' })
  expires_in: number;
  @ApiProperty()
  token_type: string;
}
