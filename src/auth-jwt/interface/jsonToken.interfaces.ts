/* eslint-disable prettier/prettier */

export interface jsonTokenIdUser{
    sub:string;
    iat:string;
    exp:string;
}

export interface jsonToken{
    access_token:string;
    userTokensRefresh:string;
}

export interface getUserObjectToken{
    dateuserforid:string;
}