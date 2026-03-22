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
exports.ReservaPublicDto = exports.ReservaCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const reserva_entity_1 = require("../entities/reserva.entity");
const lote_dto_1 = require("../../lotes/dto/lote.dto");
class ReservaCreateDto {
    lote_id;
}
exports.ReservaCreateDto = ReservaCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID del lote que se desea reservar',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        format: 'uuid',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ReservaCreateDto.prototype, "lote_id", void 0);
class ReservaPublicDto {
    id;
    lote_id;
    receptor_id;
    estado;
    codigo_qr_token;
    fecha_reserva;
    fecha_limite_recogida;
    fecha_completada;
    lote_titulo;
    donante_nombre;
    donante_direccion;
    lote_caduca;
    lote;
}
exports.ReservaPublicDto = ReservaPublicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', format: 'uuid' }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', format: 'uuid' }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "lote_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'c3d4e5f6-a7b8-9012-cdef-123456789012', format: 'uuid' }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "receptor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: reserva_entity_1.EstadoReserva, example: reserva_entity_1.EstadoReserva.PENDIENTE }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'qr_abc123xyz456', description: 'Token único para el código QR de recogida' }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "codigo_qr_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z' }),
    __metadata("design:type", Date)
], ReservaPublicDto.prototype, "fecha_reserva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-16T10:30:00Z', description: 'Plazo máximo de 24h para recoger' }),
    __metadata("design:type", Date)
], ReservaPublicDto.prototype, "fecha_limite_recogida", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: null, nullable: true }),
    __metadata("design:type", Date)
], ReservaPublicDto.prototype, "fecha_completada", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pan artesanal del día', nullable: true }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "lote_titulo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'María García', nullable: true }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "donante_nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Calle 123 #45-67, Bogotá', nullable: true }),
    __metadata("design:type", String)
], ReservaPublicDto.prototype, "donante_direccion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-12-31T23:59:00Z', nullable: true }),
    __metadata("design:type", Date)
], ReservaPublicDto.prototype, "lote_caduca", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: lote_dto_1.LotePublicDto, nullable: true }),
    __metadata("design:type", lote_dto_1.LotePublicDto)
], ReservaPublicDto.prototype, "lote", void 0);
//# sourceMappingURL=reserva.dto.js.map