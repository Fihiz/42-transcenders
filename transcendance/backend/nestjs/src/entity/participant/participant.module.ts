import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParticipantEntity } from "./participant.entity";
import { ParticipantService } from "./participant.service";


@Module({
    imports: [TypeOrmModule.forFeature([ParticipantEntity])],
    providers: [ParticipantService],
  })
export class ParticipantModule {}
  