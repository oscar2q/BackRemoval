/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { AuthJwtService } from './auth-jwt.service';

@Controller('auth-jwt')
export class AuthJwtController{
   
    constructor(
        private authJwtServiceUser:AuthJwtService,
        //private jwtService: JwtService
    ){}

    @Get('Loggin')
    protected logginUser(@Query('correoelectronico') correo:string, @Query('contrasena') password:string ):Promise<boolean | { access_token:string }>{
        const dorimen = this.authJwtServiceUser.logginUser(correo, password);
        console.log(dorimen);
        return dorimen;
        }


}
