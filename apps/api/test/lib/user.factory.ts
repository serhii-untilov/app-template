import { incrementalNumber, randPassword, randUser, randUuid } from '@ngneat/falso';
import { User } from '@prisma/client';

const factory = incrementalNumber();

export const createMockUser = (data?: Partial<User>): User => {
    const user = randUser();
    return {
        id: factory(),
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.email,
        password: randPassword(),
        refreshToken: randUuid(),
        isActive: true,
        language: '',
        // companies: [],
        createdAt: new Date(),
        createdUserId: null,
        updatedAt: new Date(),
        updatedUserId: null,
        deletedAt: null,
        deletedUserId: null,
        version: 1,
        ...data,
    };
};
