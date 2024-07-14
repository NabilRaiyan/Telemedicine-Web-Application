import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
  Put,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PrescriptionDto } from './prescription.dto';
import { PrescriptionEntity } from './prescription.entity';
import { PrescriptionService } from './prescription.service';
import { SessionGuard } from 'src/user/session.gaurd';
import { Request } from 'express';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post('createPrescription/:patientId')
  @UseGuards(SessionGuard)
  async createPrescription(
    @Req() req: Request,
    @Param('patientId') patientId: number,
    @Body() prescriptionDto: PrescriptionDto,
  ): Promise<PrescriptionEntity> {
    const doctorId = (req.session.user as any).doctor.d_id;

    return await this.prescriptionService.createPrescription(
      prescriptionDto,
      doctorId,
      patientId,
    );
  }

  // find all prescription of logged doctor
  @Get('allPrescription')
  @UseGuards(SessionGuard)
  async allPrescription(@Req() req: Request): Promise<PrescriptionEntity[]> {
    const doctorId = (req.session.user as any).doctor.d_id;
    return await this.prescriptionService.allPrescription(doctorId);
  }

  // update prescription by logged doctor
  @Put('updatePrescription/:prescriptionId')
  @UseGuards(SessionGuard) // Use your session guard here
  async updatePrescription(
    @Req() req: Request,
    @Param('prescriptionId') prescriptionId: number,
    @Body('prescription_details') prescriptionDetails: string,
  ) {
    // Get doctorId from session or token
    const doctorId = (req.session.user as any).doctor.d_id; // Replace with actual logic to get doctorId from session or token

    // Call service method to update prescription
    return await this.prescriptionService.updatePrescription(
      prescriptionId,
      doctorId,
      prescriptionDetails,
    );
  }

  // delete prescription controller
  @Delete('deletePrescription/:id')
  @UseGuards(SessionGuard)
  async deletePrescriptionById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const doctorId = (req.session.user as any).doctor.d_id; // Replace with actual logic to get doctorId from session or token
    try {
      await this.prescriptionService.deletePrescriptionById(id, doctorId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Let other unexpected errors propagate
    }
  }
}
