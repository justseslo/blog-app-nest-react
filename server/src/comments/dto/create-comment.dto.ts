import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  blogId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsOptional()
  authorId?: string;
}
