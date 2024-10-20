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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from '../../guards';
import { getUserId } from '../../utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
        const userId = getUserId(req);
        await this.service.availableCreateOrFail(userId);
        return new UserEntity(await this.service.create(userId, createUserDto));
    }

    @Get()
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll(@Req() req: Request) {
        const userId = getUserId(req);
        await this.service.availableFindAllOrFail(userId);
        return (await this.service.findAll()).map((o) => new UserEntity(o));
    }

    @Get('inactive')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findInactive(@Req() req: Request) {
        const userId = getUserId(req);
        await this.service.availableFindAllOrFail(userId);
        return (await this.service.findInactive()).map((o) => new UserEntity(o));
    }

    @Get('removed')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findRemoved(@Req() req: Request) {
        const userId = getUserId(req);
        await this.service.availableFindAllOrFail(userId);
        return (await this.service.findRemoved()).map((o) => new UserEntity(o));
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableFindOneOrFail(userId);
        return new UserEntity(await this.service.findOne(id));
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity })
    async update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const userId = getUserId(req);
        await this.service.availableUpdateOrFail(userId);
        return new UserEntity(await this.service.update(userId, id, updateUserDto));
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity })
    async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableDeleteOrFail(userId);
        return new UserEntity(await this.service.remove(userId, id));
    }

    @Get(':id/restore')
    @UseGuards(AccessTokenGuard)
    @ApiOkResponse({ type: UserEntity })
    async restore(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = getUserId(req);
        await this.service.availableDeleteOrFail(userId);
        return new UserEntity(await this.service.restore(userId, id));
    }
}
