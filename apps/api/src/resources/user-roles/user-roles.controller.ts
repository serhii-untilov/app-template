import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserRolesService } from './user-roles.service';

@Controller('user-roles')
@ApiTags('user-roles')
export class UserRolesController {
    constructor(private readonly userRolesService: UserRolesService) {}

    @Post()
    @ApiCreatedResponse({ type: UserRoleEntity })
    create(@Body() createUserRoleDto: CreateUserRoleDto) {
        return this.userRolesService.create(createUserRoleDto);
    }

    @Get()
    @ApiOkResponse({ type: UserRoleEntity, isArray: true })
    findAll() {
        return this.userRolesService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: UserRoleEntity })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userRolesService.findOne(id);
    }

    @Patch(':id')
    @ApiOkResponse({ type: UserRoleEntity })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
        return this.userRolesService.update(id, updateUserRoleDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: UserRoleEntity })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userRolesService.remove(id);
    }
}
