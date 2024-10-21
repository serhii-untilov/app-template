import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AccessType, ResourceType, RoleType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
    AvailableAccessDto,
    AvailableAccessUserDto,
    CreateAccessDto,
    UpdateAccessDto,
} from './dto';
import { FindAllAccessDto } from './dto/find-all-access.dto';

@Injectable()
export class AccessService {
    public readonly resourceType = ResourceType.ACCESS;

    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
    ) {}

    async create(userId: number, payload: CreateAccessDto) {
        return await this.prisma.access.create({
            data: { ...payload, createdUserId: userId, updatedUserId: userId },
        });
    }

    async findAll(params: FindAllAccessDto) {
        return await this.prisma.access.findMany({ where: params });
    }

    async findOne(id: number) {
        return await this.prisma.access.findUniqueOrThrow({ where: { id } });
    }

    async update(userId: number, id: number, data: UpdateAccessDto) {
        return await this.prisma.access.update({
            where: { id },
            data: {
                ...data,
                updatedUserId: userId,
            },
        });
    }

    async remove(userId: number, id: number) {
        return await this.prisma.access.update({
            where: { id },
            data: { deletedAt: new Date(), deletedUserId: userId },
        });
    }

    async restore(userId: number, id: number) {
        return await this.prisma.access.update({
            where: { id },
            data: { deletedAt: null, deletedUserId: null, updatedUserId: userId },
        });
    }

    async available(params: AvailableAccessDto): Promise<boolean> {
        const access = await this.prisma.access.findFirst({ where: params });
        return !!access;
    }

    async availableOrFail(params: AvailableAccessDto): Promise<void> {
        await this.prisma.access.findFirstOrThrow({ where: params });
    }

    async availableForUser(userId: number, params: AvailableAccessUserDto): Promise<boolean> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: {
                roles: true,
            },
        });
        const userRoles = user.roles.map((o) => o.roleType);
        const access = this.prisma.access.findFirst({
            where: { ...params, roleType: { in: userRoles } },
        });
        return !!access;
    }

    async availableForUserOrFail(userId: number, params: AvailableAccessUserDto): Promise<void> {
        const access = this.availableForUser(userId, params);
        if (!access) {
            throw new ForbiddenException('The resource is not available');
        }
    }

    canRegister(roleType: RoleType): boolean {
        return roleType === RoleType.CUSTOMER;
    }

    canOperate(parentUserRoleType: string, childUserRoleType: string) {
        const whoMadeWho = [
            // ADMIN
            { parent: RoleType.ADMIN, child: RoleType.ADMIN },
            { parent: RoleType.ADMIN, child: RoleType.MANAGER },
            { parent: RoleType.ADMIN, child: RoleType.EMPLOYEE },
            { parent: RoleType.ADMIN, child: RoleType.CUSTOMER },
            // MANAGER
            { parent: RoleType.MANAGER, child: RoleType.EMPLOYEE },
            { parent: RoleType.MANAGER, child: RoleType.CUSTOMER },
        ];
        return (
            whoMadeWho.findIndex(
                (o) => o.parent === parentUserRoleType && o.child === childUserRoleType,
            ) >= 0
        );
    }

    async availableCreateOrFail(userId: number) {
        await this.availableForUserOrFail(userId, {
            resourceType: this.resourceType,
            accessType: AccessType.CREATE,
        });
    }

    async availableFindAllOrFail(userId: number) {
        await this.availableForUserOrFail(userId, {
            resourceType: this.resourceType,
            accessType: AccessType.ACCESS,
        });
    }

    async availableFindOneOrFail(userId: number) {
        await this.availableForUserOrFail(userId, {
            resourceType: this.resourceType,
            accessType: AccessType.ACCESS,
        });
    }

    async availableUpdateOrFail(userId: number) {
        await this.availableForUserOrFail(userId, {
            resourceType: this.resourceType,
            accessType: AccessType.UPDATE,
        });
    }

    async availableDeleteOrFail(userId: number) {
        await this.availableForUserOrFail(userId, {
            resourceType: this.resourceType,
            accessType: AccessType.DELETE,
        });
    }
}
