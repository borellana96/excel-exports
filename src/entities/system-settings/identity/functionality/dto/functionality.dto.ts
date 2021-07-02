import { Operation } from '../../../../../entities/system-settings/identity/operation/interfaces/operation.interface';
import { ApiProperty } from '@nestjs/swagger';

export class FunctionalityDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly icon: string;
  
  @ApiProperty()
  readonly module: string;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly visible: boolean;

  @ApiProperty()
  readonly active: boolean;

  @ApiProperty()
  readonly operations: [Operation];
  
  @ApiProperty()
  readonly order: number
}
