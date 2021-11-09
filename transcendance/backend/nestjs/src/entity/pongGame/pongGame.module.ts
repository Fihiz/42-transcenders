import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PongGameEntity } from "./pongGame.entity";
import { PongGameService } from "./pongGame.service";

@Module({
    imports: [TypeOrmModule.forFeature([PongGameEntity])],
    providers: [PongGameService],
  })
export class PongGameModule {}
  