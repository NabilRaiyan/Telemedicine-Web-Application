import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { PatientEntity } from 'src/patient/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DoctorEntity, PatientEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
