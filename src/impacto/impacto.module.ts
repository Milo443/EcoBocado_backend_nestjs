import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImpactoController } from './impacto.controller';
import { ImpactoService } from './impacto.service';
import { ImpactoEvento, ImpactoEventoSchema } from './schemas/impacto-evento.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ImpactoEvento.name, schema: ImpactoEventoSchema }]),
    AuthModule,
  ],
  controllers: [ImpactoController],
  providers: [ImpactoService],
})
export class ImpactoModule {}
