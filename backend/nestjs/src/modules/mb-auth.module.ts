import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/cb-auth.controller';
import { AuthService } from 'src/services/sb-auth.service';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
