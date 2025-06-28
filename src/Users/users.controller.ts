/* eslint-disable prettier/prettier */
import { Controller, Get, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { clientes } from '../Entitys/Cliente.entity';
import { userIntBasic } from 'src/interfaces/userinterfaces';

@Controller('users')
export class UsersController {
    
    constructor(private readonly UserServices:UsersService){}

    
    @Get('getUsers')
    public getCorreoUser(@Headers() headers:Record<string,string>){
        const correo = headers['correo'];
        //const password = headers['constrasena'];
        return this.UserServices.getUserDates(correo,/*password*/);
    }
    
    @Get('UsersExist')
    public getExistCorreoUser(@Headers() headers:Record<string,string>){
        const correoUser = headers['correo'];
        return this.UserServices.getExistCorreoUser(correoUser);
    }

    /**
     * 
     * @param Headers 
     * @returns 
     * cambiar y usar la clase y usar el pipe para la validacion
     * 
     */

    @Post('InsertNewUser')
    public inserNewUsers(@Headers() Headers:Record<string,string>):Promise<boolean>{
        const email:string = Headers['correoelectronico'];
        const nameUser:string = Headers['nombreuser'];
        const apellido:string = Headers['apellido'];
        const genero:string = Headers['genero'];
        const contrasena:string = Headers['contrasena'];
        const ubicacion:string = Headers['ubicacion'];

        console.log({
            email:email,
            username:nameUser,
            apellido:apellido,
            genero:genero,
            contrasena:contrasena,
            ubicacion:ubicacion
        });

        return this.UserServices.InsertUserNew( email, nameUser, apellido, genero, contrasena, ubicacion );
    }   

    @Get('Verifiaction')
    public getUserCorreoPasswordVerification( @Headers() Headers:Record<string,string>):Promise<clientes | null >{
       const correo = Headers['email'];
       const password = Headers['contrasena'];
      const user = this.UserServices.getUserCorreoPasswordVerification(correo,password);
       
      return user;
    }

    @Get('verificationLogginUser')
    public getVerificationEmail(@Headers() Headers:Record<string,string>):Promise<userIntBasic | boolean>{
        const email = Headers['email'];
        const password = Headers['contrasena'];
        //return this.UserServices.getUserCorreoPasswordVerification(email,password);
        return this.UserServices.verificationCorreoPassword(email,password);
    }


}


