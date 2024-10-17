import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: DeepMockProxy<UsersService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockDeep<UsersService>())
            .compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    it('returns users', () => {
        const testUsers = [];
        service.findAll.mockResolvedValueOnce(testUsers);
        expect(service.findAll()).resolves.toBe(testUsers);
    });
});
