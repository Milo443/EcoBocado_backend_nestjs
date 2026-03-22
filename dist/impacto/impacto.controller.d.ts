import { ImpactoService } from './impacto.service';
export declare class ImpactoController {
    private readonly impactoService;
    constructor(impactoService: ImpactoService);
    impactoGlobal(): Promise<{
        total_rescatado_kg: number;
        personas_ayudadas: number;
        aliados_red: number;
        co2_mitigado_kg: number;
        impacto_por_categoria: Record<string, number>;
        impacto_mensual: any;
    }>;
    dashboardDonante(user: any): Promise<{
        peso_rescatado_kg: number;
        lotes_activos: number;
        entregas_hoy: number;
    }>;
}
