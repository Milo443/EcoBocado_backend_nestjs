import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { ReservasService } from './reservas.service';
import { ReservaCreateDto, ReservaPublicDto } from './dto/reserva.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Reservas')
@Controller('api/v1/reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  // POST /api/v1/reservas/
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Reservar un lote',
    description: 'Crea una reserva para un lote de alimentos específico. Cambia el estado del lote a RESERVADO.',
  })
  @ApiBody({ type: ReservaCreateDto })
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente', type: ReservaPublicDto })
  @ApiResponse({ status: 400, description: 'El lote no está disponible' })
  reservarLote(@CurrentUser() user: any, @Body() dto: ReservaCreateDto) {
    return this.reservasService.reservarLote(user.id, dto);
  }

  // GET /api/v1/reservas/activas
  @Get('activas')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Mis reservas activas',
    description: 'Retorna la lista de reservas en estado PENDIENTE realizadas por el receptor autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Reservas activas', type: [ReservaPublicDto] })
  reservasActivas(@CurrentUser() user: any) {
    return this.reservasService.reservasActivas(user.id);
  }

  // GET /api/v1/reservas/historial
  @Get('historial')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Historial de reservas',
    description: 'Retorna el historial de reservas completadas o vencidas.',
  })
  @ApiResponse({ status: 200, description: 'Historial de reservas', type: [ReservaPublicDto] })
  historialReservas(@CurrentUser() user: any) {
    return this.reservasService.historialReservas(user.id);
  }

  // POST /api/v1/reservas/:reserva_id/completar
  @Post(':reserva_id/completar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Completar recogida',
    description: 'Marca una reserva como completada y el lote como entregado. Solo puede hacerlo el donador o personal autorizado.',
  })
  @ApiParam({ name: 'reserva_id', description: 'UUID de la reserva a completar', type: 'string' })
  @ApiResponse({ status: 200, description: 'Reserva completada' })
  completarReserva(@Param('reserva_id') reservaId: string) {
    return this.reservasService.completarReserva(reservaId);
  }

  // POST /api/v1/reservas/:reserva_id/cancelar
  @Post(':reserva_id/cancelar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cancelar reserva',
    description: 'Libera el lote para que otros puedan reservarlo. Solo el receptor puede cancelar su reserva activa.',
  })
  @ApiParam({ name: 'reserva_id', description: 'UUID de la reserva a cancelar', type: 'string' })
  @ApiResponse({ status: 200, description: 'Reserva cancelada' })
  cancelarReserva(@Param('reserva_id') reservaId: string, @CurrentUser() user: any) {
    return this.reservasService.cancelarReserva(reservaId, user.id);
  }
}
