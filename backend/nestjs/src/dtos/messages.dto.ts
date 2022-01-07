export class MessageDto {
    id:any;
    conv_id: number;
    login: string;
    date: Date;
    body: any;
    to: Array<string>;
    host: string;
}