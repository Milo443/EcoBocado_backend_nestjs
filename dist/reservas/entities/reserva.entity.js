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
exports.ReservaEntity = exports.EstadoReserva = void 0;
const typeorm_1 = require("typeorm");
const lote_entity_1 = require("../../lotes/entities/lote.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var EstadoReserva;
(function (EstadoReserva) {
    EstadoReserva["PENDIENTE"] = "PENDIENTE";
    EstadoReserva["RECOGIDO"] = "RECOGIDO";
    EstadoReserva["COMPLETADO"] = "COMPLETADO";
    EstadoReserva["VENCIDO"] = "VENCIDO";
})(EstadoReserva || (exports.EstadoReserva = EstadoReserva = {}));
let ReservaEntity = class ReservaEntity {
    id;
    lote_id;
    receptor_id;
    estado;
    codigo_qr_token;
    fecha_reserva;
    fecha_limite_recogida;
    fecha_completada;
    lote;
    receptor;
};
exports.ReservaEntity = ReservaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReservaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lote_id' }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "lote_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receptor_id' }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "receptor_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoReserva, default: EstadoReserva.PENDIENTE }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true, name: 'codigo_qr_token' }),
    __metadata("design:type", String)
], ReservaEntity.prototype, "codigo_qr_token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_reserva' }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "fecha_reserva", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'fecha_limite_recogida' }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "fecha_limite_recogida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'fecha_completada' }),
    __metadata("design:type", Date)
], ReservaEntity.prototype, "fecha_completada", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lote_entity_1.LoteEntity),
    (0, typeorm_1.JoinColumn)({ name: 'lote_id' }),
    __metadata("design:type", lote_entity_1.LoteEntity)
], ReservaEntity.prototype, "lote", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity),
    (0, typeorm_1.JoinColumn)({ name: 'receptor_id' }),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], ReservaEntity.prototype, "receptor", void 0);
exports.ReservaEntity = ReservaEntity = __decorate([
    (0, typeorm_1.Entity)('reservas')
], ReservaEntity);
//# sourceMappingURL=reserva.entity.js.map