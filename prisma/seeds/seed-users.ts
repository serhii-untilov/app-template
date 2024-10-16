import { Seed, SeedParams } from './seed.abstract';

const records = [
    {
        where: { login: 'admin' },
        update: {},
        create: {
            login: 'admin',
            password: 'system',
            isActive: true,
        },
    },
    {
        where: { login: 'user' },
        update: {},
        create: {
            login: 'user',
            password: 'user',
            isActive: true,
        },
    },
];

export class SeedUsers extends Seed {
    async run(params: SeedParams): Promise<void> {
        for (const record of records) {
            const result = await params.prisma.user.upsert(record);
            if (params.isLogging) {
                console.log(JSON.stringify(result));
            }
        }
    }
}
