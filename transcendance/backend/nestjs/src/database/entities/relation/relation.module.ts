import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RelationEntity } from "./relation.entity";
import { RelationService } from "./relation.service";

@Module({
    imports: [TypeOrmModule.forFeature([RelationEntity])],
    providers: [RelationService],
  })
export class RelationModule {}
  