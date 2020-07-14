import { Exclude, Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

@Exclude()
export class PostDTO {
  @Expose()
  @Length(5, 255)
  @IsString()
  imgUrl: string;
}
