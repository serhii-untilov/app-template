import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() createUserDto: CreateUserDto) {
        return new UserEntity(await this.usersService.create(createUserDto));
    }

    @Get()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll() {
        return (await this.usersService.findAll()).map((o) => new UserEntity(o));
    }

    @Get('inactive')
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findInactive() {
        return (await this.usersService.findInactive()).map((o) => new UserEntity(o));
    }

    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id') id: string) {
        return new UserEntity(await this.usersService.findOne(+id));
    }

    @Patch(':id')
    @ApiOkResponse({ type: UserEntity })
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return new UserEntity(await this.usersService.update(+id, updateUserDto));
    }

    @Delete(':id')
    @ApiOkResponse({ type: UserEntity })
    @UseInterceptors(ClassSerializerInterceptor)
    async remove(@Param('id') id: string) {
        return new UserEntity(await this.usersService.remove(+id));
    }
}
