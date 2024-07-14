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

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  p_id: number;
  @Column()
  p_name: string;
  @Column()
  p_phone: string;
  @Column()
  p_email: string;
  @Column()
  p_dob: string;
  @Column()
  p_gender: string;
  @Column()
  p_address: string;
  @Column()
  p_medical_history: string;
  @Column()
  p_image: string;

  @OneToOne(() => UserEntity, (user) => user.patient)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient, {
    cascade: true,
  })
  appointment: AppointmentEntity;
}
