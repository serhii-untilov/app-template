import { PrismaClient } from '@prisma/client';

export type SeedParams = {
    prisma: PrismaClient;
    isLogging: boolean;
};

export abstract class Seed {
    abstract run(params: SeedParams): void;
}
