/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { clientes, Genero } from 'src/Entitys/Cliente.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(clientes)
        private ClienteRepository:Repository<clientes>,
    ){}

    public async getUserDates(correoelectronico:string,password:string):Promise<clientes | null>{
          
        const user = await this.ClienteRepository
        .createQueryBuilder('clientes')
        .select(['clientes.ubicacion','clientes.genero','clientes.apellido','clientes.correoelectronico','clientes.nombre_user' ])
        .where('clientes.correoelectronico = :correoelectronico',{ correoelectronico })
        .andWhere('clientes.contrasena = :contrasena',{contrasena:password})
        .getOne();
        console.log(user)
        return user;
    }

    public InsertNewClientes(){
        return true;
    }

    public async getExistCorreoUser(correo:string):Promise<boolean | null>{
        const existCorreo = await this.ClienteRepository
        .createQueryBuilder('clientes')
        .select(['clientes.correoelectronico'])
        .where('clientes.correoelectronico = :correoelectronico',{correoelectronico:correo})
        .getOne();
         return existCorreo ? true : false;
    }

    public async InsertUserNew(correoelectronico:string,nombreUser:string,apellido:string,
        genero:string,contrasena:string,
    ):Promise<boolean>{
        const InsertUser = await this.ClienteRepository
        .createQueryBuilder('clientes')
        .insert()
        .into('clientes')
        .values({
            
            correoelectronico:correoelectronico,
            nombre_user:nombreUser,
            apellido:apellido,
            genero:genero,
            contrasena:contrasena,
            ubicacion:'NoSeQuepPoner'/**Ingresar en el formulario su ubicacion */
        })
        .execute();
         return (InsertUser) ? true : false ;

    }

}
