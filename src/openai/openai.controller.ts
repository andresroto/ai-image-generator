import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GenerateImageDto } from './dtos/generate-image.dto';
import { openai } from './config/openai.config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('Openai-controller')
export class OpenaiController {
  @Post('generate-image')
  @ApiOperation({ description: 'Generate a random image' })
  @ApiResponse({ status: 200, description: 'Image Upload Successful!' })
  @ApiResponse({ status: 400, description: 'The image could be not generated' })
  async generateImage(
    @Body() generateImageDto: GenerateImageDto,
    @Res() res: Response,
  ): Promise<object> {
    const { size, prompt } = generateImageDto;

    const imageSize =
      size === 'small'
        ? '256x256'
        : size === 'medium'
        ? '512x512'
        : '1024x1024';

    try {
      const result = openai().createImage({
        prompt,
        n: 1,
        size: imageSize,
      });

      const imageUrl = (await result).data.data[0].url;

      return res.status(HttpStatus.OK).json({
        message: 'Image Upload Successful!',
        data: imageUrl,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'The image could be not generated',
      });
    }
  }
}
