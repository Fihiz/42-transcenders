export interface if_user {
  login: string;
  pseudo: string;
  avatar: string;
  status: string;
  bio: string;
  pending_queue: boolean;
  banned: boolean;
  admonishement: number;
  app_role: string;
  created_web_app: Date;
  updated_web_app: Date;
  last_name: string;
  first_name: string;
  mail: string;
  created_api: Date;
  updated_api: Date;
}
