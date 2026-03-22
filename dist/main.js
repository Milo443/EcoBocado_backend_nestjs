"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('EcoBocado API')
        .setDescription('API para EcoBocado refactorizada')
        .setVersion('2.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce tu JWT Bearer Token (obtenido en /api/v1/usuarios/login-otp/verify)',
    }, 'HTTPBearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 EcoBocado NestJS API corriendo en: http://localhost:${port}`);
    console.log(`📖 Swagger UI disponible en:          http://localhost:${port}/docs`);
    console.log(`🌿 FastAPI (referencia) sigue en:     http://localhost:8000/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map