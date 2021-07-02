import { Functionality } from '../../functionality/interfaces/functionality.interface';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  functionalities: any;

  @ApiProperty()
  create_ERP: boolean;

  @ApiProperty()
  readonly create_by: string;

  @ApiProperty()
  readonly update_by: string;

  @ApiProperty()
  readonly create_date: Date;

  @ApiProperty()
  readonly update_date: Date;
}
