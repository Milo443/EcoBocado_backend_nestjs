import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotesController } from './lotes.controller';
import { LotesService } from './lotes.service';
import { LoteEntity } from './entities/lote.entity';
import { AuthModule } from '../auth/auth.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoteEntity]),
    AuthModule,
    StorageModule,
  ],
  controllers: [LotesController],
  providers: [LotesService],
  exports: [LotesService],
})
export class LotesModule {}
