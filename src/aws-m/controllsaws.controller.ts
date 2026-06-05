/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AwsMService } from './aws-m.service';

@Controller('controllsaws')
export class ControllsawsController{
    
    constructor(private aws:AwsMService ){}

    @Get()
    protected exponerBucketsS3(){
        
    }

}
