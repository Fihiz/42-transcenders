import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvitationEntity } from "./invitation.entity";
import { InvitationService } from "./invitation.service";

@Module({
    imports: [TypeOrmModule.forFeature([InvitationEntity])],
    providers: [InvitationService],
  })
export class InvitationModule {}
  