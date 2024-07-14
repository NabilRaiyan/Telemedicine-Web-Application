import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { PatientEntity } from 'src/patient/patient.entity';

@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  appointment_id: number;
  @CreateDateColumn()
  appointment_date: Date;
  @UpdateDateColumn()
  appointment_updated_time: Date;
  @Column()
  appointment_status: string;
  @Column()
  consultation_notes: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointment)
  @JoinColumn()
  doctor: DoctorEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.appointment)
  @JoinColumn()
  patient: PatientEntity;
}
