import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';

describe('UserRolesController', () => {
    let controller: UserRolesController;
    let service: DeepMockProxy<UserRolesService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserRolesController],
            providers: [UserRolesService],
        })
            .overrideProvider(UserRolesService)
            .useValue(mockDeep<UserRolesService>())
            .compile();

        controller = module.get<UserRolesController>(UserRolesController);
        service = module.get(UserRolesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    it('returns user roles', () => {
        const testUserRoles = [];
        service.findAll.mockResolvedValueOnce(testUserRoles);
        expect(service.findAll()).resolves.toBe(testUserRoles);
    });
});
