import { role, status } from "src/entities/eb-web-app-user.entity"

export class CreateUserDto {
    login: string;
    pseudo: string;
    avatar: string;
    status: status;
    bio: string;
    pending_queue: boolean;
    banned: boolean;
    admonishement: number;
    app_role: role;
    created: Date;
    updated: Date;
    last_name: string;
    first_name: string;
    mail: string;
    doubleAuth: boolean;
}

