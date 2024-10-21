import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
    // @IsEmail()
    @IsString()
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
