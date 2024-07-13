import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  u_email: string;

  @IsNotEmpty()
  u_password: string;
}
