import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { LotesService } from './lotes.service';
import { LoteCreateDto, LoteUpdateDto, LotePublicDto } from './dto/lote.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StorageService } from '../storage/storage.service';

@ApiTags('Lotes')
@Controller('api/v1/lotes')
export class LotesController {
  constructor(
    private readonly lotesService: LotesService,
    private readonly storageService: StorageService,
  ) {}

  // GET /api/v1/lotes/activos
  @Get('activos')
  @ApiOperation({
    summary: 'Listar lotes activos',
    description: 'Retorna todos los lotes de alimentos que están actualmente disponibles para reserva.',
  })
  @ApiResponse({ status: 200, description: 'Lista de lotes activos', type: [LotePublicDto] })
  listarActivos() {
    return this.lotesService.listarActivos();
  }

  // POST /api/v1/lotes/upload-image
  @Post('upload-image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Subir imagen de lote',
    description: 'Sube una imagen al almacenamiento S3 (MinIO) y retorna la URL pública.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: { type: 'string', format: 'binary', description: 'Archivo de imagen del lote' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'URL de la imagen subida', schema: { example: { url: 'https://cdn.vooltlab.com/ecobocado-images/abc.jpg' } } })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se proporcionó ningún archivo');
    const url = await this.storageService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    return { url };
  }

  // POST /api/v1/lotes/
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Publicar nuevo lote',
    description: 'Permite a un donador publicar un nuevo lote de alimentos. Requiere autenticación.',
  })
  @ApiBody({ type: LoteCreateDto })
  @ApiResponse({ status: 201, description: 'Lote publicado exitosamente', type: LotePublicDto })
  publicarLote(@CurrentUser() user: any, @Body() dto: LoteCreateDto) {
    return this.lotesService.publicarLote(user.id, dto);
  }

  // GET /api/v1/lotes/mis-lotes
  @Get('mis-lotes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Mis publicaciones',
    description: 'Retorna la lista de lotes publicados por el donador autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Mis lotes', type: [LotePublicDto] })
  misLotes(@CurrentUser() user: any) {
    return this.lotesService.misLotes(user.id);
  }

  // DELETE /api/v1/lotes/:lote_id
  @Delete(':lote_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar lote (Lógico)',
    description: 'Marca un lote como borrado. Solo el donador dueño puede hacerlo.',
  })
  @ApiParam({ name: 'lote_id', description: 'UUID del lote a eliminar', type: 'string' })
  @ApiResponse({ status: 200, description: 'Lote eliminado' })
  eliminarLote(@Param('lote_id') loteId: string, @CurrentUser() user: any) {
    return this.lotesService.eliminarLote(loteId, user.id);
  }

  // PUT /api/v1/lotes/:lote_id
  @Put(':lote_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar lote',
    description: 'Permite a un donador actualizar los datos de su lote. Solo el dueño puede hacerlo.',
  })
  @ApiParam({ name: 'lote_id', description: 'UUID del lote a actualizar', type: 'string' })
  @ApiBody({ type: LoteUpdateDto })
  @ApiResponse({ status: 200, description: 'Lote actualizado', type: LotePublicDto })
  actualizarLote(
    @Param('lote_id') loteId: string,
    @CurrentUser() user: any,
    @Body() dto: LoteUpdateDto,
  ) {
    return this.lotesService.actualizarLote(loteId, user.id, dto);
  }
}
