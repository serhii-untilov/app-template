import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRolesService {
    constructor(private prisma: PrismaService) {}

    async create(createUserRoleDto: CreateUserRoleDto) {
        return await this.prisma.userRole.create({ data: createUserRoleDto });
    }

    async findAll() {
        return await this.prisma.userRole.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.userRole.findUniqueOrThrow({ where: { id } });
    }

    async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
        return await this.prisma.userRole.update({ where: { id }, data: updateUserRoleDto });
    }

    async remove(id: number) {
        return await this.prisma.userRole.delete({ where: { id } });
    }
}
