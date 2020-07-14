import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@Exclude()
export class UserDTO {
  @Expose()
  @Length(5, 255)
  @IsEmail()
  email: string;
}
