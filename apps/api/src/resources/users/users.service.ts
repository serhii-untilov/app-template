import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({ data: createUserDto });
    }

    async findAll() {
        return await this.prisma.user.findMany({ where: { isActive: true } });
    }

    async findInactive() {
        return await this.prisma.user.findMany({ where: { isActive: false } });
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({ where: { id }, data: updateUserDto });
    }

    async remove(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }
}
