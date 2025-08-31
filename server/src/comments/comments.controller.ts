import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { IJwtPayload } from 'src/auth/types/jwt-payload.interface';
import { CommentOwnershipGuard } from './guards/comment-ownership.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
  @UseGuards(AuthGuard('jwt'), CommentOwnershipGuard)
  async deleteComment(@Param('commentId') commentId: string) {
    const comment = await this.commentsService.delete(commentId);
    return { success: true, comment };
  }
  @Patch(':commentId')
  @UseGuards(AuthGuard('jwt'), CommentOwnershipGuard)
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.update(commentId, {
      ...updateCommentDto,
    });
    return { success: true, comment };
  }
}
