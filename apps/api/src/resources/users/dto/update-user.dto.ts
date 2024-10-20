import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['roleType'])) {
    @IsNumber()
    @ApiProperty({ type: Number })
    version: number;
}
