import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly config;
    private client;
    private bucketName;
    private endpoint;
    constructor(config: ConfigService);
    private ensureBucket;
    uploadFile(fileBuffer: Buffer, originalName: string, contentType: string): Promise<string>;
}
