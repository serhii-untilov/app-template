import { ResourceType, RoleType } from '@prisma/client';
import { generateAccess_Full, generateAccess_ReadOnly } from './helpers';
import { Seed, SeedParams } from './seed.abstract';

const seeds = [
    // ADMIN
    ...generateAccess_ReadOnly(RoleType.ADMIN, ResourceType.ACCESS),
    ...generateAccess_Full(RoleType.ADMIN, ResourceType.ROLE),
    ...generateAccess_Full(RoleType.ADMIN, ResourceType.USER),
    ...generateAccess_ReadOnly(RoleType.ADMIN, ResourceType.DEMO),

    // MANAGER
    ...generateAccess_ReadOnly(RoleType.MANAGER, ResourceType.ROLE),
    ...generateAccess_Full(RoleType.MANAGER, ResourceType.USER),
    ...generateAccess_ReadOnly(RoleType.MANAGER, ResourceType.DEMO),

    // EMPLOYEE
    ...generateAccess_ReadOnly(RoleType.EMPLOYEE, ResourceType.USER),
    ...generateAccess_ReadOnly(RoleType.EMPLOYEE, ResourceType.DEMO),

    // CUSTOMER
    ...generateAccess_ReadOnly(RoleType.CUSTOMER, ResourceType.USER),
    ...generateAccess_ReadOnly(RoleType.CUSTOMER, ResourceType.DEMO),
];

export class SeedAccess extends Seed {
    async run(params: SeedParams): Promise<void> {
        Promise.all(
            seeds.map((o) => {
                return new Promise((resolve, reject) => {
                    const seed = async () => {
                        await params.prisma.access.upsert({
                            where: {
                                roleType_resourceType_accessType: {
                                    roleType: o.roleType,
                                    resourceType: o.resourceType,
                                    accessType: o.accessType,
                                },
                            },
                            update: {},
                            create: {
                                roleType: o.roleType,
                                resourceType: o.resourceType,
                                accessType: o.accessType,
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
