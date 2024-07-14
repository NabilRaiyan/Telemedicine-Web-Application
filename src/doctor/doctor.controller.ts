import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { PrescriptionEntity } from 'src/prescription/prescription.entity';
import { SessionGuard } from 'src/user/session.gaurd';
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(SessionGuard)
  @Get('prescriptions/:patientName')
  async findPrescriptionsByPatientName(
    @Request() req,
    @Param('patientName') patientName: string,
  ): Promise<PrescriptionEntity[]> {
    const doctorId = req.session.user.doctor.d_id; // Assuming the doctor ID is stored in the session
    return await this.doctorService.findPrescriptionsByPatientName(
      doctorId,
      patientName,
    );
  }
}
