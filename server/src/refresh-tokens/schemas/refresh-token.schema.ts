import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/common/enums/user-role.enum';

@Schema()
export class RefreshToken {
  @Prop({ required: true })
  token: string;
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export type RefreshTokenDocument = RefreshToken & Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
