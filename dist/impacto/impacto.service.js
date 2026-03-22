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
exports.ImpactoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const impacto_evento_schema_1 = require("./schemas/impacto-evento.schema");
let ImpactoService = class ImpactoService {
    dataSource;
    impactoEventoModel;
    constructor(dataSource, impactoEventoModel) {
        this.dataSource = dataSource;
        this.impactoEventoModel = impactoEventoModel;
    }
    async getGlobalImpact() {
        const [lotes] = await this.dataSource.query(`
      SELECT
        COALESCE(SUM(peso_kg), 0) AS total_rescatado_kg
      FROM lotes_alimentos
      WHERE estado = 'COMPLETADO'
    `);
        const [personas] = await this.dataSource.query(`
      SELECT COUNT(DISTINCT receptor_id) AS personas_ayudadas
      FROM reservas
      WHERE estado = 'COMPLETADO'
    `);
        const [aliados] = await this.dataSource.query(`
      SELECT COUNT(id) AS aliados_red
      FROM usuarios
      WHERE rol = 'DONOR'
    `);
        const totalKg = parseFloat(lotes.total_rescatado_kg);
        const co2 = Math.round(totalKg * 2.5 * 100) / 100;
        const categorias = await this.dataSource.query(`
      SELECT categoria, COALESCE(SUM(peso_kg), 0) AS peso
      FROM lotes_alimentos
      WHERE estado = 'COMPLETADO'
      GROUP BY categoria
    `);
        const impacto_por_categoria = {};
        for (const row of categorias) {
            impacto_por_categoria[row.categoria] = Math.round(parseFloat(row.peso) * 100) / 100;
        }
        const mensual = await this.dataSource.query(`
      SELECT
        EXTRACT(MONTH FROM r.fecha_completada) AS mes,
        COALESCE(SUM(l.peso_kg), 0) AS total_kg
      FROM reservas r
      JOIN lotes_alimentos l ON l.id = r.lote_id
      WHERE r.estado = 'COMPLETADO'
        AND r.fecha_completada >= NOW() - INTERVAL '6 months'
      GROUP BY mes
      ORDER BY mes
    `);
        const mesesNombres = {
            1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
            7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic',
        };
        const impacto_mensual = mensual.map((row) => ({
            label: mesesNombres[parseInt(row.mes)],
            valor: Math.round(parseFloat(row.total_kg) * 100) / 100,
        }));
        return {
            total_rescatado_kg: Math.round(totalKg * 100) / 100,
            personas_ayudadas: parseInt(personas.personas_ayudadas),
            aliados_red: parseInt(aliados.aliados_red),
            co2_mitigado_kg: co2,
            impacto_por_categoria,
            impacto_mensual,
        };
    }
    async getDonorDashboard(donanteId) {
        const [peso] = await this.dataSource.query(`
      SELECT COALESCE(SUM(peso_kg), 0) AS peso_rescatado_kg
      FROM lotes_alimentos
      WHERE donante_id = $1 AND estado = 'COMPLETADO'
    `, [donanteId]);
        const [activos] = await this.dataSource.query(`
      SELECT COUNT(id) AS lotes_activos
      FROM lotes_alimentos
      WHERE donante_id = $1 AND estado = 'ACTIVO'
    `, [donanteId]);
        const [hoy] = await this.dataSource.query(`
      SELECT COUNT(r.id) AS entregas_hoy
      FROM reservas r
      JOIN lotes_alimentos l ON l.id = r.lote_id
      WHERE l.donante_id = $1
        AND r.estado = 'COMPLETADO'
        AND r.fecha_completada >= NOW() - INTERVAL '24 hours'
    `, [donanteId]);
        return {
            peso_rescatado_kg: Math.round(parseFloat(peso.peso_rescatado_kg) * 100) / 100,
            lotes_activos: parseInt(activos.lotes_activos),
            entregas_hoy: parseInt(hoy.entregas_hoy),
        };
    }
};
exports.ImpactoService = ImpactoService;
exports.ImpactoService = ImpactoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(impacto_evento_schema_1.ImpactoEvento.name)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        mongoose_2.Model])
], ImpactoService);
//# sourceMappingURL=impacto.service.js.map