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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
let StorageService = class StorageService {
    config;
    client;
    bucketName;
    endpoint;
    constructor(config) {
        this.config = config;
        const rawEndpoint = this.config.get('minio.endpoint') || '';
        this.endpoint = rawEndpoint;
        this.bucketName = this.config.get('minio.bucketName') || 'ecobocado-images';
        this.client = new client_s3_1.S3Client({
            endpoint: rawEndpoint,
            region: 'us-east-1',
            credentials: {
                accessKeyId: this.config.get('minio.accessKey') || '',
                secretAccessKey: this.config.get('minio.secretKey') || '',
            },
            forcePathStyle: true,
        });
        this.ensureBucket();
    }
    async ensureBucket() {
        try {
            await this.client.send(new client_s3_1.HeadBucketCommand({ Bucket: this.bucketName }));
        }
        catch {
            try {
                await this.client.send(new client_s3_1.CreateBucketCommand({ Bucket: this.bucketName }));
                const policy = JSON.stringify({
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: 'Allow',
                            Principal: { AWS: ['*'] },
                            Action: ['s3:GetBucketLocation', 's3:ListBucket'],
                            Resource: [`arn:aws:s3:::${this.bucketName}`],
                        },
                        {
                            Effect: 'Allow',
                            Principal: { AWS: ['*'] },
                            Action: ['s3:GetObject'],
                            Resource: [`arn:aws:s3:::${this.bucketName}/*`],
                        },
                    ],
                });
                await this.client.send(new client_s3_1.PutBucketPolicyCommand({ Bucket: this.bucketName, Policy: policy }));
            }
            catch (err) {
            }
        }
    }
    async uploadFile(fileBuffer, originalName, contentType) {
        const ext = originalName.split('.').pop() || 'jpg';
        const now = new Date();
        const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
        const uniqueName = `${(0, uuid_1.v4)().replace(/-/g, '')}_${ts}.${ext}`;
        await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: uniqueName,
            Body: fileBuffer,
            ContentType: contentType,
        }));
        return `${this.endpoint}/${this.bucketName}/${uniqueName}`;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map