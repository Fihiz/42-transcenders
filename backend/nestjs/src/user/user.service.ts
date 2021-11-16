import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user';

@Injectable()
export class UserService {
    users:User[] = [{
        avatar: '-_ô',
        login: 'pgoudet',
        pseudo: 'pgoudey',
        points_for_ladder: 12,
        scored_points: 18,
        created: new Date(),
        updated: new Date()
    },];

    getUser() : User {
        return this.users[0];
    }
}
