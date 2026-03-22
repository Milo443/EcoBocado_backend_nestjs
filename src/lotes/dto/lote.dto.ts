import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { EstadoLote, CategoriaAlimento } from '../entities/lote.entity';

export class LoteCreateDto {
  @ApiProperty({ description: 'Título del lote de alimentos', example: 'Pan artesanal del día' })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Descripción detallada del lote', example: '10 panes integrales horneados hoy' })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'Cantidad disponible (texto libre)', example: '10 unidades' })
  @IsString()
  cantidad: string;

  @ApiProperty({ description: 'Peso total en kilogramos', example: 2.5 })
  @IsNumber()
  peso_kg: number;

  @ApiProperty({
    description: 'Categoría del alimento',
    enum: CategoriaAlimento,
    example: CategoriaAlimento.PANADERIA,
  })
  @IsEnum(CategoriaAlimento)
  categoria: CategoriaAlimento;

  @ApiProperty({
    description: 'Fecha y hora de caducidad del lote (ISO 8601)',
    example: '2024-12-31T23:59:00Z',
  })
  @IsDateString()
  fecha_caducidad: string;

  @ApiPropertyOptional({ description: 'URL de imagen del lote (subida con upload-image)', example: 'https://cdn.vooltlab.com/ecobocado-images/abc.jpg' })
  @IsOptional()
  @IsString()
  imagen_url?: string;

  @ApiProperty({ description: 'Latitud de la ubicación del donador', example: 4.7110 })
  @IsNumber()
  latitud: number;

  @ApiProperty({ description: 'Longitud de la ubicación del donador', example: -74.0721 })
  @IsNumber()
  longitud: number;
}

export class LoteUpdateDto {
  @ApiPropertyOptional({ example: 'Pan integral actualizado' })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({ example: '5 unidades disponibles' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: '5 unidades' })
  @IsOptional()
  @IsString()
  cantidad?: string;

  @ApiPropertyOptional({ example: 1.2 })
  @IsOptional()
  @IsNumber()
  peso_kg?: number;

  @ApiPropertyOptional({ enum: CategoriaAlimento, example: CategoriaAlimento.OTROS })
  @IsOptional()
  @IsEnum(CategoriaAlimento)
  categoria?: CategoriaAlimento;

  @ApiPropertyOptional({ example: '2025-01-15T12:00:00Z' })
  @IsOptional()
  @IsDateString()
  fecha_caducidad?: string;

  @ApiPropertyOptional({ example: 'https://cdn.vooltlab.com/ecobocado-images/new.jpg' })
  @IsOptional()
  @IsString()
  imagen_url?: string;

  @ApiPropertyOptional({ example: 4.6097 })
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional({ example: -74.0817 })
  @IsOptional()
  @IsNumber()
  longitud?: number;
}

export class LotePublicDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  donante_id: string;

  @ApiProperty({ example: 'Pan artesanal del día' })
  titulo: string;

  @ApiProperty({ example: '10 panes integrales horneados hoy' })
  descripcion: string;

  @ApiProperty({ example: '10 unidades' })
  cantidad: string;

  @ApiProperty({ example: 2.5 })
  peso_kg: number;

  @ApiProperty({ enum: CategoriaAlimento, example: CategoriaAlimento.PANADERIA })
  categoria: CategoriaAlimento;

  @ApiProperty({ enum: EstadoLote, example: EstadoLote.ACTIVO })
  estado: EstadoLote;

  @ApiProperty({ example: '2024-12-31T23:59:00Z' })
  fecha_caducidad: Date;

  @ApiProperty({ example: '2024-01-01T08:00:00Z' })
  fecha_publicacion: Date;

  @ApiPropertyOptional({ example: 'https://cdn.vooltlab.com/ecobocado-images/abc.jpg', nullable: true })
  imagen_url?: string;

  @ApiPropertyOptional({ example: null, nullable: true })
  reserva_id?: string;

  @ApiPropertyOptional({ example: null, nullable: true })
  codigo_qr_token?: string;
}
