import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientExtended } from '@repo/prisma-client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';
import { AccessService } from '../access';
import { createMock } from '@golevelup/ts-jest';

describe('UsersService', () => {
    let service: UsersService;
    let prisma: DeepMockProxy<PrismaClientExtended>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                PrismaService,
                { provide: AccessService, useValue: createMock<AccessService>() },
            ],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClientExtended>())
            .compile();

        service = module.get<UsersService>(UsersService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(prisma).toBeDefined();
    });

    it('returns users', () => {
        const testUsers = [];
        prisma.user.findMany.mockResolvedValueOnce(testUsers);
        expect(service.findAll()).resolves.toBe(testUsers);
    });
});
