import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatEntity } from "./stat.entity";
import { StatService } from "./stat.service";


@Module({
    imports: [TypeOrmModule.forFeature([StatEntity])],
    providers: [StatService],
  })
export class StatModule {}
  