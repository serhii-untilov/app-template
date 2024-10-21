import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    login: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ enum: RoleType, enumName: 'RoleType' })
    roleType: RoleType;

    @IsString()
    @IsOptional()
    @MaxLength(30)
    @ApiPropertyOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(30)
    @ApiPropertyOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(5)
    @ApiPropertyOptional()
    language?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ default: false })
    isActive?: boolean;
}
