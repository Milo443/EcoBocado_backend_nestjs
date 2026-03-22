import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private client: S3Client;
  private bucketName: string;
  private endpoint: string;

  constructor(private readonly config: ConfigService) {
    const rawEndpoint = this.config.get<string>('minio.endpoint') || '';
    this.endpoint = rawEndpoint;
    this.bucketName = this.config.get<string>('minio.bucketName') || 'ecobocado-images';

    this.client = new S3Client({
      endpoint: rawEndpoint,
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.config.get<string>('minio.accessKey') || '',
        secretAccessKey: this.config.get<string>('minio.secretKey') || '',
      },
      forcePathStyle: true,
    });

    this.ensureBucket();
  }

  private async ensureBucket(): Promise<void> {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucketName }));
    } catch {
      try {
        await this.client.send(new CreateBucketCommand({ Bucket: this.bucketName }));
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
        await this.client.send(
          new PutBucketPolicyCommand({ Bucket: this.bucketName, Policy: policy }),
        );
      } catch (err) {
        // Ignore - bucket may already exist
      }
    }
  }

  async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    contentType: string,
  ): Promise<string> {
    const ext = originalName.split('.').pop() || 'jpg';
    const now = new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    const uniqueName = `${uuidv4().replace(/-/g, '')}_${ts}.${ext}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueName,
        Body: fileBuffer,
        ContentType: contentType,
      }),
    );

    return `${this.endpoint}/${this.bucketName}/${uniqueName}`;
  }
}
