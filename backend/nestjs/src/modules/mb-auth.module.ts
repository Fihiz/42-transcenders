import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/cb-auth.controller';
import { AuthService } from 'src/services/sb-auth.service';
import { UserModule } from './mb-user.module';

@Module({
    imports: [UserModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
