import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConversationEntity } from "./conversation.entity";
import { ConversationService } from "./conversation.service";

@Module({
    imports: [TypeOrmModule.forFeature([ConversationEntity])],
    providers: [ConversationService],
  })
export class ConversationModule {}
  