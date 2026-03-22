"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const impacto_controller_1 = require("./impacto.controller");
const impacto_service_1 = require("./impacto.service");
const impacto_evento_schema_1 = require("./schemas/impacto-evento.schema");
const auth_module_1 = require("../auth/auth.module");
let ImpactoModule = class ImpactoModule {
};
exports.ImpactoModule = ImpactoModule;
exports.ImpactoModule = ImpactoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: impacto_evento_schema_1.ImpactoEvento.name, schema: impacto_evento_schema_1.ImpactoEventoSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [impacto_controller_1.ImpactoController],
        providers: [impacto_service_1.ImpactoService],
    })
], ImpactoModule);
//# sourceMappingURL=impacto.module.js.map