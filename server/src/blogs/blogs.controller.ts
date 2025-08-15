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
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogsOwnerShip } from './guards/blog-ownership.guard';

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
  @Delete(':id')
  @UseGuards(AuthGuard("jwt"),BlogsOwnerShip)
  async deleteBlog(@Param('id') id: string) {
    await this.blogsService.delete(id);
    return { success: true, msg: 'Deleted blog successfully' };
  }
  @Get('my-blogs')
  @UseGuards(AuthGuard('jwt'))
  async getMyBlogs(@Req() req) {
    const userId = req.user.userId;
    const myblogs = await this.blogsService.getBlogsByAuthorId(userId);
    return { success: true, myblogs };
  }
  @Get(':id')
  async getBlogDetails(@Param('id') id: string) {
    const blog = await this.blogsService.findById(id);
    return { success: true, blog };
  }
}
