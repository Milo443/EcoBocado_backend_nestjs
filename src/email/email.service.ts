import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly config: ConfigService) {}

  async sendOtpEmail(toEmail: string, otpCode: string): Promise<boolean> {
    const serviceId = this.config.get<string>('emailjs.serviceId');
    const templateId = this.config.get<string>('emailjs.templateId');
    const publicKey = this.config.get<string>('emailjs.publicKey');
    const privateKey = this.config.get<string>('emailjs.privateKey');

    if (!serviceId || !templateId || !publicKey) {
      this.logger.warn('EmailJS credentials not fully configured. Email not sent.');
      this.logger.debug(`DEBUG OTP for ${toEmail}: ${otpCode}`);
      return true;
    }

    const payload: Record<string, any> = {
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
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload);
      return true;
    } catch (error) {
      this.logger.error(`Error sending email via EmailJS: ${error.message}`);
      return false;
    }
  }
}
