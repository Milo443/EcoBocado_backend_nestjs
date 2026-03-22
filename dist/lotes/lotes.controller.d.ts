import { LotesService } from './lotes.service';
import { LoteCreateDto, LoteUpdateDto } from './dto/lote.dto';
import { StorageService } from '../storage/storage.service';
export declare class LotesController {
    private readonly lotesService;
    private readonly storageService;
    constructor(lotesService: LotesService, storageService: StorageService);
    listarActivos(): Promise<any>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    publicarLote(user: any, dto: LoteCreateDto): Promise<{
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
    misLotes(user: any): Promise<any>;
    eliminarLote(loteId: string, user: any): Promise<{
        mensaje: string;
    }>;
    actualizarLote(loteId: string, user: any, dto: LoteUpdateDto): Promise<{
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
}
