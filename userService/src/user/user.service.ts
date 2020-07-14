import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { ERRORS } from '../common/errors';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(userData: UserDTO): Promise<User> {
    const user = new this.userModel(userData);

    return user.save().catch(error => {
      if(11000 === error.code){
        throw new BadRequestException(ERRORS.USER_ALREADY_EXIST);
      }
      throw error;
    });
  }
}
