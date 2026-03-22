import { EstadoLote, CategoriaAlimento } from '../entities/lote.entity';
export declare class LoteCreateDto {
    titulo: string;
    descripcion: string;
    cantidad: string;
    peso_kg: number;
    categoria: CategoriaAlimento;
    fecha_caducidad: string;
    imagen_url?: string;
    latitud: number;
    longitud: number;
}
export declare class LoteUpdateDto {
    titulo?: string;
    descripcion?: string;
    cantidad?: string;
    peso_kg?: number;
    categoria?: CategoriaAlimento;
    fecha_caducidad?: string;
    imagen_url?: string;
    latitud?: number;
    longitud?: number;
}
export declare class LotePublicDto {
    id: string;
    donante_id: string;
    titulo: string;
    descripcion: string;
    cantidad: string;
    peso_kg: number;
    categoria: CategoriaAlimento;
    estado: EstadoLote;
    fecha_caducidad: Date;
    fecha_publicacion: Date;
    imagen_url?: string;
    reserva_id?: string;
    codigo_qr_token?: string;
}
