import { ApiProperty } from '@nestjs/swagger';

export class CurrencyDto {

  @ApiProperty()
  readonly currency: string;

  @ApiProperty()
  readonly symbol: string;

  @ApiProperty()
  readonly code: string;

}
