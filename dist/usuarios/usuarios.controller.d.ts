import { UsuariosService } from './usuarios.service';
import { LoginRequestDto, LoginVerifyDto } from './dto/login.dto';
import { UsuarioCreateDto, UsuarioUpdateDto } from './dto/usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    requestOtp(dto: LoginRequestDto): Promise<{
        exito: boolean;
        mensaje: string;
    }>;
    verifyOtp(dto: LoginVerifyDto, req: any): Promise<{
        exito: boolean;
        access_token: string;
        token_type: string;
        usuario: {
            id: string;
            nombre: string;
            email: string;
            rol: import("./entities/usuario.entity").RolUsuario;
            direccion: string;
            telefono: string;
            avatar_url: string | null;
        };
    }>;
    register(dto: UsuarioCreateDto): Promise<{
        exito: boolean;
        access_token: string;
        token_type: string;
        usuario: {
            id: string;
            nombre: string;
            email: string;
            rol: import("./entities/usuario.entity").RolUsuario;
            direccion: string;
            telefono: string;
            avatar_url: string | null;
        };
    }>;
    getPerfil(user: any): Promise<{
        id: string;
        nombre: string;
        email: string;
        rol: import("./entities/usuario.entity").RolUsuario;
        direccion: string;
        telefono: string;
        avatar_url: string | null;
    }>;
    updatePerfil(user: any, dto: UsuarioUpdateDto): Promise<{
        id: string;
        nombre: string;
        email: string;
        rol: import("./entities/usuario.entity").RolUsuario;
        direccion: string;
        telefono: string;
        avatar_url: string | null;
    }>;
    listSesiones(): Promise<{
        id: any;
        usuario_id: any;
        email: any;
        ip_address: any;
        user_agent: any;
        fecha_inicio: any;
    }[]>;
}
