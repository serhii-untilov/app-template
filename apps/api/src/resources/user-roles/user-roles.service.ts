import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ResourceType } from '@prisma/client';
import { AvailableForUser } from '../abstract';
import { AccessService } from '../access/access.service';

@Injectable()
export class UserRolesService extends AvailableForUser {
    public readonly resourceType = ResourceType.USER;

    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
        @Inject(forwardRef(() => AccessService))
        accessService: AccessService,
    ) {
        super(accessService);
    }

    async create(userId: number | null, payload: CreateUserRoleDto) {
        return await this.prisma.userRole.create({
            data: { ...payload, createdUserId: userId, updatedUserId: userId },
        });
    }

    async findAll() {
        return await this.prisma.userRole.findMany({ where: { deletedAt: null } });
    }

    async findOne(id: number) {
        return await this.prisma.userRole.findUniqueOrThrow({ where: { id } });
    }

    async update(userId: number, id: number, payload: UpdateUserRoleDto) {
        return await this.prisma.userRole.update({
            data: { ...payload, updatedUserId: userId, version: { increment: 1 } },
            where: { id, version: payload.version, deletedAt: null },
        });
    }

    async remove(userId: number, id: number) {
        return await this.prisma.userRole.update({
            data: { deletedAt: new Date(), deletedUserId: userId, updatedUserId: userId },
            where: { id, deletedAt: null },
        });
    }

    async restore(userId: number, id: number) {
        return await this.prisma.userRole.update({
            data: { deletedAt: new Date(), deletedUserId: userId },
            where: { id, deletedAt: { not: null } },
        });
    }

    async delete(id: number) {
        return await this.prisma.userRole.delete({ where: { id, deletedAt: { not: null } } });
    }
}
