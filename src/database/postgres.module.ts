import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity';
import { OtpEntity } from '../usuarios/entities/otp.entity';
import { LoteEntity } from '../lotes/entities/lote.entity';
import { ReservaEntity } from '../reservas/entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('postgres.host'),
        port: config.get<number>('postgres.port'),
        username: config.get<string>('postgres.username'),
        password: config.get<string>('postgres.password'),
        database: config.get<string>('postgres.database'),
        entities: [UsuarioEntity, OtpEntity, LoteEntity, ReservaEntity],
        synchronize: false,
        logging: true,
        ssl: false,
        extra: { ssl: false },
      }),
    }),
  ],
})
export class PostgresModule {}

