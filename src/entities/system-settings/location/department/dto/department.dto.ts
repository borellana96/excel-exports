import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly province: [string];

  @ApiProperty()
  readonly create_date: Date;

  @ApiProperty()
  readonly update_date: Date;

  @ApiProperty()
  readonly create_by: string;

  @ApiProperty()
  readonly update_by: string;
}
