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

@Entity('prescription')
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  prescription_id: number;
  @Column({ type: 'varchar', length: 200 })
  prescription_details: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.prescription)
  @JoinColumn()
  doctor: DoctorEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.prescription)
  @JoinColumn()
  patient: PatientEntity;
}
