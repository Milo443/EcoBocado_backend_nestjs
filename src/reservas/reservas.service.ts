import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Not, In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ReservaEntity, EstadoReserva } from './entities/reserva.entity';
import { LoteEntity, EstadoLote } from '../lotes/entities/lote.entity';
import { ReservaCreateDto } from './dto/reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepo: Repository<ReservaEntity>,

    @InjectRepository(LoteEntity)
    private readonly loteRepo: Repository<LoteEntity>,

    private readonly dataSource: DataSource,
  ) {}

  // ─── Helper: serialize reserva with joined lote data ─────────────────────────
  private async toReservaPublic(reserva: ReservaEntity) {
    const loteData = await this.dataSource.query(
      `SELECT l.id, l.titulo, l.descripcion, l.cantidad, l.peso_kg, l.categoria,
              l.estado, l.imagen_url, l.fecha_publicacion, l.fecha_caducidad,
              l.donante_id,
              ST_Y(l.ubicacion::geometry) AS latitud,
              ST_X(l.ubicacion::geometry) AS longitud,
              u.nombre AS donante_nombre,
              u.direccion AS donante_direccion
       FROM lotes_alimentos l
       JOIN usuarios u ON u.id = l.donante_id
       WHERE l.id = $1`,
      [reserva.lote_id],
    );

    const lote = loteData[0];
    return {
      id: reserva.id,
      lote_id: reserva.lote_id,
      receptor_id: reserva.receptor_id,
      estado: reserva.estado,
      codigo_qr_token: reserva.codigo_qr_token,
      fecha_reserva: reserva.fecha_reserva,
      fecha_limite_recogida: reserva.fecha_limite_recogida,
      fecha_completada: reserva.fecha_completada || null,
      lote_titulo: lote?.titulo || null,
      donante_nombre: lote?.donante_nombre || null,
      donante_direccion: lote?.donante_direccion || null,
      lote_caduca: lote?.fecha_caducidad || null,
      lote: lote
        ? {
            id: lote.id,
            donante_id: lote.donante_id,
            titulo: lote.titulo,
            descripcion: lote.descripcion,
            cantidad: lote.cantidad,
            peso_kg: parseFloat(lote.peso_kg),
            categoria: lote.categoria,
            estado: lote.estado,
            imagen_url: lote.imagen_url || null,
            fecha_caducidad: lote.fecha_caducidad,
            fecha_publicacion: lote.fecha_publicacion,
            reserva_id: null,
            codigo_qr_token: null,
          }
        : null,
    };
  }

  // ─── Reservar lote ───────────────────────────────────────────────────────────
  async reservarLote(receptorId: string, dto: ReservaCreateDto) {
    const lote = await this.loteRepo.findOne({ where: { id: dto.lote_id } });
    if (!lote) throw new NotFoundException('Lote no encontrado');
    if (lote.estado !== EstadoLote.ACTIVO)
      throw new BadRequestException('El lote no está disponible para reserva');

    const qrToken = uuidv4();
    const fechaLimite = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return await this.dataSource.transaction(async (manager) => {
      const reserva = manager.create(ReservaEntity, {
        lote_id: dto.lote_id,
        receptor_id: receptorId,
        estado: EstadoReserva.PENDIENTE,
        codigo_qr_token: qrToken,
        fecha_limite_recogida: fechaLimite,
      });
      const saved = await manager.save(ReservaEntity, reserva);
      await manager.update(LoteEntity, { id: dto.lote_id }, { estado: EstadoLote.RESERVADO });
      return this.toReservaPublic(saved);
    });
  }

  // ─── Reservas activas (PENDIENTE) ────────────────────────────────────────────
  async reservasActivas(receptorId: string) {
    const reservas = await this.reservaRepo.find({
      where: { receptor_id: receptorId, estado: EstadoReserva.PENDIENTE },
      order: { fecha_reserva: 'DESC' },
    });
    return Promise.all(reservas.map((r) => this.toReservaPublic(r)));
  }

  // ─── Historial de reservas ────────────────────────────────────────────────────
  async historialReservas(receptorId: string) {
    const reservas = await this.reservaRepo.find({
      where: {
        receptor_id: receptorId,
        estado: In([EstadoReserva.COMPLETADO, EstadoReserva.VENCIDO, EstadoReserva.RECOGIDO]),
      },
      order: { fecha_reserva: 'DESC' },
    });
    return Promise.all(reservas.map((r) => this.toReservaPublic(r)));
  }

  // ─── Completar reserva ────────────────────────────────────────────────────────
  async completarReserva(reservaId: string) {
    const reserva = await this.reservaRepo.findOne({ where: { id: reservaId } });
    if (!reserva) throw new NotFoundException('Reserva no encontrada');

    return await this.dataSource.transaction(async (manager) => {
      await manager.update(
        ReservaEntity,
        { id: reservaId },
        { estado: EstadoReserva.COMPLETADO, fecha_completada: new Date() },
      );
      await manager.update(LoteEntity, { id: reserva.lote_id }, { estado: EstadoLote.COMPLETADO });
      return { mensaje: 'Reserva completada exitosamente' };
    });
  }

  // ─── Cancelar reserva ─────────────────────────────────────────────────────────
  async cancelarReserva(reservaId: string, receptorId: string) {
    const reserva = await this.reservaRepo.findOne({
      where: { id: reservaId, estado: EstadoReserva.PENDIENTE },
    });
    if (!reserva) throw new NotFoundException('Reserva activa no encontrada');
    if (reserva.receptor_id !== receptorId)
      throw new ForbiddenException('No tienes permiso para cancelar esta reserva');

    return await this.dataSource.transaction(async (manager) => {
      await manager.update(ReservaEntity, { id: reservaId }, { estado: EstadoReserva.VENCIDO });
      await manager.update(LoteEntity, { id: reserva.lote_id }, { estado: EstadoLote.ACTIVO });
      return { mensaje: 'Reserva cancelada exitosamente' };
    });
  }
}
