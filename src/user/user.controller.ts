import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { DoctorEntity } from 'src/doctor/doctor.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userService.createUser(userData);
  }

  @Post(':u_id/createDoctor')
  async createDoctor(
    @Param('u_id') u_id: number,
    @Body() doctorData: Partial<DoctorEntity>,
  ): Promise<DoctorEntity> {
    return await this.userService.createDoctor(doctorData, u_id);
  }
}
