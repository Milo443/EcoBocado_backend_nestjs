import { RolUsuario } from '../entities/usuario.entity';
export declare class UsuarioCreateDto {
    nombre: string;
    email: string;
    password: string;
    rol: RolUsuario;
    direccion: string;
    telefono: string;
    avatar_url?: string;
}
export declare class UsuarioUpdateDto {
    nombre?: string;
    direccion?: string;
    telefono?: string;
}
export declare class UsuarioPublicDto {
    id: string;
    nombre: string;
    email: string;
    rol: RolUsuario;
    direccion: string;
    telefono: string;
    avatar_url?: string;
}
export declare class AuthResponseDto {
    exito: boolean;
    access_token: string;
    token_type: string;
    usuario: UsuarioPublicDto;
}
export declare class StatusResponseDto {
    exito: boolean;
    mensaje: string;
}
export declare class SessionAuditPublicDto {
    id: string;
    usuario_id: string;
    email: string;
    ip_address: string;
    user_agent: string;
    fecha_inicio: Date;
}
