import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException,
    forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './../resources/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { TokensDto } from './dto/tokens.dto';
import { UsersService } from '../resources/users/users.service';
import { AccessService } from '../resources/access/access.service';
import { AccessType, ResourceType, RoleType } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        @Inject(forwardRef(() => JwtService))
        private jwtService: JwtService,
        @Inject(forwardRef(() => ConfigService))
        private configService: ConfigService,
        @Inject(forwardRef(() => AccessService))
        private accessService: AccessService,
    ) {}

    async register(user: CreateUserDto) {
        const exists = await this.usersService.findFirst({ login: user.login });
        if (exists) {
            throw new HttpException(`User '${user.login}' already exists`, HttpStatus.CONFLICT);
        }
        const { password } = user;
        const hashedPassword = await this.hashData(password);
        const newUser = await this.usersService.create(null, {
            ...user,
            password: hashedPassword,
        });
        const tokens = await this.getTokens(newUser.id, newUser.login);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return tokens;
    }

    async login(auth: AuthDto) {
        const user = await this.usersService.findFirst({ login: auth.login });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        if (!(await bcrypt.compare(auth.password, user.password))) {
            throw new UnauthorizedException('Password is incorrect');
        }
        const tokens = await this.getTokens(user.id, user.login, !auth.rememberMe);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async logout(userId: number): Promise<null> {
        this.usersService.updateRefreshToken(userId, null);
        return null;
    }

    async hashData(data: string) {
        return await bcrypt.hash(data, 10);
    }

    async updateRefreshToken(userId: number, refreshToken: string | null) {
        const hashedRefreshToken = refreshToken ? await this.hashData(refreshToken) : null;
        return await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
    }

    async getTokens(userId: number, email: string, skipRefreshToken?: boolean): Promise<TokensDto> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email: email,
                },
                {
                    secret: this.configService.get<string>('auth.accessSecret'),
                    expiresIn: this.configService.get<string>('auth.accessExpiration'),
                },
            ),
            skipRefreshToken
                ? Promise.resolve(null)
                : this.jwtService.signAsync(
                      {
                          sub: userId,
                          email: email,
                      },
                      {
                          secret: this.configService.get<string>('auth.refreshSecret'),
                          expiresIn: this.configService.get<string>('auth.refreshExpiration'),
                      },
                  ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findFirst({ id: userId });
        if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');
        // const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.login);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async demo(): Promise<AuthDto> {
        await this.accessService.availableOrFail({
            roleType: RoleType.MANAGER,
            resourceType: ResourceType.DEMO,
            accessType: AccessType.ACCESS,
        });
        if (process.env['DEMO_AVAILABLE'] === 'true') {
            return {
                login: process.env['DEMO_LOGIN'] || '',
                password: process.env['DEMO_PASSWORD'] || '',
                rememberMe: true,
            };
        }
        return {
            login: '',
            password: '',
            rememberMe: false,
        };
    }
}
