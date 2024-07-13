import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { UserDto } from './user.dto';
import { DoctorDto } from 'src/doctor/doctor.dto';
import { UserEntity } from './user.entity';
import { AuthDto } from './auth.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // creating user
  @Post('createUser')
  async createUser(@Body() userData: UserDto): Promise<UserDto> {
    return await this.userService.createUser(userData);
  }

  // creating doctor
  @Post(':u_id/createDoctor')
  async createDoctor(
    @Param('u_id') u_id: number,
    @Body() doctorData: DoctorDto,
  ): Promise<DoctorEntity> {
    return await this.userService.createDoctor(doctorData, u_id);
  }

  // user login
  @Post('login')
  async userLogin(@Body() loginData: AuthDto): Promise<UserEntity> {
    return await this.userService.UserLogin(loginData);
  }
}
