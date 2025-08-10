import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';

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
}
