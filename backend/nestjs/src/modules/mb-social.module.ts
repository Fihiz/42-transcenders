import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SocialController } from 'src/controllers/cb-social.controller';
import { InvitationEntity } from 'src/entities/eb-invitation.entity';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { SocialGateway } from 'src/gateways/social.gateway';
import { SocialService } from 'src/services/sb-social.service';

@Module({
    imports: [TypeOrmModule.forFeature([InvitationEntity, RelationEntity])],
    providers: [SocialService, SocialGateway],
    controllers: [SocialController],
})
export class SocialModule {}
