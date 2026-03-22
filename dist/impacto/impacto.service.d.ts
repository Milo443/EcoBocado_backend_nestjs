import { DataSource } from 'typeorm';
import { Model } from 'mongoose';
import { ImpactoEventoDocument } from './schemas/impacto-evento.schema';
export declare class ImpactoService {
    private readonly dataSource;
    private readonly impactoEventoModel;
    constructor(dataSource: DataSource, impactoEventoModel: Model<ImpactoEventoDocument>);
    getGlobalImpact(): Promise<{
        total_rescatado_kg: number;
        personas_ayudadas: number;
        aliados_red: number;
        co2_mitigado_kg: number;
        impacto_por_categoria: Record<string, number>;
        impacto_mensual: any;
    }>;
    getDonorDashboard(donanteId: string): Promise<{
        peso_rescatado_kg: number;
        lotes_activos: number;
        entregas_hoy: number;
    }>;
}
