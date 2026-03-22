export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  projectName: process.env.PROJECT_NAME || 'EcoBocado API',

  postgres: {
    host: process.env.POSTGRES_SERVER || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || '',
  },

  mongodb: {
    uri: process.env.MONGODB_URI || '',
  },

  minio: {
    endpoint: process.env.MINIO_ENDPOINT || '',
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || '',
    bucketName: process.env.MINIO_BUCKET_NAME || 'ecobocado-images',
  },

  jwt: {
    secret: process.env.SECRET_KEY || 'secret',
    expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '1440', 10)}m`,
  },

  emailjs: {
    serviceId: process.env.EMAILJS_SERVICE_ID || '',
    templateId: process.env.EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
    privateKey: process.env.EMAILJS_PRIVATE_KEY || '',
  },

  otpExpiryMinutes: 10,
});
