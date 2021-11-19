export interface WebAppUserEntity {
  login: string;
  pseudo: string;
  avatar: string;
  status: string;
  bio: string;
  pending_queue: boolean;
  banned: boolean;
  admonishement: number;
  app_role: string;
  created: Date;
  updated: Date;
}

// export interface User {
//     avatar: string;
//     login: string;
//     pseudo: string;
//     points_for_ladder: number;
//     scored_points: number;
//     created: Date;
//     updated: Date;
// }
