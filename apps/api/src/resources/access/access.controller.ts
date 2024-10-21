import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { ResourceType, RoleType } from '@prisma/client';
import { Request } from 'express';
import { AccessTokenGuard } from './../../guards';
import { getUserId } from './../../utils';
import { AccessService } from './access.service';
import {
    AvailableAccessDto,
    AvailableAccessUserDto,
    CreateAccessDto,
    UpdateAccessDto,
} from './dto';
import { AccessEntity } from './entities/access.entity';

@Controller('access')
@ApiTags('access')
@ApiBearerAuth()
export class AccessController {
    constructor(private readonly service: AccessService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    @ApiCreatedResponse({ type: AccessEntity })
    async create(@Req() req: Request, @Body() payload: CreateAccessDto) {
        const userId = getUserId(req);
        await this.service.availableCreateOrFail(userId);
        return await this.service.create(userId, payload);
    }

    @Get()
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ schema: { type: 'array', items: { $ref: getSchemaPath(AccessEntity) } } })
    async findAll(
        @Req() req: Request,
        @Param('roleType') roleType: RoleType,
        @Param('resourceType') resourceType: ResourceType,
    ) {
        const userId = getUserId(req);
        await this.service.availableFindAllOrFail(userId);
        return await this.service.findAll({ roleType, resourceType });
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: AccessEntity })
    async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableFindOneOrFail(userId);
        return await this.service.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: AccessEntity })
    async update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateAccessDto,
    ) {
        const userId = getUserId(req);
        await this.service.availableUpdateOrFail(userId);
        return await this.service.update(userId, id, payload);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: AccessEntity })
    async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableDeleteOrFail(userId);
        return await this.service.remove(userId, id);
    }

    @Post('available')
    @ApiOperation({ summary: 'Check access' })
    @ApiOkResponse({ type: Boolean, description: 'Is access enabled' })
    async available(@Body() payload: AvailableAccessDto): Promise<boolean> {
        return await this.service.available(payload);
    }

    @Post('available-user')
    @ApiOkResponse({ type: Boolean, description: 'Is access enabled' })
    async availableForUser(@Req() req: Request, @Body() payload: AvailableAccessUserDto) {
        const userId = getUserId(req);
        return await this.service.availableForUser(userId, payload);
    }
}
