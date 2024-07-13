import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { UserDto } from './user.dto';
import { DoctorDto } from 'src/doctor/doctor.dto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './auth.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}

  // registering or creating user
  async createUser(userData: Partial<UserDto>): Promise<UserDto> {
    const { u_password, ...restUserData } = userData;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(u_password, salt);
    const user = this.userRepository.create({
      ...restUserData,
      u_password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  // creating doctor
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

  // user login route
  async UserLogin(loginData: Partial<AuthDto>): Promise<UserEntity> {
    console.log(loginData);
    const { u_email, u_password } = loginData;
    const user = await this.userRepository.findOne({
      where: { u_email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(u_password, user.u_password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
