import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiUserDataEntity } from "src/entities/eb-api-user-data.entity";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { RelationEntity } from "src/entities/eb-relation.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { ChatterService } from "src/services/sb-chatter.service";
import { ConvService } from "src/services/sb-conv.service";
import { UserService } from "src/services/sb-user.service";

@Module({
  imports: [TypeOrmModule.forFeature([ ConversationEntity, WebAppUserEntity, ApiUserDataEntity, ChatterEntity, MessageEntity, RelationEntity])],
  providers: [ ConvService, UserService, ChatterService ],
})
export class ConvModule {}