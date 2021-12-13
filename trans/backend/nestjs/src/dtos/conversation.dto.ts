export class ConversationDto {
	id: number;
	type: string;
	name: string;
	password: string;
	created: Date;
	updated: Date;
	members: Set<string>
}