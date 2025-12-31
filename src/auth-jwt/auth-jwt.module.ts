/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthJwtController } from './auth-jwt.controller';
import { AuthJwtService } from './auth-jwt.service';
import { UsersModule } from 'src/Users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtContant } from './keyJwt';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      secret:jwtContant.secret,
      signOptions:{expiresIn:'7d'} //2 dias
    }),
  ],
  controllers: [AuthJwtController],
  providers: [AuthJwtService],
})
export class AuthJwtModule {

}
