import { PrismaClientExceptionFilterExt } from './prisma-client-exception.filter';

describe('PrismaClientExceptionFilter', () => {
    it('should be defined', () => {
        expect(new PrismaClientExceptionFilterExt()).toBeDefined();
    });
});
