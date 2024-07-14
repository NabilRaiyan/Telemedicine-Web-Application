import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { PatientEntity } from 'src/patient/patient.entity';
import { PrescriptionEntity } from './prescription.entity';
import { PrescriptionDto } from './prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepository: Repository<PrescriptionEntity>,
  ) {}

  // create prescription
  async createPrescription(
    prescriptionDto: PrescriptionDto,
    d_id: number,
    p_id: number,
  ): Promise<PrescriptionEntity> {
    const doctor = await this.doctorRepository.findOne({ where: { d_id } });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const patient = await this.patientRepository.findOne({ where: { p_id } });
    if (!patient) {
      throw new Error('Patient not found');
    }

    const prescription = this.prescriptionRepository.create(prescriptionDto);
    prescription.doctor = doctor;
    prescription.patient = patient;
    return await this.prescriptionRepository.save(prescription);
  }

  // find all prescription of logged doctor
  async allPrescription(doctorId: number): Promise<PrescriptionEntity[]> {
    const prescription = await this.prescriptionRepository.find({
      where: {
        doctor: { d_id: doctorId },
      },
      relations: ['doctor', 'patient'],
    });

    return prescription;
  }

  // update prescription
  async updatePrescription(
    prescriptionId: number,
    d_id: number,
    prescriptionDetails: string,
  ): Promise<PrescriptionEntity> {
    // Check if the doctor is authorized to update this prescription
    const doctor = await this.doctorRepository.findOne({ where: { d_id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const prescription = await this.prescriptionRepository.findOne({
      where: { prescription_id: prescriptionId, doctor: { d_id: d_id } },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    // Update prescription details
    prescription.prescription_details = prescriptionDetails;

    // Save updated prescription
    return await this.prescriptionRepository.save(prescription);
  }

  // delete prescription by prescription id
  async deletePrescriptionById(
    prescriptionId: number,
    doctorId: number,
  ): Promise<void> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { prescription_id: prescriptionId, doctor: { d_id: doctorId } },
    });

    if (!prescription) {
      throw new NotFoundException(
        'Prescription not found or you are not authorized to delete it.',
      );
    }

    await this.prescriptionRepository.remove(prescription);
  }
}
