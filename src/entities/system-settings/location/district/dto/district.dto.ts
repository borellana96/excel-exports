import { ApiProperty } from '@nestjs/swagger';

export class DistrictDto {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly id_province: string;

  @ApiProperty()
  readonly ubigeo: string;

  @ApiProperty()
  readonly create_date: Date;

  @ApiProperty()
  readonly update_date: Date;

  @ApiProperty()
  readonly create_by: string;

  @ApiProperty()
  readonly update_by: string;
}
