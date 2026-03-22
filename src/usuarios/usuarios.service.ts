import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuarioEntity } from './entities/usuario.entity';
import { OtpEntity } from './entities/otp.entity';
import { SessionAudit, SessionAuditDocument } from './schemas/session-audit.schema';
import { EmailService } from '../email/email.service';
import { LoginRequestDto, LoginVerifyDto } from './dto/login.dto';
import { UsuarioCreateDto, UsuarioUpdateDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,

    @InjectRepository(OtpEntity)
    private readonly otpRepo: Repository<OtpEntity>,

    @InjectModel(SessionAudit.name)
    private readonly sessionAuditModel: Model<SessionAuditDocument>,

    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  // ─── Helper: build public user object ────────────────────────────────────────
  private toPublic(u: UsuarioEntity) {
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

  private createToken(usuario: UsuarioEntity): string {
    return this.jwtService.sign({
      sub: usuario.email,
      id: usuario.id,
      role: usuario.rol,
    });
  }

  // ─── Register ────────────────────────────────────────────────────────────────
  async register(dto: UsuarioCreateDto) {
    const existing = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('El correo ya está registrado');

    const password_hash = await bcrypt.hash(dto.password, 10);
    const usuario = new UsuarioEntity();
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

  // ─── OTP Request ─────────────────────────────────────────────────────────────
  async loginRequest(dto: LoginRequestDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (!usuario) throw new NotFoundException('Usuario no registrado');

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = this.otpRepo.create({ email: dto.email, otp_code, is_used: false });
    await this.otpRepo.save(otp);

    const enviado = await this.emailService.sendOtpEmail(dto.email, otp_code);
    if (!enviado) throw new InternalServerErrorException('Error enviando el código de verificación');

    return { exito: true, mensaje: 'Código enviado a su correo' };
  }

  // ─── OTP Verify ──────────────────────────────────────────────────────────────
  async loginVerify(dto: LoginVerifyDto, ip?: string, userAgent?: string) {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const otp = await this.otpRepo.findOne({
      where: {
        email: dto.email,
        otp_code: dto.otp_code,
        is_used: false,
        created_at: MoreThan(tenMinutesAgo),
      },
    });

    if (!otp) throw new BadRequestException('Código inválido o expirado');

    otp.is_used = true;
    await this.otpRepo.save(otp);

    const usuario = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Auditoría en MongoDB
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

  // ─── Get Perfil ──────────────────────────────────────────────────────────────
  async getPerfil(email: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { email } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.toPublic(usuario);
  }

  // ─── Update Perfil ───────────────────────────────────────────────────────────
  async updatePerfil(email: string, dto: UsuarioUpdateDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { email } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (dto.nombre !== undefined) usuario.nombre = dto.nombre;
    if (dto.direccion !== undefined) usuario.direccion = dto.direccion;
    if (dto.telefono !== undefined) usuario.telefono = dto.telefono;

    const saved = await this.usuarioRepo.save(usuario);
    return this.toPublic(saved);
  }

  // ─── List Sesiones ───────────────────────────────────────────────────────────
  async listSesiones() {
    const sesiones = await this.sessionAuditModel.find().lean();
    return sesiones.map((s: any) => ({
      id: s._id.toString(),
      usuario_id: s.usuario_id,
      email: s.email,
      ip_address: s.ip_address,
      user_agent: s.user_agent,
      fecha_inicio: s.fecha_inicio,
    }));
  }
}
