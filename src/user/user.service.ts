import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async createDoctor(
    doctorData: Partial<Doctor>,
    u_id: number,
  ): Promise<Doctor> {
    const user = await this.userRepository.findOne(u_id);
    if (!user) {
      throw new Error('User not found');
    }

    const doctor = this.doctorRepository.create(doctorData);
    doctor.user = user;
    return await this.doctorRepository.save(doctor);
  }

  // Other user and doctor service methods as needed
}
