import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesEntity } from "./messages.entity";
import { MessagesService } from "./messages.service";

@Module({
    imports: [TypeOrmModule.forFeature([MessagesEntity])],
    providers: [MessagesService],
  })
export class MEssagesModule {}
  