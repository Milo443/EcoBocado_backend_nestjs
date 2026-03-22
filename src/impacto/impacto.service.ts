import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImpactoEvento, ImpactoEventoDocument } from './schemas/impacto-evento.schema';

@Injectable()
export class ImpactoService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectModel(ImpactoEvento.name)
    private readonly impactoEventoModel: Model<ImpactoEventoDocument>,
  ) {}

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

    // Impacto por categoría
    const categorias = await this.dataSource.query(`
      SELECT categoria, COALESCE(SUM(peso_kg), 0) AS peso
      FROM lotes_alimentos
      WHERE estado = 'COMPLETADO'
      GROUP BY categoria
    `);
    const impacto_por_categoria: Record<string, number> = {};
    for (const row of categorias) {
      impacto_por_categoria[row.categoria] = Math.round(parseFloat(row.peso) * 100) / 100;
    }

    // Impacto mensual (últimos 6 meses)
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
    const mesesNombres: Record<number, string> = {
      1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
      7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic',
    };
    const impacto_mensual = mensual.map((row: any) => ({
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

  async getDonorDashboard(donanteId: string) {
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
}
