import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  lastSeen: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
