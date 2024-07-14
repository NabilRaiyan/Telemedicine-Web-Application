import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentDto } from './appointment.dto';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { PatientEntity } from 'src/patient/patient.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,

    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,

    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  // creating appointment
  async createAppointment(
    appointmentDto: AppointmentDto,
    d_id: number,
    p_id: number,
  ): Promise<AppointmentEntity> {
    const doctor = await this.doctorRepository.findOne({ where: { d_id } });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const patient = await this.patientRepository.findOne({ where: { p_id } });
    if (!patient) {
      throw new Error('Patient not found');
    }

    const appointment = this.appointmentRepository.create(appointmentDto);
    appointment.doctor = doctor;
    appointment.patient = patient;
    return await this.appointmentRepository.save(appointment);
  }
}
