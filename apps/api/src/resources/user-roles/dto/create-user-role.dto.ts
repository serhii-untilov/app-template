import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserRoleDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    role: Role;
}
