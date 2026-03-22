import { Repository, DataSource } from 'typeorm';
import { LoteEntity } from './entities/lote.entity';
import { LoteCreateDto, LoteUpdateDto } from './dto/lote.dto';
export declare class LotesService {
    private readonly loteRepo;
    private readonly dataSource;
    constructor(loteRepo: Repository<LoteEntity>, dataSource: DataSource);
    private toLotePublic;
    listarActivos(): Promise<any>;
    misLotes(donanteId: string): Promise<any>;
    publicarLote(donanteId: string, dto: LoteCreateDto): Promise<{
        id: any;
        donante_id: any;
        titulo: any;
        descripcion: any;
        cantidad: any;
        peso_kg: number;
        categoria: any;
        estado: any;
        fecha_caducidad: any;
        fecha_publicacion: any;
        imagen_url: any;
        reserva_id: any;
        codigo_qr_token: any;
    }>;
    actualizarLote(loteId: string, donanteId: string, dto: LoteUpdateDto): Promise<{
        id: any;
        donante_id: any;
        titulo: any;
        descripcion: any;
        cantidad: any;
        peso_kg: number;
        categoria: any;
        estado: any;
        fecha_caducidad: any;
        fecha_publicacion: any;
        imagen_url: any;
        reserva_id: any;
        codigo_qr_token: any;
    }>;
    eliminarLote(loteId: string, donanteId: string): Promise<{
        mensaje: string;
    }>;
}
