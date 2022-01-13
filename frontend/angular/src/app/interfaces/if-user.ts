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
  last_name: string;
  first_name: string;
  mail: string;
  created: Date;
  updated: Date;
  points_for_ladder: number;
  ranking: number;
}
