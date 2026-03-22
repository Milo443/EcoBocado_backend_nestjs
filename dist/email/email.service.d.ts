import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    sendOtpEmail(toEmail: string, otpCode: string): Promise<boolean>;
}
