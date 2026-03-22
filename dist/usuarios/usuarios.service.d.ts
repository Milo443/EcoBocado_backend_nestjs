import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from './entities/usuario.entity';
import { OtpEntity } from './entities/otp.entity';
import { SessionAuditDocument } from './schemas/session-audit.schema';
import { EmailService } from '../email/email.service';
import { LoginRequestDto, LoginVerifyDto } from './dto/login.dto';
import { UsuarioCreateDto, UsuarioUpdateDto } from './dto/usuario.dto';
export declare class UsuariosService {
    private readonly usuarioRepo;
    private readonly otpRepo;
    private readonly sessionAuditModel;
    private readonly emailService;
    private readonly jwtService;
    constructor(usuarioRepo: Repository<UsuarioEntity>, otpRepo: Repository<OtpEntity>, sessionAuditModel: Model<SessionAuditDocument>, emailService: EmailService, jwtService: JwtService);
    private toPublic;
    private createToken;
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
    loginRequest(dto: LoginRequestDto): Promise<{
        exito: boolean;
        mensaje: string;
    }>;
    loginVerify(dto: LoginVerifyDto, ip?: string, userAgent?: string): Promise<{
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
    getPerfil(email: string): Promise<{
        id: string;
        nombre: string;
        email: string;
        rol: import("./entities/usuario.entity").RolUsuario;
        direccion: string;
        telefono: string;
        avatar_url: string | null;
    }>;
    updatePerfil(email: string, dto: UsuarioUpdateDto): Promise<{
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
