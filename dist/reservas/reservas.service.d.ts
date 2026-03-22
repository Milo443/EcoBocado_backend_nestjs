import { Repository, DataSource } from 'typeorm';
import { ReservaEntity, EstadoReserva } from './entities/reserva.entity';
import { LoteEntity } from '../lotes/entities/lote.entity';
import { ReservaCreateDto } from './dto/reserva.dto';
export declare class ReservasService {
    private readonly reservaRepo;
    private readonly loteRepo;
    private readonly dataSource;
    constructor(reservaRepo: Repository<ReservaEntity>, loteRepo: Repository<LoteEntity>, dataSource: DataSource);
    private toReservaPublic;
    reservarLote(receptorId: string, dto: ReservaCreateDto): Promise<{
        id: string;
        lote_id: string;
        receptor_id: string;
        estado: EstadoReserva;
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
    reservasActivas(receptorId: string): Promise<{
        id: string;
        lote_id: string;
        receptor_id: string;
        estado: EstadoReserva;
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
    historialReservas(receptorId: string): Promise<{
        id: string;
        lote_id: string;
        receptor_id: string;
        estado: EstadoReserva;
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
    cancelarReserva(reservaId: string, receptorId: string): Promise<{
        mensaje: string;
    }>;
}
