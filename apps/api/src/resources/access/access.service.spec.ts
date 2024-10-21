import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientExtended } from '@repo/prisma-client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../prisma/prisma.service';
import { AccessService } from './access.service';

describe('AccessService', () => {
    let service: AccessService;
    let prisma: DeepMockProxy<PrismaClientExtended>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AccessService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClientExtended>())
            .compile();

        service = module.get<AccessService>(AccessService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(prisma).toBeTruthy();
    });
});
