import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {

  @ApiProperty()
  user: { _id: string, compose_name: string };

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  section: { _id: string, name: string };

  @ApiProperty()
  redirection_url: string;

  @ApiProperty()
  redirection_external: boolean;

  @ApiProperty()
  archive: boolean

  @ApiProperty()
  read: boolean

  @ApiProperty()
  create_date: Date

  @ApiProperty()
  update_date: Date

  @ApiProperty()
  archive_date: Date
  
  @ApiProperty()
  archive_user: string
}
