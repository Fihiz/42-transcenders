import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiUserDataEntity } from "src/entities/eb-api-user-data.entity";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { ConvService } from "src/services/Conv/sb-conv.service";
import { UserService } from "src/services/sb-user.service";

@Module({
  imports: [TypeOrmModule.forFeature([ ConversationEntity, WebAppUserEntity, ApiUserDataEntity, ChatterEntity])],
  providers: [ ConvService, UserService ],
})
export class ConvModule {}