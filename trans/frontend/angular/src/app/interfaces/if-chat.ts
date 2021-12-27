export interface if_chat {
  conv_id: number;
  login: string;
  chat_role: string;
  is_present: string;
  muted_until: Date;
  created_chatter: Date;
  updated_chatter: Date;
  room_type: string;
  room_name: string;
  password: string;
  created_room: Date;
  updated_room: Date;
  id_message: number;
  date_message: Date;
  content_message: string;
}
