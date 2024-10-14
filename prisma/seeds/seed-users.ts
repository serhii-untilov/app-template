import { PrismaClient } from '@prisma/client';
import { Seed } from './abstract/seed.abstract';

export class SeedUsers extends Seed {
    async run(prisma: PrismaClient): Promise<void> {
        const record = await prisma.user.upsert({
            where: { login: 'admin' },
            update: {},
            create: {
                login: 'admin',
                password: 'system',
                isActive: true,
            },
        });
        console.log(JSON.stringify(record));
    }
}
