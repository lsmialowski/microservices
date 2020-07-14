import { Injectable } from '@nestjs/common';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { exchange } from '../message-bus/exchange.constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @RabbitSubscribe({
    exchange: exchange.user.name,
    routingKey: 'create',
    queue: `${exchange.user.name}.feed`,
  })
  private async userCreateHandler(payload: {_id: string, email: string, __v: number}) {
    const userObjectId = mongoose.Types.ObjectId(payload._id);

    const user = new this.userModel({_id: payload._id, lastSeen: userObjectId.getTimestamp().toISOString()});

    await user.save();

    return new Nack();

  }

  get(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  updateLastSeen(id: string, date: string): Promise<User> {
    return this.userModel.updateOne({ _id: id }, {lastSeen: date}).exec();
  }
}
