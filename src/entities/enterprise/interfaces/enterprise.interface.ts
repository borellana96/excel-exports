import { Document } from 'mongoose';
export interface Enterprise extends Document {
    database_connection?: string;
    url_main_page?: string;
    bussiness_name: string;
    tenant: string;
    active: boolean;
    allowed_hosts: any;
    allowed_api_request_hosts: any;
    external_api_request: any;
    query_json: any;
    name: any;
    contact_phone: string;
    contact_address: string;
    contact_email: string;
    position_lat: number;
    position_lng: number;
    marker_position: string;
    bussiness_img: string;
    contact_phone_img: string;
    contact_address_img: string;
    contact_email_img: string;
    type_token: number;
    currency: [string],
    token: string;
    key: string;
    bussiness_parameters: any;
}