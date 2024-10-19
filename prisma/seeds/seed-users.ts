import { Role } from '@prisma/client';
import { Seed, SeedParams } from './seed.abstract';

export class SeedUsers extends Seed {
    async run(params: SeedParams): Promise<void> {
        await params.prisma.user.upsert({
            where: { login: 'admin' },
            update: {},
            create: {
                login: 'admin',
                password: 'admin',
                isActive: true,
                roles: {
                    create: [{ role: Role.ADMIN }],
                },
            },
        });
        await params.prisma.user.upsert({
            where: { login: 'manager' },
            update: {},
            create: {
                login: 'manager',
                password: 'manager',
                isActive: true,
                roles: {
                    create: [{ role: Role.MANAGER }],
                },
            },
        });
        await params.prisma.user.upsert({
            where: { login: 'employee' },
            update: {},
            create: {
                login: 'employee',
                password: 'employee',
                isActive: true,
                roles: {
                    create: [{ role: Role.EMPLOYEE }],
                },
            },
        });
        await params.prisma.user.upsert({
            where: { login: 'customer' },
            update: {},
            create: {
                login: 'customer',
                password: 'customer',
                isActive: true,
                roles: {
                    create: [{ role: Role.CUSTOMER }],
                },
            },
        });
    }
}
