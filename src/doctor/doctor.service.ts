import { Injectable } from '@nestjs/common';
import { DoctorEntity } from './doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  hello(): string {
    return 'Hello from doctor';
  }
}
