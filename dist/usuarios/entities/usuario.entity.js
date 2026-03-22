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
exports.UsuarioEntity = exports.RolUsuario = void 0;
const typeorm_1 = require("typeorm");
var RolUsuario;
(function (RolUsuario) {
    RolUsuario["DONOR"] = "DONOR";
    RolUsuario["RECEPTOR"] = "RECEPTOR";
})(RolUsuario || (exports.RolUsuario = RolUsuario = {}));
let UsuarioEntity = class UsuarioEntity {
    id;
    nombre;
    email;
    password_hash;
    rol;
    avatar_url;
    direccion;
    telefono;
    fecha_registro;
};
exports.UsuarioEntity = UsuarioEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: 'password_hash' }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RolUsuario }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true, name: 'avatar_url' }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "avatar_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_registro' }),
    __metadata("design:type", Date)
], UsuarioEntity.prototype, "fecha_registro", void 0);
exports.UsuarioEntity = UsuarioEntity = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], UsuarioEntity);
//# sourceMappingURL=usuario.entity.js.map