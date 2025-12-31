/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jsonToken } from "../interface/jsonToken.interfaces";
import { jwtContant } from "../keyJwt";

@Injectable()
export class TokenGuard implements CanActivate{

    constructor(private jwtService:JwtService){}
    
    async canActivate(context: ExecutionContext){
        const request:Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
            if(!token){ throw new UnauthorizedException();  }
            try{
                    if( typeof(token) === 'string'){
                        const userToken = await this.jwtService.verifyAsync(token,
                        { secret:jwtContant.secret}) as Promise<any>;                        
                        request['user'] = userToken;
                    }
            }catch{
                throw new UnauthorizedException();
            }
            return true;
    }

    private extractTokenFromHeader(@Req() request:Request):string | boolean{
        const token:jsonToken = request.cookies as jsonToken;
        return token.userTokensAcces !== null ? token.userTokensAcces : false; 
    }

}

