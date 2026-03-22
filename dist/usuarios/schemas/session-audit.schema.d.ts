import { Document } from 'mongoose';
export type SessionAuditDocument = SessionAudit & Document;
export declare class SessionAudit {
    usuario_id: string;
    email: string;
    ip_address: string;
    user_agent: string;
    fecha_inicio: Date;
}
export declare const SessionAuditSchema: import("mongoose").Schema<SessionAudit, import("mongoose").Model<SessionAudit, any, any, any, (Document<unknown, any, SessionAudit, any, import("mongoose").DefaultSchemaOptions> & SessionAudit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, SessionAudit, any, import("mongoose").DefaultSchemaOptions> & SessionAudit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, SessionAudit>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SessionAudit, Document<unknown, {}, SessionAudit, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<SessionAudit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    usuario_id?: import("mongoose").SchemaDefinitionProperty<string, SessionAudit, Document<unknown, {}, SessionAudit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SessionAudit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, SessionAudit, Document<unknown, {}, SessionAudit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SessionAudit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ip_address?: import("mongoose").SchemaDefinitionProperty<string, SessionAudit, Document<unknown, {}, SessionAudit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SessionAudit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user_agent?: import("mongoose").SchemaDefinitionProperty<string, SessionAudit, Document<unknown, {}, SessionAudit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SessionAudit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fecha_inicio?: import("mongoose").SchemaDefinitionProperty<Date, SessionAudit, Document<unknown, {}, SessionAudit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SessionAudit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, SessionAudit>;
