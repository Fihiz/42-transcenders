import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatServiceBis {
    
    getUsersConnected(map: Map<string, Array<string>>) {
        const users: Set<string> = new Set<string>();

        const it = map.keys();
        while (users.add(it.next().value))
            ;
        return (users);
    }
}