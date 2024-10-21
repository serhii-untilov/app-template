import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserRoleDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ enum: RoleType, enumName: 'RoleType' })
    roleType: RoleType;
}
