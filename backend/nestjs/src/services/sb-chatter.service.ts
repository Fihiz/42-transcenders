import { InjectRepository } from "@nestjs/typeorm";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { Repository } from "typeorm";


export class ChatterService {

	constructor(@InjectRepository(ChatterEntity)
							private chatter: Repository<ChatterEntity>,){}

	async createChatter(chatter: ChatterEntity) {
		try {
				const isFind = await this.findOneChatter(chatter.conv_id, chatter.login)
				if (!isFind) {
				const chatterInserted = await this.chatter.insert(chatter);
				return (chatterInserted);
			}
			else
				return ('ac');
		}
		catch (error) {
			return `error.severity: ${error.severity}, 
\     code: ${error.code},
\     detail: ${error.detail}`;
		}
	}

	async creationChattersForNewConv(emission, newConvDatas, convId) {
		for (const name of newConvDatas.members) {
			const chatter: ChatterEntity = {
				chat_role: (name === emission.login) ? "owner" : "chatter",
				conv_id: convId,
				is_present: "yes",
				login: name,
				muted: false,
        ban: false
			};
			const res = await this.createChatter(chatter);
      if (typeof(res) === 'string' && res != 'ac')
        return ('error')
		}
    return ('ok');
	}

	async findOneChatter(conv_id: number, name: string) {
    const chatter = await this.chatter.findOne({
      where: {conv_id: conv_id, login: name}
    });
    if (!chatter)
      return (undefined);
    const final: ChatterEntity = {
      chat_role: chatter.chat_role,
      conv_id: conv_id,
      is_present: chatter.is_present,
      login: name,
      muted: chatter.muted,
      ban: false
    }
    return (final);
  }

  async muteSomeone(chatter: ChatterEntity) {
    try {
      await this.chatter.update({login: chatter.login, conv_id: chatter.conv_id}, {muted: true})
      return ('ok');
    }
    catch (error) {
      console.log('error in muting');
      return ('ko');
    }
  }

  async deMuteSomeone(chatter: ChatterEntity) {
    try {
      await this.chatter.update({login: chatter.login, conv_id: chatter.conv_id}, {muted: false})
      return ('ok');
    }
    catch (error) {
      console.log('error in muting');
      return ('ko');
    }
  }

  async findAllChatters( conv_id ) {
    const chatters = (await this.chatter.find({
      join: {
       alias: "tmp",
       leftJoinAndSelect: {
         login: "tmp.login",
          conv_id: "tmp.conv_id",
       }},
      where: {conv_id: conv_id},
   }));
   for (const chatter of chatters) {
     const tmp0 = chatter.conv_id;
     const tmp = (chatter.login as any).login
     chatter.login = tmp;
     chatter.conv_id = tmp0;
   }
    return (chatters);
  }

  async createBanUser(user: ChatterEntity) {
    try {
      user.ban = true;
      const creationResult = await this.createChatter(user);
      if (typeof(creationResult) === 'string')
        return (creationResult);
      else
        return ('ok');
    }
    catch (error) {
      console.log('error = ', error)
      return ('ko')
    }
  }

  async unBan(name, conv_id) {
    try {
      await this.chatter.update({login: name, conv_id: conv_id}, {ban: false});
      return ('ok');
    }
    catch {
      return ('ko');
    }
  }
}