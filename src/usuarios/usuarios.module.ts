import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuarioEntity } from './entities/usuario.entity';
import { OtpEntity } from './entities/otp.entity';
import { SessionAudit, SessionAuditSchema } from './schemas/session-audit.schema';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, OtpEntity]),
    MongooseModule.forFeature([{ name: SessionAudit.name, schema: SessionAuditSchema }]),
    AuthModule,
    EmailModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
