import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateImageDto {
  @IsString()
  @ApiProperty()
  size: string;

  @IsString()
  @ApiProperty()
  prompt: string;
}
