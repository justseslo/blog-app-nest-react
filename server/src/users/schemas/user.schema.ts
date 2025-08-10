import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/common/enums/user-role.enum';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ enum: UserRole, required: true,default:UserRole.USER })
  role: UserRole;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)