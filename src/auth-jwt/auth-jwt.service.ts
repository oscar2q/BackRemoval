/* eslint-disable prettier/prettier */
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userIntBasic } from 'src/interfaces/userinterfaces';
import { UsersService } from 'src/Users/users.service';
import { jwtContant } from './keyJwt';
import { jsonTokenIdUser } from './interface/jsonToken.interfaces';
@Injectable()
export class AuthJwtService {
    
    constructor(
     private authJwtServiceUser:UsersService,
     private jwtService: JwtService){}

     
    public async logginUser(correo:string, password:string):Promise<{access_token:string, refresh_token:string} | boolean>{
        const userDates: userIntBasic | boolean = await this.authJwtServiceUser.verificationCorreoPassword(correo, password);
        if( typeof(userDates) === 'object'){
            const { id_cliente, ...rest} = userDates;
            return {
              access_token: await this.jwtService.signAsync(rest,{expiresIn:'2d'}),
              //tiene 7 dias de duracion 
              refresh_token: await this.jwtService.signAsync({sub:id_cliente,}),
            }
        }
        return new Promise((resolve) => { resolve(false) });
    }

    public async descriptantoTokenVerification(access_token:string):Promise<any>{
        try{
            console.log(access_token);
            
            const verificationJwt = await this.jwtService.verifyAsync(access_token,{secret:jwtContant.secret}
            )as Promise<any>;
            return verificationJwt;
        }catch{
            throw new UnauthorizedException();
        }
    }

    /**
     * 
     * @tutorial refreshToken 
     * una vez que el acces_Token deje de funcionar el refresht token tomara participacion
     */
    public async refreshTokenAcessToken(refreshToken:string):Promise<{access_token: string,refresh_token: string;}>{
        try{
            const verificationToken:jsonTokenIdUser = await this.jwtService.verifyAsync(refreshToken,{ secret:jwtContant.secret });
            const userDate = await this.authJwtServiceUser.getDatesUserForId(verificationToken.sub) as userIntBasic;
            const { correoelectronico,nombre_user,apellido,genero,ubicacion } = userDate;            
            return {
                  access_token: await this.jwtService.signAsync({correoelectronico,nombre_user,apellido,genero,ubicacion},{ secret:jwtContant.secret,expiresIn:'2d' }),
                  refresh_token: await this.jwtService.signAsync({sub:userDate.id_cliente})
            };
        }catch{
            throw new UnauthorizedException();
        }
    }
}

//sub,
//iat,
//exp
