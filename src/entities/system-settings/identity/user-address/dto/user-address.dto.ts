import { ApiProperty } from '@nestjs/swagger';

export class UserAddressDto {

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  readonly cellphone: string;

  @ApiProperty()
  readonly type_address_ERP;
  
  @ApiProperty()
  readonly type_address: string;

  @ApiProperty()
  ubigeo: string;

  @ApiProperty()
  readonly department: string;

  @ApiProperty()
  readonly province: string;

  @ApiProperty()
  readonly district: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  readonly reference: string;

  @ApiProperty()
  readonly create_date: Date;

  @ApiProperty()
  update_date: Date;

  @ApiProperty()
  create_by: string;

  @ApiProperty()
  update_by: string;

}
