import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('home')
  getHello(): string {
    return this.doctorService.hello();
  }
}
