import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';

describe('AccessController', () => {
    let controller: AccessController;
    let service: DeepMockProxy<AccessService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccessController],
            providers: [AccessService],
        })
            .overrideProvider(AccessService)
            .useValue(mockDeep<AccessService>())
            .compile();

        controller = module.get<AccessController>(AccessController);
        service = module.get(AccessService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
