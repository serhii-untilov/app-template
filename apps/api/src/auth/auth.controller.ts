import { AccessTokenGuard, RefreshTokenGuard } from '@/guards';
import { getRefreshToken, getUserId } from '@/utils';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './../resources/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: TokensDto })
    async register(@Body() user: CreateUserDto) {
        return await this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: TokensDto })
    async login(@Body() user: AuthDto) {
        return await this.authService.login(user);
    }

    @Get('logout')
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    async logout(@Req() req: Request): Promise<null> {
        const userId = getUserId(req);
        return this.authService.logout(userId);
    }

    @Get('refresh')
    @ApiBearerAuth()
    @UseGuards(RefreshTokenGuard)
    @ApiOkResponse({ type: TokensDto })
    refreshTokens(@Req() req: Request) {
        const userId = getUserId(req);
        const refreshToken = getRefreshToken(req);
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @Post('demo')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: AuthDto })
    async demo() {
        return await this.authService.demo();
    }
}
