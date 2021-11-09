import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ParticipantEntity } from "./participant.entity";
import { ParticipantService } from "./participant.service";


@Module({
    imports: [TypeOrmModule.forFeature([ParticipantEntity])],
    providers: [ParticipantService],
  })
export class StatModule {}
  