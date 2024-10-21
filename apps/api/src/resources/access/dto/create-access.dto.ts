import { ApiProperty } from '@nestjs/swagger';
import { AccessType, ResourceType, RoleType } from '@prisma/client';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAccessDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ enum: RoleType, enumName: 'RoleType' })
    roleType: RoleType;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ enum: ResourceType, enumName: 'ResourceType' })
    resourceType: ResourceType;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ enum: AccessType, enumName: 'AccessType' })
    accessType: AccessType;
}
