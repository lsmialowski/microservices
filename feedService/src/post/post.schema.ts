import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  imgUrl: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  createdAt: string
}
export const PostSchema = SchemaFactory.createForClass(Post);
