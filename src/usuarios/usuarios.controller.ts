import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';


import { UsuariosService } from './usuarios.service';
import { LoginRequestDto, LoginVerifyDto } from './dto/login.dto';
import {
  UsuarioCreateDto,
  UsuarioUpdateDto,
  UsuarioPublicDto,
  AuthResponseDto,
  StatusResponseDto,
  SessionAuditPublicDto,
} from './dto/usuario.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Usuarios')
@Controller('api/v1/usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // POST /api/v1/usuarios/login-otp/request
  @Post('login-otp/request')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Solicitar código OTP',
    description:
      'Genera un código de verificación de 6 dígitos y lo envía al correo del usuario vía EmailJS.',
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ status: 200, description: 'Código enviado', type: StatusResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no registrado' })
  @ApiResponse({ status: 500, description: 'Error enviando el correo' })
  requestOtp(@Body() dto: LoginRequestDto) {
    return this.usuariosService.loginRequest(dto);
  }

  // POST /api/v1/usuarios/login-otp/verify
  @Post('login-otp/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verificar OTP y obtener token',
    description:
      'Valida el código OTP enviado al correo. Si es correcto, emite un JWT Bearer Token válido por 24 horas.',
  })
  @ApiBody({ type: LoginVerifyDto })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Código inválido o expirado' })
  verifyOtp(@Body() dto: LoginVerifyDto, @Req() req: any) {
    const ip = req.ip as string | undefined;
    const userAgent = req.headers?.['user-agent'] as string | undefined;
    return this.usuariosService.loginVerify(dto, ip, userAgent);
  }

  // POST /api/v1/usuarios/register
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description:
      'Crea una nueva cuenta de usuario (DONOR o RECEPTOR) y devuelve un token de acceso inmediato.',
  })
  @ApiBody({ type: UsuarioCreateDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'El correo ya está registrado' })
  register(@Body() dto: UsuarioCreateDto) {
    return this.usuariosService.register(dto);
  }

  // GET /api/v1/usuarios/perfil
  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener perfil de usuario',
    description:
      'Recupera la información del perfil del usuario autenticado a partir del token Bearer.',
  })
  @ApiResponse({ status: 200, description: 'Perfil del usuario', type: UsuarioPublicDto })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getPerfil(@CurrentUser() user: any) {
    return this.usuariosService.getPerfil(user.sub);
  }

  // PUT /api/v1/usuarios/perfil
  @Put('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar perfil',
    description:
      'Permite al usuario autenticado actualizar sus datos personales (nombre, dirección, teléfono).',
  })
  @ApiBody({ type: UsuarioUpdateDto })
  @ApiResponse({ status: 200, description: 'Perfil actualizado', type: UsuarioPublicDto })
  updatePerfil(@CurrentUser() user: any, @Body() dto: UsuarioUpdateDto) {
    return this.usuariosService.updatePerfil(user.sub, dto);
  }

  // GET /api/v1/usuarios/sesiones
  @Get('sesiones')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar auditoría de sesiones',
    description: 'Retorna el historial de inicios de sesión de todos los usuarios.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de sesiones',
    type: [SessionAuditPublicDto],
  })
  listSesiones() {
    return this.usuariosService.listSesiones();
  }
}
