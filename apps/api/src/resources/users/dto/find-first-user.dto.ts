import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class FindFirstUserDto {
    @IsNumber()
    @Optional()
    @ApiProperty()
    id?: number;

    @IsEmail()
    @Optional()
    @ApiProperty()
    login?: string;
}
