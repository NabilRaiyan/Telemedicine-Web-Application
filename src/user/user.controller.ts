import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: UserDto): object {
    console.log(data);
    return this.userService.createUser(data);
  }
}
