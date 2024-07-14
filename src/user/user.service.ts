import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { UserDto } from './user.dto';
import { DoctorDto } from 'src/doctor/doctor.dto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './auth.dto';
import { Request } from 'express';
import { PatientDto } from 'src/patient/patient.dto';
import { PatientEntity } from 'src/patient/patient.entity';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,

    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
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

  // creating patient
  async createPatient(
    patientData: Partial<PatientDto>,
    u_id: number,
  ): Promise<PatientEntity> {
    const user = await this.userRepository.findOne({
      where: {
        u_id: u_id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const patient = this.patientRepository.create(patientData);
    patient.user = user;
    return await this.patientRepository.save(patient);
  }

  // user login route
  async UserLogin(
    req: Request,
    loginData: Partial<AuthDto>,
  ): Promise<UserEntity> {
    const { u_email, u_password } = loginData;
    const user = await this.userRepository.findOne({
      where: { u_email },
      relations: ['doctor'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(u_password, user.u_password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    req.session.user = user;
    console.log(req.session.user);

    return user;
  }

  // user logout
  async logOut(req: Request): Promise<void> {
    // console.log(req.session);
    req.session.destroy((err) => {
      if (err) {
        throw new Error('Failed to destroy session');
      }
      console.log(req.session);
    });
  }
}

// login credencials
// {
//   "u_name": "Abdullah Al Mahmud",
//   "u_email": "abdullah@gmail.com",
//   "u_password": "qwerty1234567",
//   "u_role": "Doctor",
//   "status": "pending"
// }
