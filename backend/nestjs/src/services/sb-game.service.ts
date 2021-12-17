import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';

/**/ // TEMPORY CREATION ENTRIES FOR TESTS CREATION PARTY
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
/**/

import { status } from 'src/entities/eb-pong-game.entity';

@Injectable()
export class GameService {
	
	constructor(
		@InjectRepository(GameTypeEntity)
		private gameTypes: Repository<GameTypeEntity>,
		@InjectRepository(PongGameEntity)
		private pongGames: Repository<PongGameEntity>,
		) {}
	
	/**/ // CREATION ENTRIES FOR TESTS CREATION PARTY
	async createGameType(/*data: GameTypeEntity*/): Promise<GameTypeEntity> | undefined {
		const typeRepository = getRepository(GameTypeEntity);
		const data: GameTypeEntity = {
			game_type_id: 0,
			game_aspect: "https://dummyimage.com/150x100/324448/aaa",
			ball_size: 6,
			map_type: "Customs",
			initial_speed: 6,
			racket_size: 6,
		}
		return typeRepository.insert(data)
		.then((result) => {
			const id: number = result.identifiers[0].game_type_id;
			console.log(`New Conversation has created. (id: ${id})`);
			return typeRepository.findOne({
				where: { game_type_id: id }
			});
		})
		.catch((error) => {
			console.log(`New Conversation has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async createConversation(/*data: ConversationEntity*/): Promise<ConversationEntity> | undefined {
		const roomRepository = getRepository(ConversationEntity);
		const data: ConversationEntity = { // Must be passed in argument
			conv_id: 0,
			room_type: "public",
			room_name: `Room`,
			password: null,
			created: new Date(),
			updated: new Date(),
		}
		return roomRepository.insert(data)
		.then((result) => {
			const id: number = result.identifiers[0].conv_id;
			console.log(`New Conversation has created.`);
			return roomRepository.findOne({
				where: { conv_id: id }
			});
		})
		.catch((error) => {
			console.log(`New Conversation has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}
	/**/

	async getAllPartiesInProgress(): Promise<PongGameEntity[]> | undefined {
		const partyRepository = await getRepository(PongGameEntity);
		return partyRepository.find({
			where: { game_status: status.Playing },
			relations: ["player1", "player2", "game_type_id"]
		})
		.then((response) => {
			const parties: PongGameEntity[] = response;
			console.log(`Get all parties in progress has succeeded.`);
			return parties;
		})
		.catch((error) => {
			console.log(`Get all parties in progress has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	// NEW
	async getAllTypesOfGame(): Promise<GameTypeEntity[]> | undefined {
		const typeRepository = await getRepository(GameTypeEntity);
		return typeRepository.find()
		.then((response) => {
			const types: GameTypeEntity[] = response;
			console.log(`Get all types of game has succeeded.`);
			return types;
		})
		.catch((error) => {
			console.log(`Get all types of game has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
}

	async searchAllNewParties(createPartyDto: CreatePartyDto): Promise<PongGameEntity[]> {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.find({
			where: { game_status: status.Creation, player2: null, map_type: createPartyDto.map_type }
		})
		.then((response) => {
			const parties: PongGameEntity[] = response;
			console.log(`Search new parties has succeeded.`);
			return parties;
		})
		.catch((error) => {
			console.log(`Search new parties has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async createParty(createPartyDto: CreatePartyDto, room: ConversationEntity/*, party: PongGameEntity*/): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const party: PongGameEntity = { // Must be passed in argument
			game_id: 0,
			player1: "Moldu_01",
			player2: null,
			player1_score: 0,
			player2_score: 0,
			game_status: status.Creation,
			winner: null,
			looser: null,
			game_type_id: 1,
			room_id: room.conv_id,
			created: new Date(),
			updated: new Date(),
		}
		return pongRepository.insert(party)
		.then((result) => {
			const id: number = result.identifiers[0].game_id;
			console.log(`New Party has created. (id: ${id})`);
			return pongRepository.findOne({
				where: { game_id: id }
			});
		})
		.catch((error) => {
			console.log(`New party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	// async matchParty(pool: PongGameEntity[]): Promise<PongGameEntity> | undefined {
	// 	const pongRepository = getRepository(PongGameEntity);
	// 	const parties = await pongRepository.find({
	// 		where: { player2: null }
	// 	})
	// 	.then((response) => {
	// 		const set: number [] = [];
	// 		response.forEach(element => {
	// 			set.push(element.game_id);
	// 		});
	// 		const selected: number = set[Math.floor(Math.random() * set.length)];
	// 		console.log(`Match party has succeeded.`);
	// 		return pongRepository.findOne({
	// 			where: { game_id: selected }
	// 		})
	// 	})
	// 	.catch((error) => {
	// 		console.log(`Match party has failed...`);
	// 		console.log(`details: ${error}`);
	// 		return undefined
	// 	});
	// 	return undefined
	// }

	async matchParty(pool: PongGameEntity[]): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const set: number [] = [];
		pool.forEach(element => {
			set.push(element.game_id);
		});
		const selected: number = set[Math.floor(Math.random() * set.length)];
		return pongRepository.findOne({
			where: { game_id: selected }
		})
		.then((response) => {
			console.log(`Match party has succeeded.`);
			return response;
		})
		.catch((error) => {
			console.log(`Match party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}
	
	// async joinParty(id: number, login: string): Promise<PongGameEntity> | undefined {
	// 	const pongRepository = getRepository(PongGameEntity);
	// 	console.log(id);
	// 	const party = await pongRepository.findOne({
	// 		where: { game_id: id }
	// 	})
	// 	.then((response) => {
	// 		console.log(`Join party has succeeded.`);
	// 		return party;
	// 	})
	// 	.catch((error) => {
	// 		console.log(`Join party has failed...`);
	// 		console.log(`details: ${error}`);
	// 		return undefined;
	// 	})
	// 	return pongRepository.save( { player2: login } );
	// }

	async joinParty(party: PongGameEntity, login: string): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.insert( { player2: login } )
		.then((response) => {
			console.log(`Join party has succeeded.`);
			return party;
		})
		.catch((error) => {
			console.log(`Join party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

}
