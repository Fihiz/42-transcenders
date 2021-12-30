import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Not } from 'typeorm';

import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';

/**/ // TEMPORY CREATION ENTRIES FOR TESTS CREATION PARTY
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
/**/

import { status } from 'src/entities/eb-pong-game.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { UserService } from './sb-user.service';

@Injectable()
export class GameService {
	
	constructor(
		@InjectRepository(GameTypeEntity)
		private gameTypes: Repository<GameTypeEntity>,
		@InjectRepository(PongGameEntity)
		private pongGames: Repository<PongGameEntity>,
		) {}
	
	/**/ // CREATION ENTRIES FOR TESTS CREATION PARTY
	// async createGameType(/*data: GameTypeEntity*/): Promise<GameTypeEntity> | undefined {
	// 	const typeRepository = getRepository(GameTypeEntity);
	// 	const data: GameTypeEntity = {
	// 		game_type_id: 0,
	// 		game_aspect: "https://dummyimage.com/150x100/324448/aaa",
	// 		ball_size: 6,
	// 		map_type: "Customs",
	// 		initial_speed: 6,
	// 		racket_size: 6,
	// 	}
	// 	return typeRepository.insert(data)
	// 	.then((result) => {
	// 		const id: number = result.identifiers[0].game_type_id;
	// 		console.log(`New Conversation has created. (id: ${id})`);
	// 		return typeRepository.findOne({
	// 			where: { game_type_id: id }
	// 		});
	// 	})
	// 	.catch((error) => {
	// 		console.log(`New Conversation has failed...`);
	// 		console.log(`details: ${error}`);
	// 		return undefined;
	// 	});
	// }

	// async createConversation(/*data: ConversationEntity*/): Promise<ConversationEntity> | undefined {
	// 	const roomRepository = getRepository(ConversationEntity);
	// 	const data: ConversationEntity = { // Must be passed in argument
	// 		conv_id: 0,
	// 		room_type: "public",
	// 		room_name: `Room`,
	// 		password: null,
	// 		created: new Date(),
	// 		updated: new Date(),
	// 	}
	// 	return roomRepository.insert(data)
	// 	.then((result) => {
	// 		const id: number = result.identifiers[0].conv_id;
	// 		console.log(`New Conversation has created.`);
	// 		return roomRepository.findOne({
	// 			where: { conv_id: id }
	// 		});
	// 	})
	// 	.catch((error) => {
	// 		console.log(`New Conversation has failed...`);
	// 		console.log(`details: ${error}`);
	// 		return undefined;
	// 	});
	// }
	/**/

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

	async getAllPartiesInProgress(): Promise<PongGameEntity[]> | undefined {
		const partyRepository = await getRepository(PongGameEntity);
		return partyRepository.find({
			relations: ["player1", "player2", "game_type_id"],
			where: { game_status: status.Playing }
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

	async searchOneTypeOfGame(createPartyDto: CreatePartyDto): Promise<GameTypeEntity> | undefined {
		const typeRepository = getRepository(GameTypeEntity);
		return typeRepository.findOne({
			where: { map_type: createPartyDto.map_type }
		})
		.then((response) => {
			const type = response;
			console.log(`Search type of game has succeeded.`);
			return type;
		})
		.catch((error) => {
			console.log(`Search new parties has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async searchOnePartyInProgress(createPartyDto: CreatePartyDto): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: [
				{ player1: createPartyDto.login, game_status: Not(status.Finished) },
				{ player2: createPartyDto.login, game_status: Not(status.Finished) }
			],
		})
		.then((response) => {
			const party = response;
			console.log(`Search one party in progress has succeeded.`);
			return party;
		})
		.catch((error) => {
			console.log(`Search one party in progress has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async searchAllNewParties(createPartyDto: CreatePartyDto, type: GameTypeEntity): Promise<PongGameEntity[]> {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.find({
			where: { game_status: status.Creation, player1: Not(createPartyDto.login), player2: null, game_type_id: type.game_type_id }
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

	async createParty(createPartyDto: CreatePartyDto, type: GameTypeEntity): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const party: PongGameEntity = {
			game_id: 0,
			player1: createPartyDto.login,
			player2: null,
			player1_score: 0,
			player2_score: 0,
			game_status: status.Creation,
			winner: null,
			looser: null,
			game_type_id: type.game_type_id,
			// room_id: room.conv_id,
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

	async matchParty(parties: PongGameEntity[]): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const set: number [] = [];
		parties.forEach(element => {
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
	
	async joinParty(party: PongGameEntity, createPartyDto: CreatePartyDto): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.update( party.game_id, { player2: createPartyDto.login, game_status: status.Playing, updated: new Date() } )
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

	async getPartyById(id: number): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: { game_id: id }
		})
		.then((response) => {
			console.log(`Search party by id has succeeded.`);
			return response;
		})
		.catch((error) => {
			console.log(`Search party by id has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}
	
	async getPartyByLogin(login: string): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: [
				{ player1: login, game_status: status.Playing },
				{ player2: login, game_status: status.Playing },
				{ player1: login, game_status: status.Creation },
				{ player2: login, game_status: status.Creation }
			]
		})
		.then((response) => {
			console.log(`Search party by login has succeeded.`);
			return response;
		})
		.catch((error) => {
			console.log(`Search party by login has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

//

	async deletePartyById(id: number): Promise<any> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.delete(id)
		.then((response) => {
			console.log(`Delete party by id has succeeded.`);
			return true;
		})
		.catch((error) => {
			console.log(`Delete party by id has failed...`);
			console.log(`details: ${error}`);
			return false;
		})
	}

}
