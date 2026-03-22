import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';
export declare enum EstadoLote {
    ACTIVO = "ACTIVO",
    RESERVADO = "RESERVADO",
    COMPLETADO = "COMPLETADO",
    CANCELADO = "CANCELADO"
}
export declare enum CategoriaAlimento {
    PANADERIA = "PANADERIA",
    FRUTAS = "FRUTAS",
    LACTEOS = "LACTEOS",
    VEGETALES = "VEGETALES",
    OTROS = "OTROS"
}
export declare class LoteEntity {
    id: string;
    donante_id: string;
    titulo: string;
    descripcion: string;
    cantidad: string;
    peso_kg: number;
    categoria: CategoriaAlimento;
    estado: EstadoLote;
    imagen_url?: string;
    latitud?: number;
    longitud?: number;
    fecha_publicacion: Date;
    fecha_caducidad: Date;
    esta_borrado: boolean;
    donante: UsuarioEntity;
}
