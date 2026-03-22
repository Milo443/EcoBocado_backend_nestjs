import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImpactoEventoDocument = ImpactoEvento & Document;

@Schema({ collection: 'impacto_eventos' })
export class ImpactoEvento {
  @Prop({ required: true })
  tipo: string; // 'reserva_completada', 'lote_publicado', etc.

  @Prop()
  donante_id: string;

  @Prop()
  receptor_id: string;

  @Prop()
  lote_id: string;

  @Prop({ default: 0 })
  peso_kg: number;

  @Prop({ default: 0 })
  co2_kg: number;

  @Prop({ default: () => new Date() })
  fecha: Date;
}

export const ImpactoEventoSchema = SchemaFactory.createForClass(ImpactoEvento);
