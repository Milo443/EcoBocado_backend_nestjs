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
exports.ReservasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reservas_service_1 = require("./reservas.service");
const reserva_dto_1 = require("./dto/reserva.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ReservasController = class ReservasController {
    reservasService;
    constructor(reservasService) {
        this.reservasService = reservasService;
    }
    reservarLote(user, dto) {
        return this.reservasService.reservarLote(user.id, dto);
    }
    reservasActivas(user) {
        return this.reservasService.reservasActivas(user.id);
    }
    historialReservas(user) {
        return this.reservasService.historialReservas(user.id);
    }
    completarReserva(reservaId) {
        return this.reservasService.completarReserva(reservaId);
    }
    cancelarReserva(reservaId, user) {
        return this.reservasService.cancelarReserva(reservaId, user.id);
    }
};
exports.ReservasController = ReservasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Reservar un lote',
        description: 'Crea una reserva para un lote de alimentos específico. Cambia el estado del lote a RESERVADO.',
    }),
    (0, swagger_1.ApiBody)({ type: reserva_dto_1.ReservaCreateDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Reserva creada exitosamente', type: reserva_dto_1.ReservaPublicDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'El lote no está disponible' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reserva_dto_1.ReservaCreateDto]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "reservarLote", null);
__decorate([
    (0, common_1.Get)('activas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Mis reservas activas',
        description: 'Retorna la lista de reservas en estado PENDIENTE realizadas por el receptor autenticado.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reservas activas', type: [reserva_dto_1.ReservaPublicDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "reservasActivas", null);
__decorate([
    (0, common_1.Get)('historial'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Historial de reservas',
        description: 'Retorna el historial de reservas completadas o vencidas.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial de reservas', type: [reserva_dto_1.ReservaPublicDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "historialReservas", null);
__decorate([
    (0, common_1.Post)(':reserva_id/completar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Completar recogida',
        description: 'Marca una reserva como completada y el lote como entregado. Solo puede hacerlo el donador o personal autorizado.',
    }),
    (0, swagger_1.ApiParam)({ name: 'reserva_id', description: 'UUID de la reserva a completar', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reserva completada' }),
    __param(0, (0, common_1.Param)('reserva_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "completarReserva", null);
__decorate([
    (0, common_1.Post)(':reserva_id/cancelar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancelar reserva',
        description: 'Libera el lote para que otros puedan reservarlo. Solo el receptor puede cancelar su reserva activa.',
    }),
    (0, swagger_1.ApiParam)({ name: 'reserva_id', description: 'UUID de la reserva a cancelar', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reserva cancelada' }),
    __param(0, (0, common_1.Param)('reserva_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "cancelarReserva", null);
exports.ReservasController = ReservasController = __decorate([
    (0, swagger_1.ApiTags)('Reservas'),
    (0, common_1.Controller)('api/v1/reservas'),
    __metadata("design:paramtypes", [reservas_service_1.ReservasService])
], ReservasController);
//# sourceMappingURL=reservas.controller.js.map