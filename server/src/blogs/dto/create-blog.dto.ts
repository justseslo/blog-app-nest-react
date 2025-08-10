import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsOptional()
  authorId: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
