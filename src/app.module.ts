import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { PostgresModule } from './database/postgres.module';
import { MongoModule } from './database/mongo.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LotesModule } from './lotes/lotes.module';
import { ReservasModule } from './reservas/reservas.module';
import { ImpactoModule } from './impacto/impacto.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    PostgresModule,
    MongoModule,
    AuthModule,
    UsuariosModule,
    LotesModule,
    ReservasModule,
    ImpactoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
