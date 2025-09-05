import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './schemas/like.schema';
import mongoose, { Model } from 'mongoose';
import { Blog } from 'src/blogs/schemas/blog.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
  ) {}
  async toggleLike(blogId: string, authorId: string) {
    const likeDoc = await this.likeModel.findOne({ blogId, authorId });
    if (likeDoc) {
      await this.delete(blogId, authorId);
    } else {
      await this.add(blogId, authorId);
    }
  }
  async delete(blogId: string, authorId: string) {
    await this.likeModel.findOneAndDelete({ blogId, authorId });
  }
  async add(blogId: string, authorId: string) {
    try {
      await this.likeModel.create({ blogId, authorId });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('This user already liked the blog');
      }
      throw error;
    }
  }
  async getByBlogId(blogId: string) {
    return await this.likeModel
      .find({ blogId })
      .populate([{ path: 'blogId' }, { path: 'authorId', select: '-password' }])
      .exec();
  }
  async checkLike(blogId: string, authorId: string) {
    const like = await this.likeModel.findOne({ blogId, authorId });
    if (like) {
      return true;
    }
    return false;
  }
  async getBlogsWithMostLikes() {
    return await this.likeModel.aggregate([
      { $group: { _id: '$blogId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
      {
        $addFields: {
          _id: { $toObjectId: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'blogs',
          localField: '_id',
          foreignField: '_id',
          as: 'blogDetail',
        },
      },
      { $unwind: '$blogDetail' },
      { $replaceRoot: { newRoot: '$blogDetail' } },
    ]);
  }
}
