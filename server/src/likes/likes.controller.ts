import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { IJwtPayload } from 'src/auth/types/jwt-payload.interface';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post(':blogId')
  @UseGuards(AuthGuard('jwt'))
  async toggleLike(@Param('blogId') blogId: string, @Req() req) {
    const user: IJwtPayload = req?.user;
    const authorId: string = user.userId;
    await this.likesService.toggleLike(blogId, authorId);
    return { success: true };
  }
  
}
