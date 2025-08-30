import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { IJwtPayload } from 'src/auth/types/jwt-payload.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post(':blogId')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Param('blogId') blogId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    const user: IJwtPayload = req.user;
    const comment = await this.commentsService.create({
      ...createCommentDto,
      blogId,
      authorId: user.userId,
    });
    return { success: true, comment };
  }
  @Get(':blogId')
  async getComments(@Param('blogId') blogId: string) {
    const comments = await this.commentsService.getCommentsByBlogId(blogId);
    return { success: true, comments };
  }
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    const comment = await this.commentsService.delete(commentId);
    return { success: true, comment };
  }
}
