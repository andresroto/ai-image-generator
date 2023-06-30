import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateImageDto {
  @IsString()
  @ApiProperty({
    description: 'Size of the image (small, medium, or large)',
  })
  size: string;

  @IsString()
  @ApiProperty()
  prompt: string;
}
