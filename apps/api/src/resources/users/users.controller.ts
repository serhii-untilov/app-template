import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() createUserDto: CreateUserDto) {
        return new UserEntity(await this.usersService.create(createUserDto));
    }

    @Get()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll() {
        return (await this.usersService.findAll()).map((o) => new UserEntity(o));
    }

    @Get('inactive')
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findInactive() {
        return (await this.usersService.findInactive()).map((o) => new UserEntity(o));
    }

    @Get('removed')
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findRemoved() {
        return (await this.usersService.findRemoved()).map((o) => new UserEntity(o));
    }

    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.usersService.findOne(id));
    }

    @Patch(':id')
    @ApiOkResponse({ type: UserEntity })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return new UserEntity(await this.usersService.update(id, updateUserDto));
    }

    @Delete(':id')
    @ApiOkResponse({ type: UserEntity })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.usersService.remove(id));
    }

    @Get(':id/restore')
    @ApiOkResponse({ type: UserEntity })
    async restore(@Param('id', ParseIntPipe) id: number) {
        return new UserEntity(await this.usersService.restore(id));
    }
}
