import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { PrescriptionEntity } from '../prescription/prescription.entity'; // Adjust the path as needed
import { PatientEntity } from '../patient/patient.entity'; // Adjust the path as needed

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepository: Repository<PrescriptionEntity>,
  ) {}

  // find prescription by patient name
  async findPrescriptionsByPatientName(
    doctorId: number,
    patientName: string,
  ): Promise<PrescriptionEntity[]> {
    const doctor = await this.doctorRepository.findOne({
      where: { d_id: doctorId },
    });

    if (!doctor) {
      throw new UnauthorizedException('Doctor not found');
    }

    const prescriptions = await this.prescriptionRepository.find({
      where: {
        doctor: { d_id: doctorId },
        patient: { p_name: Like(`%${patientName}%`) },
      },
      relations: ['patient', 'doctor'],
    });

    return prescriptions;
  }
}
