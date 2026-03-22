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
exports.ReservasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const reserva_entity_1 = require("./entities/reserva.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
let ReservasService = class ReservasService {
    reservaRepo;
    loteRepo;
    dataSource;
    constructor(reservaRepo, loteRepo, dataSource) {
        this.reservaRepo = reservaRepo;
        this.loteRepo = loteRepo;
        this.dataSource = dataSource;
    }
    async toReservaPublic(reserva) {
        const loteData = await this.dataSource.query(`SELECT l.id, l.titulo, l.descripcion, l.cantidad, l.peso_kg, l.categoria,
              l.estado, l.imagen_url, l.fecha_publicacion, l.fecha_caducidad,
              l.donante_id,
              ST_Y(l.ubicacion::geometry) AS latitud,
              ST_X(l.ubicacion::geometry) AS longitud,
              u.nombre AS donante_nombre,
              u.direccion AS donante_direccion
       FROM lotes_alimentos l
       JOIN usuarios u ON u.id = l.donante_id
       WHERE l.id = $1`, [reserva.lote_id]);
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
    async reservarLote(receptorId, dto) {
        const lote = await this.loteRepo.findOne({ where: { id: dto.lote_id } });
        if (!lote)
            throw new common_1.NotFoundException('Lote no encontrado');
        if (lote.estado !== lote_entity_1.EstadoLote.ACTIVO)
            throw new common_1.BadRequestException('El lote no está disponible para reserva');
        const qrToken = (0, uuid_1.v4)();
        const fechaLimite = new Date(Date.now() + 24 * 60 * 60 * 1000);
        return await this.dataSource.transaction(async (manager) => {
            const reserva = manager.create(reserva_entity_1.ReservaEntity, {
                lote_id: dto.lote_id,
                receptor_id: receptorId,
                estado: reserva_entity_1.EstadoReserva.PENDIENTE,
                codigo_qr_token: qrToken,
                fecha_limite_recogida: fechaLimite,
            });
            const saved = await manager.save(reserva_entity_1.ReservaEntity, reserva);
            await manager.update(lote_entity_1.LoteEntity, { id: dto.lote_id }, { estado: lote_entity_1.EstadoLote.RESERVADO });
            return this.toReservaPublic(saved);
        });
    }
    async reservasActivas(receptorId) {
        const reservas = await this.reservaRepo.find({
            where: { receptor_id: receptorId, estado: reserva_entity_1.EstadoReserva.PENDIENTE },
            order: { fecha_reserva: 'DESC' },
        });
        return Promise.all(reservas.map((r) => this.toReservaPublic(r)));
    }
    async historialReservas(receptorId) {
        const reservas = await this.reservaRepo.find({
            where: {
                receptor_id: receptorId,
                estado: (0, typeorm_2.In)([reserva_entity_1.EstadoReserva.COMPLETADO, reserva_entity_1.EstadoReserva.VENCIDO, reserva_entity_1.EstadoReserva.RECOGIDO]),
            },
            order: { fecha_reserva: 'DESC' },
        });
        return Promise.all(reservas.map((r) => this.toReservaPublic(r)));
    }
    async completarReserva(reservaId) {
        const reserva = await this.reservaRepo.findOne({ where: { id: reservaId } });
        if (!reserva)
            throw new common_1.NotFoundException('Reserva no encontrada');
        return await this.dataSource.transaction(async (manager) => {
            await manager.update(reserva_entity_1.ReservaEntity, { id: reservaId }, { estado: reserva_entity_1.EstadoReserva.COMPLETADO, fecha_completada: new Date() });
            await manager.update(lote_entity_1.LoteEntity, { id: reserva.lote_id }, { estado: lote_entity_1.EstadoLote.COMPLETADO });
            return { mensaje: 'Reserva completada exitosamente' };
        });
    }
    async cancelarReserva(reservaId, receptorId) {
        const reserva = await this.reservaRepo.findOne({
            where: { id: reservaId, estado: reserva_entity_1.EstadoReserva.PENDIENTE },
        });
        if (!reserva)
            throw new common_1.NotFoundException('Reserva activa no encontrada');
        if (reserva.receptor_id !== receptorId)
            throw new common_1.ForbiddenException('No tienes permiso para cancelar esta reserva');
        return await this.dataSource.transaction(async (manager) => {
            await manager.update(reserva_entity_1.ReservaEntity, { id: reservaId }, { estado: reserva_entity_1.EstadoReserva.VENCIDO });
            await manager.update(lote_entity_1.LoteEntity, { id: reserva.lote_id }, { estado: lote_entity_1.EstadoLote.ACTIVO });
            return { mensaje: 'Reserva cancelada exitosamente' };
        });
    }
};
exports.ReservasService = ReservasService;
exports.ReservasService = ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reserva_entity_1.ReservaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(lote_entity_1.LoteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ReservasService);
//# sourceMappingURL=reservas.service.js.map