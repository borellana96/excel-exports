import { ApiProperty } from '@nestjs/swagger';

export class ProvinceDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly id_department: string;

  @ApiProperty()
  readonly district: [string];

  @ApiProperty()
  readonly create_date: Date;

  @ApiProperty()
  readonly update_date: Date;

  @ApiProperty()
  readonly create_by: string;

  @ApiProperty()
  readonly update_by: string;
}
