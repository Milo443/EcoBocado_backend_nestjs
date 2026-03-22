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
exports.LoginVerifyDto = exports.LoginRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginRequestDto {
    email;
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico del usuario registrado',
        example: 'usuario@ejemplo.com',
        format: 'email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
class LoginVerifyDto {
    email;
    otp_code;
}
exports.LoginVerifyDto = LoginVerifyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com',
        format: 'email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginVerifyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código OTP de 6 dígitos recibido por correo',
        example: '482931',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginVerifyDto.prototype, "otp_code", void 0);
//# sourceMappingURL=login.dto.js.map