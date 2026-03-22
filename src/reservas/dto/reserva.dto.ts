import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { EstadoReserva } from '../entities/reserva.entity';
import { LotePublicDto } from '../../lotes/dto/lote.dto';

export class ReservaCreateDto {
  @ApiProperty({
    description: 'UUID del lote que se desea reservar',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  @IsUUID()
  lote_id: string;
}

export class ReservaPublicDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', format: 'uuid' })
  lote_id: string;

  @ApiProperty({ example: 'c3d4e5f6-a7b8-9012-cdef-123456789012', format: 'uuid' })
  receptor_id: string;

  @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.PENDIENTE })
  estado: EstadoReserva;

  @ApiProperty({ example: 'qr_abc123xyz456', description: 'Token único para el código QR de recogida' })
  codigo_qr_token: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  fecha_reserva: Date;

  @ApiProperty({ example: '2024-01-16T10:30:00Z', description: 'Plazo máximo de 24h para recoger' })
  fecha_limite_recogida: Date;

  @ApiPropertyOptional({ example: null, nullable: true })
  fecha_completada?: Date;

  @ApiPropertyOptional({ example: 'Pan artesanal del día', nullable: true })
  lote_titulo?: string;

  @ApiPropertyOptional({ example: 'María García', nullable: true })
  donante_nombre?: string;

  @ApiPropertyOptional({ example: 'Calle 123 #45-67, Bogotá', nullable: true })
  donante_direccion?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:00Z', nullable: true })
  lote_caduca?: Date;

  @ApiPropertyOptional({ type: LotePublicDto, nullable: true })
  lote?: LotePublicDto;
}
