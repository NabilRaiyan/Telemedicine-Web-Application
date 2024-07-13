import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { UserDto } from './user.dto';
import { DoctorDto } from 'src/doctor/doctor.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}

  async createUser(userData: Partial<UserDto>): Promise<UserDto> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async createDoctor(
    doctorData: Partial<DoctorDto>,
    u_id: number,
  ): Promise<DoctorEntity> {
    const user = await this.userRepository.findOne({
      where: {
        u_id: u_id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const doctor = this.doctorRepository.create(doctorData);
    doctor.user = user;
    return await this.doctorRepository.save(doctor);
  }

}
