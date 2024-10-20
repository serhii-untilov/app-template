import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, HttpAdapterHost } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { join } from 'path';
import 'reflect-metadata';
import { appConfig, authConfig, googleConfig } from './config';
import { UsersModule } from './resources/users/users.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { UserRolesModule } from './resources/user-roles/user-roles.module';
import { AuthModule } from './auth/auth.module';

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
        UserRolesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_FILTER,
            useFactory: ({ httpAdapter }: HttpAdapterHost) => {
                return new PrismaClientExceptionFilter(httpAdapter);
            },
            inject: [HttpAdapterHost],
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
