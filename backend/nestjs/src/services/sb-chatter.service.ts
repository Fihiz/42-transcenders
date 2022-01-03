import { InjectRepository } from "@nestjs/typeorm";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { Repository } from "typeorm";


export class ChatterService {

	constructor(@InjectRepository(ChatterEntity)
							private chatter: Repository<ChatterEntity>,){}

	async createChatter(chatter: ChatterEntity) {
		console.log('Chatter creation');
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
				chat_role: (name === emission.login) ? "admin" : "chatter",
				conv_id: convId,
				is_present: "yes",
				login: name,
				muted: false,
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
      muted: chatter.muted
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
}