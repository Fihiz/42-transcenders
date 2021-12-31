
export class ConversationDto {
	id: number;
	name: string;
	password: string;
	created: Date;
	updated: Date;
	members: Set<string>
}