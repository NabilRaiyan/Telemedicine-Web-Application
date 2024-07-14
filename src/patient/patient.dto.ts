import { IsNotEmpty } from 'class-validator';

export class PatientDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  readonly p_name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  readonly p_email: string;

 
  
}
