/* eslint-disable prettier/prettier */
import { Controller, Get, Header, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Genero } from 'src/Entitys/Cliente.entity';

@Controller('users')
export class UsersController {
    
    constructor(private readonly UserServices:UsersService){}

    
    @Get('getUsers')
    public getCorreoUser(@Headers() headers:Record<string,string>){
        const correo = headers['correo'];
        const password = headers['constrasena'];
        return this.UserServices.getUserDates(correo,password);
    }
    
    @Get('UsersExist')
    public getExistCorreoUser(@Headers() headers:Record<string,string>){
        const correoUser = headers['correo'];
        return this.UserServices.getExistCorreoUser(correoUser);
    }

    @Post('InsertNewUser')
    public getInserNewUsers(@Headers() Headers:Record<string,string>):Promise<boolean>{
        const email = Headers['email'];
        const nameUser = Headers['name'];
        const apelido = Headers['apellido'];
        const contrasena = Headers['contrasena'];
        const gen:string = Headers['gen']
        /*ELIMINAR*/
        console.log({
            email ,
            nameUser, 
            apelido ,
            contrasena, 
            gen,      
        })    
        /**ELIMINAR */
    return this.UserServices.InsertUserNew(email,nameUser,apelido
        ,gen,contrasena);
    }   


}
