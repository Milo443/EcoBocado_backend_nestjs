import { Document } from 'mongoose';
export type ImpactoEventoDocument = ImpactoEvento & Document;
export declare class ImpactoEvento {
    tipo: string;
    donante_id: string;
    receptor_id: string;
    lote_id: string;
    peso_kg: number;
    co2_kg: number;
    fecha: Date;
}
export declare const ImpactoEventoSchema: import("mongoose").Schema<ImpactoEvento, import("mongoose").Model<ImpactoEvento, any, any, any, (Document<unknown, any, ImpactoEvento, any, import("mongoose").DefaultSchemaOptions> & ImpactoEvento & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, ImpactoEvento, any, import("mongoose").DefaultSchemaOptions> & ImpactoEvento & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, ImpactoEvento>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tipo?: import("mongoose").SchemaDefinitionProperty<string, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    donante_id?: import("mongoose").SchemaDefinitionProperty<string, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    receptor_id?: import("mongoose").SchemaDefinitionProperty<string, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    lote_id?: import("mongoose").SchemaDefinitionProperty<string, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    peso_kg?: import("mongoose").SchemaDefinitionProperty<number, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    co2_kg?: import("mongoose").SchemaDefinitionProperty<number, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fecha?: import("mongoose").SchemaDefinitionProperty<Date, ImpactoEvento, Document<unknown, {}, ImpactoEvento, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactoEvento & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ImpactoEvento>;
