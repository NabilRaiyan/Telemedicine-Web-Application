import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { PrescriptionEntity } from 'src/prescription/prescription.entity';

@Entity('doctor')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  d_id: number;
  @Column()
  d_name: string;
  @Column()
  d_phone_number: string;
  @Column()
  d_chamber_address: string;
  @Column()
  d_specialize: string;
  @Column()
  d_education: string;
  @Column()
  d_gender: string;
  @Column()
  d_dob: string;
  @Column()
  license_number: string;
  @Column()
  status: string;
  @Column()
  notice_id: number;
  @Column({ default: 0 })
  d_fee: number;

  @OneToOne(() => UserEntity, (user) => user.doctor)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.doctor, {
    cascade: true,
  })
  appointment: AppointmentEntity;

  @OneToMany(() => PrescriptionEntity, (prescription) => prescription.doctor, {
    cascade: true,
  })
  prescription: PrescriptionEntity;
}
