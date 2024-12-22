import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

export const createS3 = (configService: ConfigService) : AWS.S3 => {
  return new AWS.S3({
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    region: configService.get<string>('AWS_REGION'),
  });
};