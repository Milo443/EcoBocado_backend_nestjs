import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { ReservaEntity } from './entities/reserva.entity';
import { LoteEntity } from '../lotes/entities/lote.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservaEntity, LoteEntity]),
    AuthModule,
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
