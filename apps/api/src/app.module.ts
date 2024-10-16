import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig, authConfig, googleConfig } from './config';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { UsersModule } from './resources/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env', '.env.development', '.env.production'],
            ignoreEnvVars: true,
            // ignoreEnvFile: true,
            load: [appConfig, authConfig, googleConfig],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../..', 'web', 'dist'),
            exclude: ['/api/(.*)'],
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorsInterceptor,
        },
    ],
})
export class AppModule {}
