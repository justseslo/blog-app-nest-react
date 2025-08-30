import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async create(createCommentData) {
    return await this.commentModel.create(createCommentData);
  }
  async delete(id: string) {
    return await this.commentModel.findByIdAndDelete(id);
  }
  async getCommentsByBlogId(blogId: string) {
    return await this.commentModel
      .find({ blogId })
      .populate({ path: 'authorId', select: '-password' })
      .exec();
  }
  async find(id: string) {
    return await this.commentModel.findById(id);
  }
}
