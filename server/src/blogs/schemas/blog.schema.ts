import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, ref: User.name, type: Types.ObjectId })
  authorId: any;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  imageUrl: string;
  @Prop({ required: true })
  content: string;
}
export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
