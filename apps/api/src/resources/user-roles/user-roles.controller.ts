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
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserRolesService } from './user-roles.service';
import { AccessTokenGuard } from '../../guards';
import { getUserId } from '../../utils';
import { Request } from 'express';

@Controller('user-roles')
@ApiTags('user-roles')
@ApiBearerAuth()
export class UserRolesController {
    constructor(private readonly service: UserRolesService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    @ApiCreatedResponse({ type: UserRoleEntity })
    async create(@Req() req: Request, @Body() createUserRoleDto: CreateUserRoleDto) {
        const userId = getUserId(req);
        await this.service.availableCreateOrFail(userId);
        return this.service.create(userId, createUserRoleDto);
    }

    @Get()
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserRoleEntity, isArray: true })
    async findAll(@Req() req: Request) {
        const userId = getUserId(req);
        await this.service.availableFindAllOrFail(userId);
        return this.service.findAll();
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserRoleEntity })
    async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableFindOneOrFail(userId);
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOkResponse({ type: UserRoleEntity })
    async update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserRoleDto: UpdateUserRoleDto,
    ) {
        const userId = getUserId(req);
        await this.service.availableUpdateOrFail(userId);
        return this.service.update(userId, id, updateUserRoleDto);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserRoleEntity })
    async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableDeleteOrFail(userId);
        return this.service.remove(userId, id);
    }

    @Get(':id/restore')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserRoleEntity })
    async restore(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableDeleteOrFail(userId);
        return this.service.restore(userId, id);
    }
}
