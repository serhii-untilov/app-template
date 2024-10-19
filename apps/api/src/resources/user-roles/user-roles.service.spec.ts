import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from './user-roles.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClientExtended } from '@repo/prisma-client';
import { PrismaService } from 'nestjs-prisma';

describe('UserRolesService', () => {
    let service: UserRolesService;
    let prisma: DeepMockProxy<PrismaClientExtended>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserRolesService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClientExtended>())
            .compile();

        service = module.get<UserRolesService>(UserRolesService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(prisma).toBeDefined();
    });

    it('returns user roles', () => {
        const testUserRoles = [];
        prisma.userRole.findMany.mockResolvedValueOnce(testUserRoles);
        expect(service.findAll()).resolves.toBe(testUserRoles);
    });
});
