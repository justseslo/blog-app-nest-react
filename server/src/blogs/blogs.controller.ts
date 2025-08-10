import { Controller, Post, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  createBlog() {}
}
