import { ApiProperty } from '@nestjs/swagger';

export class EnterpriceDto {

  @ApiProperty()
  readonly database_connection: string;

  @ApiProperty()
  readonly url_main_page: string;

  @ApiProperty()
  readonly bussiness_name: number;

  @ApiProperty()
  readonly tenant: string;

  @ApiProperty()
  readonly active: boolean;

  @ApiProperty()
  readonly allowed_hosts: any;

  @ApiProperty()
  readonly allowed_api_request_hosts: any;

  @ApiProperty()
  readonly external_api_request: any;

  @ApiProperty()
  readonly query_json: any;

  @ApiProperty()
  readonly name: any;

  @ApiProperty()
  contact_phone: string;

  @ApiProperty()
  contact_address: string;

  @ApiProperty()
  contact_email: string;

  @ApiProperty()
  position_lat: number;

  @ApiProperty()
  position_lng: number;

  @ApiProperty()
  bussiness_img: string;

  @ApiProperty()
  contact_phone_img: string;

  @ApiProperty()
  contact_address_img: string;

  @ApiProperty()
  marker_position: string;

  @ApiProperty()
  contact_email_img: string;

  @ApiProperty()
  currency: [string];

  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly key: string;

  @ApiProperty()
  readonly bussiness_parameters: any;
}
