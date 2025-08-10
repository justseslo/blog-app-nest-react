import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    await this.commentModel.create(createCommentDto);
  }
  async delete(id: string) {
    await this.commentModel.findByIdAndDelete(id);
  }
  async getCommentByBlogId(blogId: string) {
    return this.commentModel.find({ blogId });
  }
}
