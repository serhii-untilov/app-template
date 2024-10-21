import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';

@Module({
    imports: [forwardRef(() => PrismaModule)],
    controllers: [AccessController],
    providers: [AccessService],
    exports: [AccessService],
})
export class AccessModule {}
