import { LoteEntity } from '../../lotes/entities/lote.entity';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';
export declare enum EstadoReserva {
    PENDIENTE = "PENDIENTE",
    RECOGIDO = "RECOGIDO",
    COMPLETADO = "COMPLETADO",
    VENCIDO = "VENCIDO"
}
export declare class ReservaEntity {
    id: string;
    lote_id: string;
    receptor_id: string;
    estado: EstadoReserva;
    codigo_qr_token: string;
    fecha_reserva: Date;
    fecha_limite_recogida: Date;
    fecha_completada: Date;
    lote: LoteEntity;
    receptor: UsuarioEntity;
}
