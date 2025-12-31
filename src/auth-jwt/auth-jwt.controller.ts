/* eslint-disable prettier/prettier */
import { Controller, Get, Headers, Req, UseGuards} from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { Request } from 'express';
import { user } from 'src/interfaces/userinterfaces';
import { TokenGuard } from './guard/tokenGuar.guard';
import { AuthTokenGuard } from './guard/userVerificationToken.guard';

@Controller('auth-jwt')
export class AuthJwtController{
   
    constructor( private authJwtServiceUser:AuthJwtService,){}

    @Get('Loggin')
    protected logginUser(@Headers() headers:Record<string,string> ):Promise<boolean | { access_token:string, refresh_token:string }>{
        const correo = headers['correo'];
        const password = headers['contrasena'];
        if( correo === null && password === null ){
            return new Promise((resolver)=>{ resolver(false); });
        }
        const tokens = this.authJwtServiceUser.logginUser(correo, password);
        return tokens;
     }


     @UseGuards(TokenGuard)
     @Get('decryptedJwt')
     protected verificacionToken(@Req() request:Request):user{
        return request['user'] as user;
    }

    @UseGuards(AuthTokenGuard)
    @Get('refreshToken')
    protected refreshToken(@Req() request:Request):Promise<{access_token:string,refresh_token:string}>{
        const tokenRefresh:string = request.cookies.userTokensRefresh as string;
        return this.authJwtServiceUser.refreshTokenAcessToken(tokenRefresh);      
    }

}