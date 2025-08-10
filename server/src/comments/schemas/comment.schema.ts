import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  authorId: Types.ObjectId;
  @Prop({ required: true })
  blogId: string;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
