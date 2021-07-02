import { LDVDetail } from '../interfaces/ldv-detail.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LDVDto {

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly tenant: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly details: [LDVDetail];

}
