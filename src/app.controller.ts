/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('UserRegister')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('usercorreo')
  getHello(){
    return this.appService.getHello();
  }

}
