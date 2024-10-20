import { forwardRef, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../filters/http-exception/http-exception.filter';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

@Module({
    imports: [forwardRef(() => PrismaModule)],
    controllers: [UserRolesController],
    providers: [
        UserRolesService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
    exports: [UserRolesService],
})
export class UserRolesModule {}
