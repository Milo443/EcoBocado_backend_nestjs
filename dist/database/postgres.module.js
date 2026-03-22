"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const otp_entity_1 = require("../usuarios/entities/otp.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const reserva_entity_1 = require("../reservas/entities/reserva.entity");
let PostgresModule = class PostgresModule {
};
exports.PostgresModule = PostgresModule;
exports.PostgresModule = PostgresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('postgres.host'),
                    port: config.get('postgres.port'),
                    username: config.get('postgres.username'),
                    password: config.get('postgres.password'),
                    database: config.get('postgres.database'),
                    entities: [usuario_entity_1.UsuarioEntity, otp_entity_1.OtpEntity, lote_entity_1.LoteEntity, reserva_entity_1.ReservaEntity],
                    synchronize: false,
                    logging: true,
                    ssl: false,
                    extra: { ssl: false },
                }),
            }),
        ],
    })
], PostgresModule);
//# sourceMappingURL=postgres.module.js.map