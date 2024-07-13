import { IsAlpha, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  u_name: string;

  @IsNotEmpty()
  @Matches(/^[A-Za-z]+@gmail\.com/, {
    message: 'Please, provide a valid email address',
  })
  u_email: string;
}
