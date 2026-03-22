"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const usuario_entity_1 = require("./entities/usuario.entity");
const otp_entity_1 = require("./entities/otp.entity");
const session_audit_schema_1 = require("./schemas/session-audit.schema");
const email_service_1 = require("../email/email.service");
let UsuariosService = class UsuariosService {
    usuarioRepo;
    otpRepo;
    sessionAuditModel;
    emailService;
    jwtService;
    constructor(usuarioRepo, otpRepo, sessionAuditModel, emailService, jwtService) {
        this.usuarioRepo = usuarioRepo;
        this.otpRepo = otpRepo;
        this.sessionAuditModel = sessionAuditModel;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    toPublic(u) {
        return {
            id: u.id,
            nombre: u.nombre,
            email: u.email,
            rol: u.rol,
            direccion: u.direccion,
            telefono: u.telefono,
            avatar_url: u.avatar_url || null,
        };
    }
    createToken(usuario) {
        return this.jwtService.sign({
            sub: usuario.email,
            id: usuario.id,
            role: usuario.rol,
        });
    }
    async register(dto) {
        const existing = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (existing)
            throw new common_1.BadRequestException('El correo ya está registrado');
        const password_hash = await bcrypt.hash(dto.password, 10);
        const usuario = new usuario_entity_1.UsuarioEntity();
        usuario.nombre = dto.nombre;
        usuario.email = dto.email;
        usuario.password_hash = password_hash;
        usuario.rol = dto.rol;
        usuario.direccion = dto.direccion;
        usuario.telefono = dto.telefono;
        usuario.avatar_url = dto.avatar_url ?? undefined;
        const saved = await this.usuarioRepo.save(usuario);
        const token = this.createToken(saved);
        return {
            exito: true,
            access_token: token,
            token_type: 'bearer',
            usuario: this.toPublic(saved),
        };
    }
    async loginRequest(dto) {
        const usuario = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no registrado');
        const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
        const otp = this.otpRepo.create({ email: dto.email, otp_code, is_used: false });
        await this.otpRepo.save(otp);
        const enviado = await this.emailService.sendOtpEmail(dto.email, otp_code);
        if (!enviado)
            throw new common_1.InternalServerErrorException('Error enviando el código de verificación');
        return { exito: true, mensaje: 'Código enviado a su correo' };
    }
    async loginVerify(dto, ip, userAgent) {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const otp = await this.otpRepo.findOne({
            where: {
                email: dto.email,
                otp_code: dto.otp_code,
                is_used: false,
                created_at: (0, typeorm_2.MoreThan)(tenMinutesAgo),
            },
        });
        if (!otp)
            throw new common_1.BadRequestException('Código inválido o expirado');
        otp.is_used = true;
        await this.otpRepo.save(otp);
        const usuario = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        await this.sessionAuditModel.create({
            usuario_id: usuario.id,
            email: usuario.email,
            ip_address: ip ?? undefined,
            user_agent: userAgent ?? undefined,
            fecha_inicio: new Date(),
        });
        const token = this.createToken(usuario);
        return {
            exito: true,
            access_token: token,
            token_type: 'bearer',
            usuario: this.toPublic(usuario),
        };
    }
    async getPerfil(email) {
        const usuario = await this.usuarioRepo.findOne({ where: { email } });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return this.toPublic(usuario);
    }
    async updatePerfil(email, dto) {
        const usuario = await this.usuarioRepo.findOne({ where: { email } });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (dto.nombre !== undefined)
            usuario.nombre = dto.nombre;
        if (dto.direccion !== undefined)
            usuario.direccion = dto.direccion;
        if (dto.telefono !== undefined)
            usuario.telefono = dto.telefono;
        const saved = await this.usuarioRepo.save(usuario);
        return this.toPublic(saved);
    }
    async listSesiones() {
        const sesiones = await this.sessionAuditModel.find().lean();
        return sesiones.map((s) => ({
            id: s._id.toString(),
            usuario_id: s.usuario_id,
            email: s.email,
            ip_address: s.ip_address,
            user_agent: s.user_agent,
            fecha_inicio: s.fecha_inicio,
        }));
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(otp_entity_1.OtpEntity)),
    __param(2, (0, mongoose_1.InjectModel)(session_audit_schema_1.SessionAudit.name)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mongoose_2.Model,
        email_service_1.EmailService,
        jwt_1.JwtService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map