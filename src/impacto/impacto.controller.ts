import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ImpactoService } from './impacto.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Impacto')
@Controller('api/v1/impacto')
export class ImpactoController {
  constructor(private readonly impactoService: ImpactoService) {}

  // GET /api/v1/impacto/global
  @Get('global')
  @ApiOperation({
    summary: 'Impacto Histórico Global',
    description: 'Retorna las métricas acumuladas de impacto social y ambiental de toda la plataforma.',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas globales de impacto',
    schema: {
      example: {
        total_rescatado_kg: 1250.5,
        personas_ayudadas: 340,
        aliados_red: 85,
        co2_mitigado_kg: 3126.25,
        impacto_por_categoria: { PANADERIA: 500.2, FRUTAS: 300.0, LACTEOS: 200.3, VEGETALES: 150.0, OTROS: 100.0 },
        impacto_mensual: [
          { label: 'Ene', valor: 180.5 },
          { label: 'Feb', valor: 220.0 },
        ],
      },
    },
  })
  impactoGlobal() {
    return this.impactoService.getGlobalImpact();
  }

  // GET /api/v1/impacto/dashboard-donante
  @Get('dashboard-donante')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Métricas de Donante',
    description: 'Retorna las estadísticas personalizadas para el panel principal del donador.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard personal del donador',
    schema: {
      example: {
        peso_rescatado_kg: 45.5,
        lotes_activos: 3,
        entregas_hoy: 1,
      },
    },
  })
  dashboardDonante(@CurrentUser() user: any) {
    return this.impactoService.getDonorDashboard(user.id);
  }
}
