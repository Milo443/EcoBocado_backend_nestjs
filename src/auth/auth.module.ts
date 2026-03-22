import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const minutesStr = config.get<string>('jwt.expiresIn') ?? '1440m';
        const minutes = parseInt(minutesStr, 10);
        const expiresIn = isNaN(minutes) ? 86400 : minutes * 60; // seconds
        return {
          secret: config.get<string>('jwt.secret') ?? 'secret_fallback',
          signOptions: { expiresIn },
        };
      },
    }),
    ConfigModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
