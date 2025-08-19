import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginUserDto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });
    return { success: true };
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.authService.signup(createUserDto);
    return { success: true };
  }
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req?.cookies?.['refreshToken'];
    if (!refreshToken) {
      console.log('1');
      throw new UnauthorizedException('You must be logged in');
    }
    const { newAccessToken, newRefreshToken } =
      await this.authService.refresh(refreshToken);
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });
    return { success: true };
  }
  @Get('check-token')
  @UseGuards(AuthGuard('jwt'))
  async checkToken(@Req() req) {
    return { success: true };
  }
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req?.cookies?.['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException(
        'You have been logged out. Please log in again.',
      );
    }
    await this.authService.logout(refreshToken);
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
    });
    return { success: true, msg: 'Logged out successfully' };
  }
}
