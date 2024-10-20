import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class AuthDto {
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

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ default: false })
    rememberMe?: boolean;
}
