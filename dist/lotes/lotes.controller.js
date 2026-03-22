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
exports.LotesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const lotes_service_1 = require("./lotes.service");
const lote_dto_1 = require("./dto/lote.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const storage_service_1 = require("../storage/storage.service");
let LotesController = class LotesController {
    lotesService;
    storageService;
    constructor(lotesService, storageService) {
        this.lotesService = lotesService;
        this.storageService = storageService;
    }
    listarActivos() {
        return this.lotesService.listarActivos();
    }
    async uploadImage(file) {
        if (!file)
            throw new common_1.BadRequestException('No se proporcionó ningún archivo');
        const url = await this.storageService.uploadFile(file.buffer, file.originalname, file.mimetype);
        return { url };
    }
    publicarLote(user, dto) {
        return this.lotesService.publicarLote(user.id, dto);
    }
    misLotes(user) {
        return this.lotesService.misLotes(user.id);
    }
    eliminarLote(loteId, user) {
        return this.lotesService.eliminarLote(loteId, user.id);
    }
    actualizarLote(loteId, user, dto) {
        return this.lotesService.actualizarLote(loteId, user.id, dto);
    }
};
exports.LotesController = LotesController;
__decorate([
    (0, common_1.Get)('activos'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar lotes activos',
        description: 'Retorna todos los lotes de alimentos que están actualmente disponibles para reserva.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de lotes activos', type: [lote_dto_1.LotePublicDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LotesController.prototype, "listarActivos", null);
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Subir imagen de lote',
        description: 'Sube una imagen al almacenamiento S3 (MinIO) y retorna la URL pública.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file'],
            properties: {
                file: { type: 'string', format: 'binary', description: 'Archivo de imagen del lote' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'URL de la imagen subida', schema: { example: { url: 'https://cdn.vooltlab.com/ecobocado-images/abc.jpg' } } }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LotesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Publicar nuevo lote',
        description: 'Permite a un donador publicar un nuevo lote de alimentos. Requiere autenticación.',
    }),
    (0, swagger_1.ApiBody)({ type: lote_dto_1.LoteCreateDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lote publicado exitosamente', type: lote_dto_1.LotePublicDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lote_dto_1.LoteCreateDto]),
    __metadata("design:returntype", void 0)
], LotesController.prototype, "publicarLote", null);
__decorate([
    (0, common_1.Get)('mis-lotes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Mis publicaciones',
        description: 'Retorna la lista de lotes publicados por el donador autenticado.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Mis lotes', type: [lote_dto_1.LotePublicDto] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LotesController.prototype, "misLotes", null);
__decorate([
    (0, common_1.Delete)(':lote_id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar lote (Lógico)',
        description: 'Marca un lote como borrado. Solo el donador dueño puede hacerlo.',
    }),
    (0, swagger_1.ApiParam)({ name: 'lote_id', description: 'UUID del lote a eliminar', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lote eliminado' }),
    __param(0, (0, common_1.Param)('lote_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LotesController.prototype, "eliminarLote", null);
__decorate([
    (0, common_1.Put)(':lote_id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar lote',
        description: 'Permite a un donador actualizar los datos de su lote. Solo el dueño puede hacerlo.',
    }),
    (0, swagger_1.ApiParam)({ name: 'lote_id', description: 'UUID del lote a actualizar', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: lote_dto_1.LoteUpdateDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lote actualizado', type: lote_dto_1.LotePublicDto }),
    __param(0, (0, common_1.Param)('lote_id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, lote_dto_1.LoteUpdateDto]),
    __metadata("design:returntype", void 0)
], LotesController.prototype, "actualizarLote", null);
exports.LotesController = LotesController = __decorate([
    (0, swagger_1.ApiTags)('Lotes'),
    (0, common_1.Controller)('api/v1/lotes'),
    __metadata("design:paramtypes", [lotes_service_1.LotesService,
        storage_service_1.StorageService])
], LotesController);
//# sourceMappingURL=lotes.controller.js.map