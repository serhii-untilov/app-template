import { ApiProperty } from '@nestjs/swagger';
import { Role, UserRole } from '@prisma/client';

export class UserRoleEntity implements UserRole {
    constructor(partial: Partial<UserRoleEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    role: Role;
}
