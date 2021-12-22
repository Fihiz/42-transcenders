import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiUserDataEntity } from "src/entities/eb-api-user-data.entity";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { ConvService } from "src/services/Conv/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { UserService } from "src/services/sb-user.service";
import { Repository } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ ConversationEntity, WebAppUserEntity, ApiUserDataEntity, ChatterEntity])],
  providers: [ ConvService, UserService ],
})
export class ConvModule {}