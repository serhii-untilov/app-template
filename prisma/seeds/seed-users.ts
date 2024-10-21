import { RoleType } from '@prisma/client';
import { Seed, SeedParams } from './seed.abstract';
import * as bcrypt from 'bcrypt';

const seeds = [
    { login: 'admin', roleType: RoleType.ADMIN },
    { login: 'manager', roleType: RoleType.MANAGER },
    { login: 'employee', roleType: RoleType.EMPLOYEE },
    { login: 'customer', roleType: RoleType.CUSTOMER },
];

export class SeedUsers extends Seed {
    async run(params: SeedParams): Promise<void> {
        Promise.all(
            seeds.map((o) => {
                return new Promise((resolve, reject) => {
                    const seed = async () => {
                        const hash = await bcrypt.hash(o.login, 10);
                        await params.prisma.user.upsert({
                            where: { login: o.login },
                            update: {},
                            create: {
                                login: o.login,
                                password: hash,
                                isActive: true,
                                roles: {
                                    create: [{ roleType: o.roleType }],
                                },
                            },
                        });
                    };
                    try {
                        seed();
                        resolve(true);
                    } catch (e) {
                        reject(e);
                    }
                });
            }),
        );
    }
}
