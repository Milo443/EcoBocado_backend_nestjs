import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';

export enum EstadoLote {
  ACTIVO = 'ACTIVO',
  RESERVADO = 'RESERVADO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
}

export enum CategoriaAlimento {
  PANADERIA = 'PANADERIA',
  FRUTAS = 'FRUTAS',
  LACTEOS = 'LACTEOS',
  VEGETALES = 'VEGETALES',
  OTROS = 'OTROS',
}

@Entity('lotes_alimentos')
export class LoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'donante_id' })
  donante_id: string;

  @Column({ length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ length: 100 })
  cantidad: string;

  @Column({ type: 'float', name: 'peso_kg' })
  peso_kg: number;

  @Column({ type: 'enum', enum: CategoriaAlimento })
  categoria: CategoriaAlimento;

  @Column({ type: 'enum', enum: EstadoLote, default: EstadoLote.ACTIVO })
  estado: EstadoLote;

  @Column({ length: 500, nullable: true, name: 'imagen_url' })
  imagen_url?: string;

  // Coordenadas geográficas - VIRTUAL: extraídas vía ST_X/ST_Y en raw queries
  // La BD tiene columna ubicacion Geometry(POINT) de PostGIS, no latitud/longitud individuales
  latitud?: number;
  longitud?: number;

  @CreateDateColumn({ name: 'fecha_publicacion' })
  fecha_publicacion: Date;

  @Column({ type: 'timestamp', name: 'fecha_caducidad' })
  fecha_caducidad: Date;

  @Column({ default: false, name: 'esta_borrado' })
  esta_borrado: boolean;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'donante_id' })
  donante: UsuarioEntity;
}
