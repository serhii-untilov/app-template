import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Logger } from '../../abstract';

export class UserEntity extends Logger implements User {
    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    login: string;

    @ApiHideProperty()
    @Exclude()
    password: string;

    @ApiProperty()
    roles: Partial<UserRole>[];

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    language: string;

    @ApiHideProperty()
    @Exclude()
    refreshToken: string;

    @ApiProperty()
    isActive: boolean;
}
