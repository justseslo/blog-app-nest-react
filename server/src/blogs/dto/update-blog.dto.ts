import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class updateBlogDto extends PartialType(CreateBlogDto) {}
