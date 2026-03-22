import { EstadoReserva } from '../entities/reserva.entity';
import { LotePublicDto } from '../../lotes/dto/lote.dto';
export declare class ReservaCreateDto {
    lote_id: string;
}
export declare class ReservaPublicDto {
    id: string;
    lote_id: string;
    receptor_id: string;
    estado: EstadoReserva;
    codigo_qr_token: string;
    fecha_reserva: Date;
    fecha_limite_recogida: Date;
    fecha_completada?: Date;
    lote_titulo?: string;
    donante_nombre?: string;
    donante_direccion?: string;
    lote_caduca?: Date;
    lote?: LotePublicDto;
}
