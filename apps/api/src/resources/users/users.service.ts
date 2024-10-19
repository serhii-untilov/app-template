import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({ data: createUserDto });
    }

    async findAll() {
        return await this.prisma.user.findMany({
            where: { isActive: true, deletedAt: null },
            include: {
                roles: { select: { role: true } },
            },
        });
    }

    async findInactive() {
        return await this.prisma.user.findMany({
            where: { isActive: false, deletedAt: null },
            include: {
                roles: { select: { role: true } },
            },
        });
    }

    async findRemoved() {
        return await this.prisma.user.findMany({
            where: { NOT: { deletedAt: null } },
            include: {
                roles: { select: { role: true } },
            },
        });
    }

    async findOne(id: number) {
        return await this.prisma.user.findUniqueOrThrow({
            where: { id },
            include: {
                roles: true,
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({ where: { id }, data: updateUserDto });
    }

    async remove(id: number) {
        return await this.prisma.user.update({
            where: { id, deletedAt: null },
            data: { deletedAt: new Date() },
        });
    }

    async restore(id: number) {
        return await this.prisma.user.update({
            where: { id, deletedAt: { not: null } },
            data: { deletedAt: null },
        });
    }

    async delete(id: number) {
        return await this.prisma.user.delete({ where: { id, deletedAt: { not: null } } });
    }
}
