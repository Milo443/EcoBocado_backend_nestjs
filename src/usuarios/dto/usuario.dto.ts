import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RolUsuario } from '../entities/usuario.entity';

export class UsuarioCreateDto {
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'María García' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico único', example: 'maria@email.com', format: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'MiPassword123' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Rol del usuario en la plataforma',
    enum: RolUsuario,
    example: RolUsuario.DONOR,
  })
  @IsEnum(RolUsuario)
  rol: RolUsuario;

  @ApiProperty({ description: 'Dirección física del usuario', example: 'Calle 123 #45-67, Bogotá' })
  @IsString()
  direccion: string;

  @ApiProperty({ description: 'Número de teléfono de contacto', example: '+57 300 1234567' })
  @IsString()
  telefono: string;

  @ApiPropertyOptional({ description: 'URL del avatar del usuario', example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar_url?: string;
}

export class UsuarioUpdateDto {
  @ApiPropertyOptional({ description: 'Nombre completo actualizado', example: 'María García López' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Nueva dirección', example: 'Carrera 10 #20-30, Medellín' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ description: 'Nuevo número de teléfono', example: '+57 310 9876543' })
  @IsOptional()
  @IsString()
  telefono?: string;
}

export class UsuarioPublicDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'María García' })
  nombre: string;

  @ApiProperty({ example: 'maria@email.com', format: 'email' })
  email: string;

  @ApiProperty({ enum: RolUsuario, example: RolUsuario.DONOR })
  rol: RolUsuario;

  @ApiProperty({ example: 'Calle 123 #45-67, Bogotá' })
  direccion: string;

  @ApiProperty({ example: '+57 300 1234567' })
  telefono: string;

  @ApiPropertyOptional({ example: null })
  avatar_url?: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: true })
  exito: boolean;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({ example: 'bearer' })
  token_type: string;

  @ApiProperty({ type: UsuarioPublicDto })
  usuario: UsuarioPublicDto;
}

export class StatusResponseDto {
  @ApiProperty({ example: true })
  exito: boolean;

  @ApiProperty({ example: 'Código enviado a su correo' })
  mensaje: string;
}

export class SessionAuditPublicDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  usuario_id: string;

  @ApiProperty({ example: 'usuario@ejemplo.com' })
  email: string;

  @ApiProperty({ example: '192.168.1.1', nullable: true })
  ip_address: string;

  @ApiProperty({ example: 'Mozilla/5.0...', nullable: true })
  user_agent: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  fecha_inicio: Date;
}
