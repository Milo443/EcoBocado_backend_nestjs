import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LoteEntity } from '../../lotes/entities/lote.entity';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';

export enum EstadoReserva {
  PENDIENTE = 'PENDIENTE',
  RECOGIDO = 'RECOGIDO',
  COMPLETADO = 'COMPLETADO',
  VENCIDO = 'VENCIDO',
}

@Entity('reservas')
export class ReservaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lote_id' })
  lote_id: string;

  @Column({ name: 'receptor_id' })
  receptor_id: string;

  @Column({ type: 'enum', enum: EstadoReserva, default: EstadoReserva.PENDIENTE })
  estado: EstadoReserva;

  @Column({ length: 255, unique: true, name: 'codigo_qr_token' })
  codigo_qr_token: string;

  @CreateDateColumn({ name: 'fecha_reserva' })
  fecha_reserva: Date;

  @Column({ type: 'timestamp', name: 'fecha_limite_recogida' })
  fecha_limite_recogida: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_completada' })
  fecha_completada: Date;

  @ManyToOne(() => LoteEntity)
  @JoinColumn({ name: 'lote_id' })
  lote: LoteEntity;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'receptor_id' })
  receptor: UsuarioEntity;
}
