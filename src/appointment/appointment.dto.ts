import { IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  @IsNotEmpty({ message: 'Consultation Notes should not be empty' })
  @IsString({ message: 'Consultation Notes should be text.' })
  readonly consultation_notes: string;
}
