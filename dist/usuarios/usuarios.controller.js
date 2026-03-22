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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuarios_service_1 = require("./usuarios.service");
const login_dto_1 = require("./dto/login.dto");
const usuario_dto_1 = require("./dto/usuario.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let UsuariosController = class UsuariosController {
    usuariosService;
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    requestOtp(dto) {
        return this.usuariosService.loginRequest(dto);
    }
    verifyOtp(dto, req) {
        const ip = req.ip;
        const userAgent = req.headers?.['user-agent'];
        return this.usuariosService.loginVerify(dto, ip, userAgent);
    }
    register(dto) {
        return this.usuariosService.register(dto);
    }
    getPerfil(user) {
        return this.usuariosService.getPerfil(user.sub);
    }
    updatePerfil(user, dto) {
        return this.usuariosService.updatePerfil(user.sub, dto);
    }
    listSesiones() {
        return this.usuariosService.listSesiones();
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)('login-otp/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Solicitar código OTP',
        description: 'Genera un código de verificación de 6 dígitos y lo envía al correo del usuario vía EmailJS.',
    }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Código enviado', type: usuario_dto_1.StatusResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no registrado' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error enviando el correo' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginRequestDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('login-otp/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar OTP y obtener token',
        description: 'Valida el código OTP enviado al correo. Si es correcto, emite un JWT Bearer Token válido por 24 horas.',
    }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginVerifyDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Autenticación exitosa', type: usuario_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Código inválido o expirado' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginVerifyDto, Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar nuevo usuario',
        description: 'Crea una nueva cuenta de usuario (DONOR o RECEPTOR) y devuelve un token de acceso inmediato.',
    }),
    (0, swagger_1.ApiBody)({ type: usuario_dto_1.UsuarioCreateDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuario creado exitosamente', type: usuario_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'El correo ya está registrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.UsuarioCreateDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('perfil'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener perfil de usuario',
        description: 'Recupera la información del perfil del usuario autenticado a partir del token Bearer.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Perfil del usuario', type: usuario_dto_1.UsuarioPublicDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token inválido o expirado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "getPerfil", null);
__decorate([
    (0, common_1.Put)('perfil'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar perfil',
        description: 'Permite al usuario autenticado actualizar sus datos personales (nombre, dirección, teléfono).',
    }),
    (0, swagger_1.ApiBody)({ type: usuario_dto_1.UsuarioUpdateDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Perfil actualizado', type: usuario_dto_1.UsuarioPublicDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usuario_dto_1.UsuarioUpdateDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "updatePerfil", null);
__decorate([
    (0, common_1.Get)('sesiones'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar auditoría de sesiones',
        description: 'Retorna el historial de inicios de sesión de todos los usuarios.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de sesiones',
        type: [usuario_dto_1.SessionAuditPublicDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "listSesiones", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('api/v1/usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map