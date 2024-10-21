import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceType, RoleType } from '@prisma/client';
import { IsString } from 'class-validator';

export class FindAllAccessDto {
    @IsString()
    @Optional()
    @ApiProperty({ enum: RoleType, enumName: 'RoleType' })
    roleType?: RoleType;

    @IsString()
    @Optional()
    @ApiProperty({ enum: ResourceType, enumName: 'ResourceType' })
    resourceType?: ResourceType;
}
