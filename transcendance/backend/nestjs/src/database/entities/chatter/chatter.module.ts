import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatterEntity } from "./chatter.entity";
import { ChatterService } from "./chatter.service";

@Module({
    imports: [TypeOrmModule.forFeature([ChatterEntity])],
    providers: [ChatterService],
    exports: [ChatterModule],
  })
export class ChatterModule {}
  