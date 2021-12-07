import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatServiceBis {

    getUsersConnected(map: Map<string, Array<string>>) {
        const users: Array<string> = new Array<string>();
        
        if (!map.size)
            return (null);
        let it = map.keys();
        let tmp;
        while ((tmp = it.next().value) != undefined) {
            users.push(tmp);
        }
        return (users);
    }
}