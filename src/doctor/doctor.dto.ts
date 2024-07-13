import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class DoctorDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  readonly d_name: string;

  @IsNotEmpty({ message: 'Phone number should not be empty' })
  readonly d_phone_number: string;

  @IsNotEmpty({ message: 'Chamber Address should not be empty' })
  readonly d_chamber_address: string;

  @IsNotEmpty({ message: 'Specialize should not be empty' })
  readonly d_specialize: string;

  @IsNotEmpty({ message: 'Education should not be empty' })
  readonly d_education: string;

  @IsNotEmpty({ message: 'Gender should not be empty' })
  readonly d_gender: string;

  @IsNotEmpty({ message: 'DOB should not be empty' })
  readonly d_dob: string;

  @IsNotEmpty({ message: 'Licence Number should not be empty' })
  readonly license_number: string;

  @IsNotEmpty({ message: 'Fees should not be empty' })
  readonly d_fee: number;
  
}
