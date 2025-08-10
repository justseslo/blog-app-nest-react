import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  authorId: string;
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
