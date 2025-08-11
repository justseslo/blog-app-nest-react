import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    await this.blogModel.create(createBlogDto);
  }
  async delete(id: string) {
    await this.blogModel.findByIdAndDelete(id).exec();
  }
  async findById(id: string) {
    return await this.blogModel.findById(id).exec();
  }
  async getBlogs() {
    return await this.blogModel.find({}).exec();
  }
}
