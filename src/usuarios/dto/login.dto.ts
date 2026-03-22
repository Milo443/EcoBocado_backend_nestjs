import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario registrado',
    example: 'usuario@ejemplo.com',
    format: 'email',
  })
  @IsEmail()
  email: string;
}

export class LoginVerifyDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Código OTP de 6 dígitos recibido por correo',
    example: '482931',
  })
  @IsString()
  otp_code: string;
}
