import { AccessType, ResourceType, RoleType } from '@prisma/client';
import { CreateAccessDto } from '../../apps/api/src/resources/access/dto/create-access.dto';

export function generateAccess_Full(
    roleType: RoleType,
    resourceType: ResourceType,
): CreateAccessDto[] {
    return [AccessType.ACCESS, AccessType.CREATE, AccessType.UPDATE, AccessType.DELETE].map(
        (key) => {
            return { roleType, resourceType, accessType: key };
        },
    );
}

export function generateAccess_ReadOnly(
    roleType: RoleType,
    resourceType: ResourceType,
): CreateAccessDto[] {
    return [{ roleType, resourceType, accessType: AccessType.ACCESS }];
}
