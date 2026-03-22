import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum RolUsuario {
  DONOR = 'DONOR',
  RECEPTOR = 'RECEPTOR',
}

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, name: 'password_hash' })
  password_hash: string;

  @Column({ type: 'enum', enum: RolUsuario })
  rol: RolUsuario;

  @Column({ length: 500, nullable: true, name: 'avatar_url' })
  avatar_url?: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 50 })
  telefono: string;

  @CreateDateColumn({ name: 'fecha_registro' })
  fecha_registro: Date;
}
