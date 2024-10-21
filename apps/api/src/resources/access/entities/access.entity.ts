import { ApiProperty } from '@nestjs/swagger';
import { AccessType, ResourceType, RoleType } from '@prisma/client';

export class AccessEntity {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: RoleType, enumName: 'RoleType' })
    roleType: RoleType;

    @ApiProperty({ enum: ResourceType, enumName: 'ResourceType' })
    resourceType: ResourceType;

    @ApiProperty({ enum: AccessType, enumName: 'AccessType' })
    accessType: AccessType;
}
