import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { DoctorEntity } from './doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from 'src/patient/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, PatientEntity])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
