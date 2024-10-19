import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    login: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    password: string;

    // @IsArray()
    // @ArrayNotEmpty()
    // @ApiProperty()
    // roles: Role[];

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
