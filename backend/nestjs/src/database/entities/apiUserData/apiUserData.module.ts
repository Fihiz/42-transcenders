import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiUserDataEntity } from "./apiUserData.entity";
import { ApiUserDataService } from "./apiUserData.service";

@Module({
    imports: [TypeOrmModule.forFeature([ApiUserDataEntity])],
    providers: [ApiUserDataService],
  })
export class ApiUserDataModule{}
  