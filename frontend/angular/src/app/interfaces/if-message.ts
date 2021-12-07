export interface if_message {
    id:any;
    conv_id: number;
    login: string;
    date: Date;
    body:string;
    to: Array<string>;
}
