/* eslint-disable prettier/prettier */

export interface jsonTokenIdUser{
    sub:string;
    iat:string;
    exp:string;
}

export interface jsonToken{
    userTokensAcces:string;
    userTokensRefresh:string;
}

export interface getUserObjectToken{
    dateuserforid:string;
}