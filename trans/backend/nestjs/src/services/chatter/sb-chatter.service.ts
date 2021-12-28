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
    newConvDatas.members.push(emission.login);
		for (const name of newConvDatas.members) {
			const chatter: ChatterEntity = {
				chat_role: (name === emission.login) ? "admin" : "chatter",
				conv_id: convId,
				is_present: "yes",
				login: name,
				muted_until: new Date(),
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
      muted_until: chatter.muted_until
    }
    return (final);
  }
}