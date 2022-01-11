export interface if_message {
  id: any;
  conv_id: number;
  pseudo: string;
  login: string;
  date: Date | string;
  content: string;
  to: Array<string>;
  avatar: string;
  role: string;
  invitation: boolean;
}
