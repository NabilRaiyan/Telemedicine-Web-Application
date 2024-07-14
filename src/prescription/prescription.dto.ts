import { IsNotEmpty, IsString } from 'class-validator';

export class PrescriptionDto {
  @IsNotEmpty({ message: 'Prescription Details Notes should not be empty' })
  @IsString({ message: 'Prescription Details Notes should be text.' })
  readonly prescription_details: string;
}
