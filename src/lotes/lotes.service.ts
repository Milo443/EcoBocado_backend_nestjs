import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { LoteEntity, EstadoLote } from './entities/lote.entity';
import { LoteCreateDto, LoteUpdateDto } from './dto/lote.dto';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(LoteEntity)
    private readonly loteRepo: Repository<LoteEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // ─── Helper: serialize lote for response (matches FastAPI LotePublic schema) ─
  private toLotePublic(row: any) {
    return {
      id: row.id,
      donante_id: row.donante_id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      cantidad: row.cantidad,
      peso_kg: parseFloat(row.peso_kg),
      categoria: row.categoria,
      estado: row.estado,
      fecha_caducidad: row.fecha_caducidad,
      fecha_publicacion: row.fecha_publicacion,
      imagen_url: row.imagen_url || null,
      reserva_id: row.reserva_id || null,
      codigo_qr_token: row.codigo_qr_token || null,
    };
  }

  // ─── Listar lotes activos ────────────────────────────────────────────────────
  async listarActivos() {
    // Use raw query to extract lat/lon from PostGIS geometry column
    const rows = await this.dataSource.query(`
      SELECT
        id, donante_id, titulo, descripcion, cantidad, peso_kg,
        categoria, estado, imagen_url,
        fecha_publicacion, fecha_caducidad,
        ST_Y(ubicacion::geometry) AS latitud,
        ST_X(ubicacion::geometry) AS longitud,
        NULL::uuid AS reserva_id,
        NULL AS codigo_qr_token
      FROM lotes_alimentos
      WHERE estado = 'ACTIVO' AND esta_borrado = false
      ORDER BY fecha_publicacion DESC
    `);
    return rows.map((r: any) => this.toLotePublic(r));
  }

  // ─── Mis lotes (donador autenticado) ────────────────────────────────────────
  async misLotes(donanteId: string) {
    const rows = await this.dataSource.query(`
      SELECT
        id, donante_id, titulo, descripcion, cantidad, peso_kg,
        categoria, estado, imagen_url,
        fecha_publicacion, fecha_caducidad,
        ST_Y(ubicacion::geometry) AS latitud,
        ST_X(ubicacion::geometry) AS longitud,
        NULL::uuid AS reserva_id,
        NULL AS codigo_qr_token
      FROM lotes_alimentos
      WHERE donante_id = $1 AND esta_borrado = false
      ORDER BY fecha_publicacion DESC
    `, [donanteId]);
    return rows.map((r: any) => this.toLotePublic(r));
  }

  // ─── Publicar nuevo lote ─────────────────────────────────────────────────────
  async publicarLote(donanteId: string, dto: LoteCreateDto) {
    const result = await this.dataSource.query(`
      INSERT INTO lotes_alimentos 
        (id, donante_id, titulo, descripcion, cantidad, peso_kg, categoria, estado,
         imagen_url, ubicacion, fecha_caducidad, esta_borrado)
      VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'ACTIVO',
        $7,
        ST_SetSRID(ST_MakePoint($9, $8), 4326),
        $10, false
      )
      RETURNING id, donante_id, titulo, descripcion, cantidad, peso_kg,
        categoria, estado, imagen_url, fecha_publicacion, fecha_caducidad,
        ST_Y(ubicacion::geometry) AS latitud,
        ST_X(ubicacion::geometry) AS longitud,
        NULL::uuid AS reserva_id,
        NULL AS codigo_qr_token
    `, [
      donanteId,
      dto.titulo,
      dto.descripcion,
      dto.cantidad,
      dto.peso_kg,
      dto.categoria,
      dto.imagen_url || null,
      dto.latitud,
      dto.longitud,
      dto.fecha_caducidad,
    ]);

    return this.toLotePublic(result[0]);
  }

  // ─── Actualizar lote ─────────────────────────────────────────────────────────
  async actualizarLote(loteId: string, donanteId: string, dto: LoteUpdateDto) {
    const existing = await this.dataSource.query(
      `SELECT id, donante_id FROM lotes_alimentos WHERE id = $1 AND esta_borrado = false`,
      [loteId],
    );
    if (!existing.length) throw new NotFoundException('Lote no encontrado');
    if (existing[0].donante_id !== donanteId)
      throw new ForbiddenException('No tienes permiso para editar este lote');

    const sets: string[] = [];
    const params: any[] = [];
    let idx = 1;

    if (dto.titulo !== undefined) { sets.push(`titulo = $${idx++}`); params.push(dto.titulo); }
    if (dto.descripcion !== undefined) { sets.push(`descripcion = $${idx++}`); params.push(dto.descripcion); }
    if (dto.cantidad !== undefined) { sets.push(`cantidad = $${idx++}`); params.push(dto.cantidad); }
    if (dto.peso_kg !== undefined) { sets.push(`peso_kg = $${idx++}`); params.push(dto.peso_kg); }
    if (dto.categoria !== undefined) { sets.push(`categoria = $${idx++}`); params.push(dto.categoria); }
    if (dto.fecha_caducidad !== undefined) { sets.push(`fecha_caducidad = $${idx++}`); params.push(dto.fecha_caducidad); }
    if (dto.imagen_url !== undefined) { sets.push(`imagen_url = $${idx++}`); params.push(dto.imagen_url); }
    if (dto.latitud !== undefined && dto.longitud !== undefined) {
      sets.push(`ubicacion = ST_SetSRID(ST_MakePoint($${idx++}, $${idx++}), 4326)`);
      params.push(dto.longitud, dto.latitud);
    }

    params.push(loteId);
    const result = await this.dataSource.query(`
      UPDATE lotes_alimentos SET ${sets.join(', ')}
      WHERE id = $${idx}
      RETURNING id, donante_id, titulo, descripcion, cantidad, peso_kg,
        categoria, estado, imagen_url, fecha_publicacion, fecha_caducidad,
        ST_Y(ubicacion::geometry) AS latitud,
        ST_X(ubicacion::geometry) AS longitud,
        NULL::uuid AS reserva_id,
        NULL AS codigo_qr_token
    `, params);

    return this.toLotePublic(result[0]);
  }

  // ─── Eliminar lote (lógico) ──────────────────────────────────────────────────
  async eliminarLote(loteId: string, donanteId: string) {
    const existing = await this.dataSource.query(
      `SELECT id, donante_id FROM lotes_alimentos WHERE id = $1 AND esta_borrado = false`,
      [loteId],
    );
    if (!existing.length) throw new NotFoundException('Lote no encontrado');
    if (existing[0].donante_id !== donanteId)
      throw new ForbiddenException('No tienes permiso para eliminar este lote');

    await this.dataSource.query(
      `UPDATE lotes_alimentos SET esta_borrado = true WHERE id = $1`,
      [loteId],
    );
    return { mensaje: 'Lote eliminado correctamente' };
  }
}
