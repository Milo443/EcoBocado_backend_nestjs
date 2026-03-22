import { ReservasService } from './reservas.service';
import { ReservaCreateDto } from './dto/reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    reservarLote(user: any, dto: ReservaCreateDto): Promise<{
        id: string;
        lote_id: string;
        receptor_id: string;
        estado: import("./entities/reserva.entity").EstadoReserva;
        codigo_qr_token: string;
        fecha_reserva: Date;
        fecha_limite_recogida: Date;
        fecha_completada: Date;
        lote_titulo: any;
        donante_nombre: any;
        donante_direccion: any;
        lote_caduca: any;
        lote: {
            id: any;
            donante_id: any;
            titulo: any;
            descripcion: any;
            cantidad: any;
            peso_kg: number;
            categoria: any;
            estado: any;
            imagen_url: any;
            fecha_caducidad: any;
            fecha_publicacion: any;
            reserva_id: null;
            codigo_qr_token: null;
        } | null;
    }>;
    reservasActivas(user: any): Promise<{
        id: string;
        lote_id: string;
        receptor_id: string;
        estado: import("./entities/reserva.entity").EstadoReserva;
        codigo_qr_token: string;
        fecha_reserva: Date;
        fecha_limite_recogida: Date;
        fecha_completada: Date;
        lote_titulo: any;
        donante_nombre: any;
        donante_direccion: any;
        lote_caduca: any;
        lote: {
            id: any;
            donante_id: any;
            titulo: any;
            descripcion: any;
            cantidad: any;
            peso_kg: number;
            categoria: any;
            estado: any;
            imagen_url: any;
            fecha_caducidad: any;
            fecha_publicacion: any;
            reserva_id: null;
            codigo_qr_token: null;
        } | null;
    }[]>;
    historialReservas(user: any): Promise<{
        id: string;
        lote_id: string;
        receptor_id: string;
        estado: import("./entities/reserva.entity").EstadoReserva;
        codigo_qr_token: string;
        fecha_reserva: Date;
        fecha_limite_recogida: Date;
        fecha_completada: Date;
        lote_titulo: any;
        donante_nombre: any;
        donante_direccion: any;
        lote_caduca: any;
        lote: {
            id: any;
            donante_id: any;
            titulo: any;
            descripcion: any;
            cantidad: any;
            peso_kg: number;
            categoria: any;
            estado: any;
            imagen_url: any;
            fecha_caducidad: any;
            fecha_publicacion: any;
            reserva_id: null;
            codigo_qr_token: null;
        } | null;
    }[]>;
    completarReserva(reservaId: string): Promise<{
        mensaje: string;
    }>;
    cancelarReserva(reservaId: string, user: any): Promise<{
        mensaje: string;
    }>;
}
