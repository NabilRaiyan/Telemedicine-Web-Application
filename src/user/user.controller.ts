import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { UserDto } from './user.dto';
import { DoctorDto } from 'src/doctor/doctor.dto';

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
}
