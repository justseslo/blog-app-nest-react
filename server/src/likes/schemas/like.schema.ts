import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Blog } from 'src/blogs/schemas/blog.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Like {
  @Prop({ required: true, ref: Blog.name })
  blogId: string;
  @Prop({ required: true, ref: User.name })
  authorId: string;
}
export type LikeDocument = Like & Document;
export const LikeSchema = SchemaFactory.createForClass(Like);
LikeSchema.index({ blogId: 1, authorId: 1 }, { unique: true });
