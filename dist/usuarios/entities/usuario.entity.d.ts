export declare enum RolUsuario {
    DONOR = "DONOR",
    RECEPTOR = "RECEPTOR"
}
export declare class UsuarioEntity {
    id: string;
    nombre: string;
    email: string;
    password_hash: string;
    rol: RolUsuario;
    avatar_url?: string;
    direccion: string;
    telefono: string;
    fecha_registro: Date;
}
