import { PrismaClient } from '@prisma/client';
import { SeedUsers } from './seed-users';
import { SeedAccess } from './seed-access';

const isLogging = false;
const seeds = [
    // Add the new seeds here, at the end of the list
    new SeedUsers(),
    new SeedAccess(),
];

async function main() {
    // initialize Prisma Client
    const prisma = new PrismaClient();
    for (const seed of seeds) {
        seed.run({ prisma, isLogging }).catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });
    }
    console.log('Database seeding was completed successfully.');
    // close Prisma Client at the end
    await prisma.$disconnect();
}

main();
