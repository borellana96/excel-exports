import { ApiProperty } from '@nestjs/swagger';

export class LDVDetailDto {
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly value: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly active: boolean;

  @ApiProperty()
  readonly ref1: string;

  @ApiProperty()
  readonly ref2: string;

  @ApiProperty()
  readonly ref3: string;

  @ApiProperty()
  readonly ref4: string;

  @ApiProperty()
  readonly ref5: string;

  @ApiProperty()
  readonly position: number;

  @ApiProperty()
  readonly ref_boolean1: boolean;
}
