import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
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
