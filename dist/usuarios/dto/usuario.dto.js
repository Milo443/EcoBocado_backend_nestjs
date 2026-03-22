"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAuditPublicDto = exports.StatusResponseDto = exports.AuthResponseDto = exports.UsuarioPublicDto = exports.UsuarioUpdateDto = exports.UsuarioCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const usuario_entity_1 = require("../entities/usuario.entity");
class UsuarioCreateDto {
    nombre;
    email;
    password;
    rol;
    direccion;
    telefono;
    avatar_url;
}
exports.UsuarioCreateDto = UsuarioCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre completo del usuario', example: 'María García' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correo electrónico único', example: 'maria@email.com', format: 'email' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contraseña del usuario', example: 'MiPassword123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rol del usuario en la plataforma',
        enum: usuario_entity_1.RolUsuario,
        example: usuario_entity_1.RolUsuario.DONOR,
    }),
    (0, class_validator_1.IsEnum)(usuario_entity_1.RolUsuario),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "rol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dirección física del usuario', example: 'Calle 123 #45-67, Bogotá' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de teléfono de contacto', example: '+57 300 1234567' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL del avatar del usuario', example: 'https://example.com/avatar.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioCreateDto.prototype, "avatar_url", void 0);
class UsuarioUpdateDto {
    nombre;
    direccion;
    telefono;
}
exports.UsuarioUpdateDto = UsuarioUpdateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nombre completo actualizado', example: 'María García López' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioUpdateDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nueva dirección', example: 'Carrera 10 #20-30, Medellín' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioUpdateDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nuevo número de teléfono', example: '+57 310 9876543' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsuarioUpdateDto.prototype, "telefono", void 0);
class UsuarioPublicDto {
    id;
    nombre;
    email;
    rol;
    direccion;
    telefono;
    avatar_url;
}
exports.UsuarioPublicDto = UsuarioPublicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María García' }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria@email.com', format: 'email' }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: usuario_entity_1.RolUsuario, example: usuario_entity_1.RolUsuario.DONOR }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "rol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Calle 123 #45-67, Bogotá' }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+57 300 1234567' }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: null }),
    __metadata("design:type", String)
], UsuarioPublicDto.prototype, "avatar_url", void 0);
class AuthResponseDto {
    exito;
    access_token;
    token_type;
    usuario;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AuthResponseDto.prototype, "exito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bearer' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "token_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UsuarioPublicDto }),
    __metadata("design:type", UsuarioPublicDto)
], AuthResponseDto.prototype, "usuario", void 0);
class StatusResponseDto {
    exito;
    mensaje;
}
exports.StatusResponseDto = StatusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], StatusResponseDto.prototype, "exito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Código enviado a su correo' }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "mensaje", void 0);
class SessionAuditPublicDto {
    id;
    usuario_id;
    email;
    ip_address;
    user_agent;
    fecha_inicio;
}
exports.SessionAuditPublicDto = SessionAuditPublicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    __metadata("design:type", String)
], SessionAuditPublicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    __metadata("design:type", String)
], SessionAuditPublicDto.prototype, "usuario_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'usuario@ejemplo.com' }),
    __metadata("design:type", String)
], SessionAuditPublicDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '192.168.1.1', nullable: true }),
    __metadata("design:type", String)
], SessionAuditPublicDto.prototype, "ip_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mozilla/5.0...', nullable: true }),
    __metadata("design:type", String)
], SessionAuditPublicDto.prototype, "user_agent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z' }),
    __metadata("design:type", Date)
], SessionAuditPublicDto.prototype, "fecha_inicio", void 0);
//# sourceMappingURL=usuario.dto.js.map