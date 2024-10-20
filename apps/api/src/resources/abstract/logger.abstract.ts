import { ApiProperty } from '@nestjs/swagger';

export abstract class Logger {
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdUserId: number | null;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    updatedUserId: number | null;

    @ApiProperty()
    deletedAt: Date | null;

    @ApiProperty()
    deletedUserId: number | null;

    @ApiProperty()
    version: number;
}
