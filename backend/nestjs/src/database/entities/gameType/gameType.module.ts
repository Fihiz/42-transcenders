import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameTypeEntity } from "./gameType.entity";
import { GameTypeService } from "./gameType.service";

@Module({
    imports: [TypeOrmModule.forFeature([GameTypeEntity])],
    providers: [GameTypeService],
  })
export class GameTypeModule {}
  