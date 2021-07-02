import { Role } from '../../role/interfaces/role.interface';
import { User } from '../interfaces/user.interface';
import { UserAdress } from '../../user-address/interfaces/user-address.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly _id?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  readonly role_id: any;

  @ApiProperty()
  email: string;

  @ApiProperty()
  readonly birthDate: Date;

  @ApiProperty()
  tenant: string;

  @ApiProperty()
  readonly cellphone: string;

  @ApiProperty()
  readonly first_time: boolean;

  @ApiProperty()
  state: string;

  @ApiProperty()
  readonly entity_type: string;

  @ApiProperty()
  readonly entity_id: string;

  @ApiProperty()
  verified_email: boolean;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  readonly genre: string;

  @ApiProperty()
  readonly create_date: Date;

  @ApiProperty()
  is_customer_admin: boolean;


  @ApiProperty()
  address: [string];

  @ApiProperty()
  update_date: Date;

  @ApiProperty()
  type_document: any;

  @ApiProperty()
  additionals: any;

  @ApiProperty()
  readonly create_by: [User];

  @ApiProperty()
  update_by: [User];

  @ApiProperty()
  code_ERP: string;

  @ApiProperty()
  wishlist?: any[];

  @ApiProperty()
  giftCard: any

  @ApiProperty()
  totalWallet:number

  @ApiProperty()
  wallet: any
}
