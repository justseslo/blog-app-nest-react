import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDto } from './dto/create-blog.dto';
import type { Request } from 'express';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
}
