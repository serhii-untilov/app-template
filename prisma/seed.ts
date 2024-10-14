import { PrismaClient } from '@prisma/client';
import { SeedUsers } from './seeds/seed-users';

const seeds = [new SeedUsers()];

async function main() {
    // initialize Prisma Client
    const prisma = new PrismaClient();
    for (let n = 0; n < seeds.length; n++) {
        seeds[n].run(prisma).catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });
    }
    console.log('Seed database finished successfully.');
    // close Prisma Client at the end
    await prisma.$disconnect();
}

main();
