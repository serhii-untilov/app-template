import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AccessModule } from '../access/access.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [forwardRef(() => PrismaModule), forwardRef(() => AccessModule)],
    controllers: [UsersController],
    providers: [
        UsersService,
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
    ],
    exports: [UsersService],
})
export class UsersModule {}
