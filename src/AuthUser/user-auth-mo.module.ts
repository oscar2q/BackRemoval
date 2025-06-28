/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserCauthController } from './user-cauth.controller';
import { UserSauthService } from './user-sauth.service';

@Module({
    imports:[  ],
    controllers:[ UserCauthController ],
    providers:[ UserSauthService ]
})
export class UserAuthMoModule{

    

}
