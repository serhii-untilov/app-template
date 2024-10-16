import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;

    @ApiPropertyOptional()
    firstName?: string;

    @ApiPropertyOptional()
    lastName?: string;

    @ApiPropertyOptional()
    language?: string;

    @ApiPropertyOptional({ default: false })
    isActive?: boolean;
}
