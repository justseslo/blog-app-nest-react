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
import { OptionalAuthGuard } from 'src/common/guards/optional-auth.guard';
import { IJwtPayload } from 'src/auth/types/jwt-payload.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const userId = req.user?.userId;
    const blog = await this.blogsService.create({
      ...createBlogDto,
      authorId: userId,
    });
    return { success: true, msg: 'Created blog successfully', blog };
  }
  @Get('count')
  async getBlogsCount() {
    const blogs = await this.blogsService.getBlogsCount();
    const blogsCount = blogs.length;
    return { success: true, blogsCount };
  }
  @Get('details/:id')
  async getBlogDetails(@Param('id') id: string) {
    const blog = await this.blogsService.findById(id);
    return { success: true, blog };
  }
  @Get('page/:page')
  @UseGuards(OptionalAuthGuard)
  async getBlogs(@Req() req, @Param('page') page: string) {
    const user: IJwtPayload = req.user;
    const blogs = await this.blogsService.getBlogs(user, Number(page));
    return { success: true, blogs };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), BlogsOwnerShip)
  async deleteBlog(@Param('id') id: string) {
    const blog = await this.blogsService.delete(id);
    return { success: true, msg: 'Deleted blog successfully', blog };
  }
  @Get('my-blogs')
  @UseGuards(AuthGuard('jwt'))
  async getMyBlogs(@Req() req) {
    const userId = req.user.userId;
    const myblogs = await this.blogsService.getBlogsByAuthorId(userId);
    return { success: true, myblogs };
  }
}
