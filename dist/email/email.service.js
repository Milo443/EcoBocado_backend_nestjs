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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let EmailService = EmailService_1 = class EmailService {
    config;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(config) {
        this.config = config;
    }
    async sendOtpEmail(toEmail, otpCode) {
        const serviceId = this.config.get('emailjs.serviceId');
        const templateId = this.config.get('emailjs.templateId');
        const publicKey = this.config.get('emailjs.publicKey');
        const privateKey = this.config.get('emailjs.privateKey');
        if (!serviceId || !templateId || !publicKey) {
            this.logger.warn('EmailJS credentials not fully configured. Email not sent.');
            this.logger.debug(`DEBUG OTP for ${toEmail}: ${otpCode}`);
            return true;
        }
        const payload = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                to_email: toEmail,
                email: toEmail,
                otp_code: otpCode,
            },
        };
        if (privateKey) {
            payload['accessToken'] = privateKey;
        }
        try {
            await axios_1.default.post('https://api.emailjs.com/api/v1.0/email/send', payload);
            return true;
        }
        catch (error) {
            this.logger.error(`Error sending email via EmailJS: ${error.message}`);
            return false;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map