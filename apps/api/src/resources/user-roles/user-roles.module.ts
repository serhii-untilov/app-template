import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../filters/http-exception/http-exception.filter';

@Module({
    imports: [PrismaModule],
    controllers: [UserRolesController],
    providers: [
        UserRolesService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class UserRolesModule {}
