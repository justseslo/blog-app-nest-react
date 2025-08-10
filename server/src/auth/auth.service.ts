import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokensService } from 'src/refresh-tokens/refresh-tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { compare, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const compared = await compare(loginUserDto.password, user.password);
    if (!compared) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const refreshToken = uuidv4();
    const payload: IJwtPayload = {
      role: user.role,
      userId: user._id as string,
    };
    const accessToken = this.jwtService.sign(payload);
    await this.refreshTokensService.create({
      role: user.role,
      token: refreshToken,
      userId: user._id as string,
    });
    return { accessToken, refreshToken };
  }
  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await hash(createUserDto.password, 10);
    await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}
