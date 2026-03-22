import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionAuditDocument = SessionAudit & Document;

@Schema({ collection: 'sesiones_auditoria' })
export class SessionAudit {
  @Prop({ required: true })
  usuario_id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ nullable: true })
  ip_address: string;

  @Prop({ nullable: true })
  user_agent: string;

  @Prop({ default: () => new Date() })
  fecha_inicio: Date;
}

export const SessionAuditSchema = SchemaFactory.createForClass(SessionAudit);
