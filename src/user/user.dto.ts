import { IsNotEmpty, MinLength, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  readonly u_name: string;

  @Matches(/^[A-Za-z]+@gmail\.com/, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  readonly u_email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Passwor should be 8 character long' })
  readonly u_password: string;

  @IsNotEmpty({ message: 'User Role should not be empty' })
  readonly u_role: string;
  readonly status?: string;
  readonly resetCode?: string;
}
