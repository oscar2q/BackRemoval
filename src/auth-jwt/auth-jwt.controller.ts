/* eslint-disable prettier/prettier */
import { Controller, Get, Headers, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { Request } from 'express';
import { user } from 'src/interfaces/userinterfaces';
import { TokenGuard } from './guard/tokenGuar.guard';
import { AuthTokenGuard } from './guard/userVerificationToken.guard';

@Controller('auth-jwt')
export class AuthJwtController{
   
    constructor( private authJwtServiceUser:AuthJwtService,){}

    @Get('Loggin')
    protected logginUser(@Headers() headers:Record<string,string> ):Promise<{ access_token:string, refresh_token:string }>{
        console.log("aqui");
        const correo = headers['correo'];
        const password = headers['contrasena'];
        console.log(correo,password);
        if( !correo || !password ){
            throw new UnauthorizedException({status:'401',message:'Error los datos a ingresar son incorrectos'});
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


    @Get('verificationToken')
    protected verification(){
        
    }

}