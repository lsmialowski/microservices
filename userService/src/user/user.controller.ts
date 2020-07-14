import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { MessageBusService } from '../message-bus/message-bus.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly messageBusService: MessageBusService,
  ) {}

  @Post()
  async create(@Body() body: UserDTO): Promise<UserDTO> {
    const user = await this.userService.create(body);
    await this.messageBusService.publishUserCreateEvent(user);

    return user;
  }

}
