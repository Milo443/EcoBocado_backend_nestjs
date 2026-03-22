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
exports.LotePublicDto = exports.LoteUpdateDto = exports.LoteCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const lote_entity_1 = require("../entities/lote.entity");
class LoteCreateDto {
    titulo;
    descripcion;
    cantidad;
    peso_kg;
    categoria;
    fecha_caducidad;
    imagen_url;
    latitud;
    longitud;
}
exports.LoteCreateDto = LoteCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Título del lote de alimentos', example: 'Pan artesanal del día' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteCreateDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción detallada del lote', example: '10 panes integrales horneados hoy' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteCreateDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cantidad disponible (texto libre)', example: '10 unidades' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteCreateDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso total en kilogramos', example: 2.5 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoteCreateDto.prototype, "peso_kg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Categoría del alimento',
        enum: lote_entity_1.CategoriaAlimento,
        example: lote_entity_1.CategoriaAlimento.PANADERIA,
    }),
    (0, class_validator_1.IsEnum)(lote_entity_1.CategoriaAlimento),
    __metadata("design:type", String)
], LoteCreateDto.prototype, "categoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha y hora de caducidad del lote (ISO 8601)',
        example: '2024-12-31T23:59:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LoteCreateDto.prototype, "fecha_caducidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL de imagen del lote (subida con upload-image)', example: 'https://cdn.vooltlab.com/ecobocado-images/abc.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteCreateDto.prototype, "imagen_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud de la ubicación del donador', example: 4.7110 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoteCreateDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud de la ubicación del donador', example: -74.0721 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoteCreateDto.prototype, "longitud", void 0);
class LoteUpdateDto {
    titulo;
    descripcion;
    cantidad;
    peso_kg;
    categoria;
    fecha_caducidad;
    imagen_url;
    latitud;
    longitud;
}
exports.LoteUpdateDto = LoteUpdateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pan integral actualizado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteUpdateDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5 unidades disponibles' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteUpdateDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5 unidades' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteUpdateDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1.2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoteUpdateDto.prototype, "peso_kg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: lote_entity_1.CategoriaAlimento, example: lote_entity_1.CategoriaAlimento.OTROS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(lote_entity_1.CategoriaAlimento),
    __metadata("design:type", String)
], LoteUpdateDto.prototype, "categoria", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-01-15T12:00:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], LoteUpdateDto.prototype, "fecha_caducidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://cdn.vooltlab.com/ecobocado-images/new.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoteUpdateDto.prototype, "imagen_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4.6097 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoteUpdateDto.prototype, "latitud", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: -74.0817 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoteUpdateDto.prototype, "longitud", void 0);
class LotePublicDto {
    id;
    donante_id;
    titulo;
    descripcion;
    cantidad;
    peso_kg;
    categoria;
    estado;
    fecha_caducidad;
    fecha_publicacion;
    imagen_url;
    reserva_id;
    codigo_qr_token;
}
exports.LotePublicDto = LotePublicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "donante_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pan artesanal del día' }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10 panes integrales horneados hoy' }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10 unidades' }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5 }),
    __metadata("design:type", Number)
], LotePublicDto.prototype, "peso_kg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: lote_entity_1.CategoriaAlimento, example: lote_entity_1.CategoriaAlimento.PANADERIA }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "categoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: lote_entity_1.EstadoLote, example: lote_entity_1.EstadoLote.ACTIVO }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-31T23:59:00Z' }),
    __metadata("design:type", Date)
], LotePublicDto.prototype, "fecha_caducidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T08:00:00Z' }),
    __metadata("design:type", Date)
], LotePublicDto.prototype, "fecha_publicacion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://cdn.vooltlab.com/ecobocado-images/abc.jpg', nullable: true }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "imagen_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: null, nullable: true }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "reserva_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: null, nullable: true }),
    __metadata("design:type", String)
], LotePublicDto.prototype, "codigo_qr_token", void 0);
//# sourceMappingURL=lote.dto.js.map