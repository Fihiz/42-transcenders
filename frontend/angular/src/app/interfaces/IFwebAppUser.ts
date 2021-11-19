export interface IFwebAppUser {
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