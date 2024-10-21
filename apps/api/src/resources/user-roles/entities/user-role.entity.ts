import { ApiProperty } from '@nestjs/swagger';
import { Logger } from '../../abstract';
import { RoleType, UserRole } from '@prisma/client';

export class UserRoleEntity extends Logger implements UserRole {
    constructor(partial: Partial<UserRoleEntity>) {
        super();
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    roleType: RoleType;
}
