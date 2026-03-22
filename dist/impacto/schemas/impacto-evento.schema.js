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
exports.ImpactoEventoSchema = exports.ImpactoEvento = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ImpactoEvento = class ImpactoEvento {
    tipo;
    donante_id;
    receptor_id;
    lote_id;
    peso_kg;
    co2_kg;
    fecha;
};
exports.ImpactoEvento = ImpactoEvento;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ImpactoEvento.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ImpactoEvento.prototype, "donante_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ImpactoEvento.prototype, "receptor_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ImpactoEvento.prototype, "lote_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ImpactoEvento.prototype, "peso_kg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ImpactoEvento.prototype, "co2_kg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date() }),
    __metadata("design:type", Date)
], ImpactoEvento.prototype, "fecha", void 0);
exports.ImpactoEvento = ImpactoEvento = __decorate([
    (0, mongoose_1.Schema)({ collection: 'impacto_eventos' })
], ImpactoEvento);
exports.ImpactoEventoSchema = mongoose_1.SchemaFactory.createForClass(ImpactoEvento);
//# sourceMappingURL=impacto-evento.schema.js.map