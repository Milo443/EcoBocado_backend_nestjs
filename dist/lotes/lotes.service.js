"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lote_entity_1 = require("./entities/lote.entity");
let LotesService = class LotesService {
    loteRepo;
    dataSource;
    constructor(loteRepo, dataSource) {
        this.loteRepo = loteRepo;
        this.dataSource = dataSource;
    }
    toLotePublic(row) {
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
    async listarActivos() {
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
        return rows.map((r) => this.toLotePublic(r));
    }
    async misLotes(donanteId) {
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
        return rows.map((r) => this.toLotePublic(r));
    }
    async publicarLote(donanteId, dto) {
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
    async actualizarLote(loteId, donanteId, dto) {
        const existing = await this.dataSource.query(`SELECT id, donante_id FROM lotes_alimentos WHERE id = $1 AND esta_borrado = false`, [loteId]);
        if (!existing.length)
            throw new common_1.NotFoundException('Lote no encontrado');
        if (existing[0].donante_id !== donanteId)
            throw new common_1.ForbiddenException('No tienes permiso para editar este lote');
        const sets = [];
        const params = [];
        let idx = 1;
        if (dto.titulo !== undefined) {
            sets.push(`titulo = $${idx++}`);
            params.push(dto.titulo);
        }
        if (dto.descripcion !== undefined) {
            sets.push(`descripcion = $${idx++}`);
            params.push(dto.descripcion);
        }
        if (dto.cantidad !== undefined) {
            sets.push(`cantidad = $${idx++}`);
            params.push(dto.cantidad);
        }
        if (dto.peso_kg !== undefined) {
            sets.push(`peso_kg = $${idx++}`);
            params.push(dto.peso_kg);
        }
        if (dto.categoria !== undefined) {
            sets.push(`categoria = $${idx++}`);
            params.push(dto.categoria);
        }
        if (dto.fecha_caducidad !== undefined) {
            sets.push(`fecha_caducidad = $${idx++}`);
            params.push(dto.fecha_caducidad);
        }
        if (dto.imagen_url !== undefined) {
            sets.push(`imagen_url = $${idx++}`);
            params.push(dto.imagen_url);
        }
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
    async eliminarLote(loteId, donanteId) {
        const existing = await this.dataSource.query(`SELECT id, donante_id FROM lotes_alimentos WHERE id = $1 AND esta_borrado = false`, [loteId]);
        if (!existing.length)
            throw new common_1.NotFoundException('Lote no encontrado');
        if (existing[0].donante_id !== donanteId)
            throw new common_1.ForbiddenException('No tienes permiso para eliminar este lote');
        await this.dataSource.query(`UPDATE lotes_alimentos SET esta_borrado = true WHERE id = $1`, [loteId]);
        return { mensaje: 'Lote eliminado correctamente' };
    }
};
exports.LotesService = LotesService;
exports.LotesService = LotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lote_entity_1.LoteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], LotesService);
//# sourceMappingURL=lotes.service.js.map