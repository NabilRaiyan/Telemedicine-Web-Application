import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './prescription.entity';
import { PrescriptionService } from './prescription.service';

import { DoctorEntity } from 'src/doctor/doctor.entity';
import { PatientEntity } from 'src/patient/patient.entity';
import { PrescriptionController } from './prescription.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrescriptionEntity, DoctorEntity, PatientEntity]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
