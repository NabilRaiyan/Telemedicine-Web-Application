import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

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
}
