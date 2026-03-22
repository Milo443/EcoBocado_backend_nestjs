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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const impacto_service_1 = require("./impacto.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ImpactoController = class ImpactoController {
    impactoService;
    constructor(impactoService) {
        this.impactoService = impactoService;
    }
    impactoGlobal() {
        return this.impactoService.getGlobalImpact();
    }
    dashboardDonante(user) {
        return this.impactoService.getDonorDashboard(user.id);
    }
};
exports.ImpactoController = ImpactoController;
__decorate([
    (0, common_1.Get)('global'),
    (0, swagger_1.ApiOperation)({
        summary: 'Impacto Histórico Global',
        description: 'Retorna las métricas acumuladas de impacto social y ambiental de toda la plataforma.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Métricas globales de impacto',
        schema: {
            example: {
                total_rescatado_kg: 1250.5,
                personas_ayudadas: 340,
                aliados_red: 85,
                co2_mitigado_kg: 3126.25,
                impacto_por_categoria: { PANADERIA: 500.2, FRUTAS: 300.0, LACTEOS: 200.3, VEGETALES: 150.0, OTROS: 100.0 },
                impacto_mensual: [
                    { label: 'Ene', valor: 180.5 },
                    { label: 'Feb', valor: 220.0 },
                ],
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImpactoController.prototype, "impactoGlobal", null);
__decorate([
    (0, common_1.Get)('dashboard-donante'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Métricas de Donante',
        description: 'Retorna las estadísticas personalizadas para el panel principal del donador.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dashboard personal del donador',
        schema: {
            example: {
                peso_rescatado_kg: 45.5,
                lotes_activos: 3,
                entregas_hoy: 1,
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImpactoController.prototype, "dashboardDonante", null);
exports.ImpactoController = ImpactoController = __decorate([
    (0, swagger_1.ApiTags)('Impacto'),
    (0, common_1.Controller)('api/v1/impacto'),
    __metadata("design:paramtypes", [impacto_service_1.ImpactoService])
], ImpactoController);
//# sourceMappingURL=impacto.controller.js.map