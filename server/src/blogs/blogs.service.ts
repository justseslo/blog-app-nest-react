import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { LikesService } from 'src/likes/likes.service';
import { JwtPayload } from 'jsonwebtoken';
import { IJwtPayload } from 'src/auth/types/jwt-payload.interface';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
    private readonly likesService: LikesService,
  ) {}
  async create(blogData) {
    return await this.blogModel.create(blogData);
  }
  async delete(id: string) {
    return await this.blogModel.findByIdAndDelete(id).exec();
  }
  async findById(id: string) {
    return await this.blogModel
      .findById(id)
      .populate({ path: 'authorId', select: '-password' })
      .exec();
  }
  async getBlogs(user: IJwtPayload, page: number) {
    const blogs = await this.blogModel
      .find({})
      .skip((page - 1) * 12)
      .limit(12)
      .populate({ path: 'authorId', select: '-password' })
      .exec();
    const newBlogs = await Promise.all(
      blogs.map(async (blog) => ({
        ...blog.toObject(),
        likes: (await this.likesService.getByBlogId(blog._id.toString()))
          .length,
        isLiked: user
          ? await this.likesService.checkLike(blog._id.toString(), user.userId)
          : false,
      })),
    );
    return newBlogs;
  }
  async getBlogsByAuthorId(authorId: string) {
    return await this.blogModel
      .find({ authorId })
      .populate({ path: 'authorId', select: '-password' })
      .exec();
  }
  async getBlogsCount() {
    return await this.blogModel.find({});
  }
}
