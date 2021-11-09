import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwardEntity } from "./award.entity";
import { AwardService } from "./award.service";

@Module({
    imports: [TypeOrmModule.forFeature([AwardEntity])],
    providers: [AwardService],
  })
export class AwardModule {}
  