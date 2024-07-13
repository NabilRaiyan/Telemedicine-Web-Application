import { DoctorEntity } from 'src/doctor/doctor.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  u_id: number;
  @Column({ type: 'varchar', length: 100 })
  u_name: string;
  @Column({ type: 'varchar', length: 150 })
  u_email: string;
  @Column({ type: 'varchar' })
  u_password: string;
  @Column()
  u_role: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Column()
  status: string;

  @OneToOne(() => DoctorEntity, (doctor) => doctor.user, { cascade: true })
  doctor: DoctorEntity;
}
