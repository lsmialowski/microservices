import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PostCounter extends Document {
  @Prop({required: true})
  _id: string;
  @Prop({ default: 0 })
  seq: number;
}
export const PostCounterSchema = SchemaFactory.createForClass(PostCounter);
