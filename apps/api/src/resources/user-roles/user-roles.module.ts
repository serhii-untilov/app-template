import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AccessModule } from '../access';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

@Module({
    imports: [forwardRef(() => PrismaModule), AccessModule],
    controllers: [UserRolesController],
    providers: [
        UserRolesService,
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
    ],
    exports: [UserRolesService],
})
export class UserRolesModule {}
