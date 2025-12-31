/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthTokenGuard implements CanActivate{
    constructor(){}

     canActivate(context: ExecutionContext){
        const request:Request = context.switchToHttp().getRequest();
        const token = this.extractTokenHeader(request);
            if(token != undefined){
                return true;
             }
             throw new UnauthorizedException({
                statusCode:'Forbidden',
                message:'unauthorized >:p'
             })
    }

    private extractTokenHeader(request:Request):string | undefined{
        const cookiesUserRefresh = request.cookies;
        if(cookiesUserRefresh.userTokensRefresh){
            return cookiesUserRefresh.userTokensRefresh as string; 
        }
        return undefined;
    }
    
}