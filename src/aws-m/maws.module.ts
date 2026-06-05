/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ControllsawsController } from './controllsaws.controller';

@Module({
  controllers: [ControllsawsController]
})
export class MawsModule {}
