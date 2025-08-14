import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const userId = req.user?.userId;
    await this.blogsService.create({ ...createBlogDto, authorId: userId });
    return { success: true, msg: 'Created blog successfully' };
  }
  @Get()
  async getBlogs() {
    const blogs = await this.blogsService.getBlogs();
    return { success: true, blogs };
  }
  @Get(':id')
  async getBlogDetails(@Param('id') id: string) {
    const blog = await this.blogsService.findById(id);
    return { success: true, blog };
  }
}
