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
exports.LoteEntity = exports.CategoriaAlimento = exports.EstadoLote = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var EstadoLote;
(function (EstadoLote) {
    EstadoLote["ACTIVO"] = "ACTIVO";
    EstadoLote["RESERVADO"] = "RESERVADO";
    EstadoLote["COMPLETADO"] = "COMPLETADO";
    EstadoLote["CANCELADO"] = "CANCELADO";
})(EstadoLote || (exports.EstadoLote = EstadoLote = {}));
var CategoriaAlimento;
(function (CategoriaAlimento) {
    CategoriaAlimento["PANADERIA"] = "PANADERIA";
    CategoriaAlimento["FRUTAS"] = "FRUTAS";
    CategoriaAlimento["LACTEOS"] = "LACTEOS";
    CategoriaAlimento["VEGETALES"] = "VEGETALES";
    CategoriaAlimento["OTROS"] = "OTROS";
})(CategoriaAlimento || (exports.CategoriaAlimento = CategoriaAlimento = {}));
let LoteEntity = class LoteEntity {
    id;
    donante_id;
    titulo;
    descripcion;
    cantidad;
    peso_kg;
    categoria;
    estado;
    imagen_url;
    latitud;
    longitud;
    fecha_publicacion;
    fecha_caducidad;
    esta_borrado;
    donante;
};
exports.LoteEntity = LoteEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LoteEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'donante_id' }),
    __metadata("design:type", String)
], LoteEntity.prototype, "donante_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], LoteEntity.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], LoteEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], LoteEntity.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'peso_kg' }),
    __metadata("design:type", Number)
], LoteEntity.prototype, "peso_kg", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CategoriaAlimento }),
    __metadata("design:type", String)
], LoteEntity.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoLote, default: EstadoLote.ACTIVO }),
    __metadata("design:type", String)
], LoteEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, name: 'imagen_url' }),
    __metadata("design:type", String)
], LoteEntity.prototype, "imagen_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_publicacion' }),
    __metadata("design:type", Date)
], LoteEntity.prototype, "fecha_publicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'fecha_caducidad' }),
    __metadata("design:type", Date)
], LoteEntity.prototype, "fecha_caducidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, name: 'esta_borrado' }),
    __metadata("design:type", Boolean)
], LoteEntity.prototype, "esta_borrado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity),
    (0, typeorm_1.JoinColumn)({ name: 'donante_id' }),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], LoteEntity.prototype, "donante", void 0);
exports.LoteEntity = LoteEntity = __decorate([
    (0, typeorm_1.Entity)('lotes_alimentos')
], LoteEntity);
//# sourceMappingURL=lote.entity.js.map