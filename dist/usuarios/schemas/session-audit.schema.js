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
exports.SessionAuditSchema = exports.SessionAudit = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SessionAudit = class SessionAudit {
    usuario_id;
    email;
    ip_address;
    user_agent;
    fecha_inicio;
};
exports.SessionAudit = SessionAudit;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SessionAudit.prototype, "usuario_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SessionAudit.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ nullable: true }),
    __metadata("design:type", String)
], SessionAudit.prototype, "ip_address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ nullable: true }),
    __metadata("design:type", String)
], SessionAudit.prototype, "user_agent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date() }),
    __metadata("design:type", Date)
], SessionAudit.prototype, "fecha_inicio", void 0);
exports.SessionAudit = SessionAudit = __decorate([
    (0, mongoose_1.Schema)({ collection: 'sesiones_auditoria' })
], SessionAudit);
exports.SessionAuditSchema = mongoose_1.SchemaFactory.createForClass(SessionAudit);
//# sourceMappingURL=session-audit.schema.js.map