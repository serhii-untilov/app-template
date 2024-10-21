import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { ResourceType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AvailableForUser } from '../abstract';
import { AccessService } from '../access/access.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindFirstUserDto } from './dto/find-first-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends AvailableForUser {
    public readonly resourceType = ResourceType.USER;

    constructor(
        @Inject(forwardRef(() => AccessService))
        accessService: AccessService,
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
    ) {
        super(accessService);
    }

    async create(userId: number | null, payload: CreateUserDto) {
        const { roleType, ...data } = payload;
        if (!this.accessService.canRegister(roleType)) {
            throw new BadRequestException(`An invalid role for user registration.`);
        }
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: { ...data, createdUserId: userId, updatedUserId: userId },
            });
            await tx.userRole.create({
                data: { userId: user.id, roleType, createdUserId: user.id, updatedUserId: user.id },
            });
            return user;
        });
    }

    async findAll() {
        return await this.prisma.user.findMany({
            include: {
                roles: { select: { roleType: true } },
            },
            where: { isActive: true, deletedAt: null },
        });
    }

    async findInactive() {
        return await this.prisma.user.findMany({
            include: {
                roles: { select: { roleType: true } },
            },
            where: { isActive: false, deletedAt: null },
        });
    }

    async findRemoved() {
        return await this.prisma.user.findMany({
            include: {
                roles: { select: { roleType: true } },
            },
            where: { NOT: { deletedAt: null } },
        });
    }

    async findOne(id: number) {
        return await this.prisma.user.findUniqueOrThrow({
            include: {
                roles: true,
            },
            where: { id },
        });
    }

    async findFirst(params: FindFirstUserDto) {
        return await this.prisma.user.findFirst({
            include: {
                roles: true,
            },
            where: params,
        });
    }

    async update(userId: number, id: number, payload: UpdateUserDto) {
        return await this.prisma.user.update({
            data: { ...payload, updatedUserId: userId, version: { increment: 1 } },
            where: { id, version: payload.version },
        });
    }

    async updateRefreshToken(userId: number, refreshToken: string | null) {
        return await this.prisma.user.update({
            data: { refreshToken, version: { increment: 1 } },
            where: { id: userId },
        });
    }

    async remove(userId: number, id: number) {
        return await this.prisma.user.update({
            data: { deletedAt: new Date(), deletedUserId: userId },
            where: { id, deletedAt: null },
        });
    }

    async restore(userId: number, id: number) {
        return await this.prisma.user.update({
            data: { deletedAt: null, deletedUserId: null, updatedUserId: userId },
            where: { id, deletedAt: { not: null } },
        });
    }

    async delete(id: number) {
        return await this.prisma.user.delete({ where: { id, deletedAt: { not: null } } });
    }
}
