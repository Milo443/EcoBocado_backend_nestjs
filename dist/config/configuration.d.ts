declare const _default: () => {
    port: number;
    nodeEnv: string;
    projectName: string;
    postgres: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    mongodb: {
        uri: string;
    };
    minio: {
        endpoint: string;
        accessKey: string;
        secretKey: string;
        bucketName: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    emailjs: {
        serviceId: string;
        templateId: string;
        publicKey: string;
        privateKey: string;
    };
    otpExpiryMinutes: number;
};
export default _default;
