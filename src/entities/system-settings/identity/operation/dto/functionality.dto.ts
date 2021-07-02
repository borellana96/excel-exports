import { ApiProperty } from '@nestjs/swagger';

export class OperationDto {

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly method: string;
}
