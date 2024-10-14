import { PrismaClient } from '@prisma/client';

export abstract class Seed {
    abstract run(prisma: PrismaClient): void;
}
