/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userIntBasic } from 'src/interfaces/userinterfaces';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class AuthJwtService {
    
    constructor(
     private authJwtServiceUser:UsersService,
     private jwtService: JwtService){}

    public async logginUser(correo:string, password:string):Promise<{access_token:string} | boolean>{
        const userDates: userIntBasic | boolean = await this.authJwtServiceUser.verificationCorreoPassword(correo, password);

            console.log(userDates);
        if( typeof(userDates) === 'object'){
            return {
              access_token: await this.jwtService.signAsync(userDates),
            }
        }

        return new Promise((resolve) => { resolve(false) });
    }

    
}
