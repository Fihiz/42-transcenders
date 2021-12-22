export interface if_message {
    id:any;
    conv_id: number;
    login: string;
    date: Date;
    content:string;
    to: Array<string>;
    avatar: string;
}
