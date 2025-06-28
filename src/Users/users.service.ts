/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { clientes } from 'src/Entitys/Cliente.entity';
import {  Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BDB, passwor, userIntBasic } from 'src/interfaces/userinterfaces';
/*import { JwtService } from '@nestjs/jwt';*/
@Injectable()
export class UsersService {
    private saltOrRounds:number = 7;

    constructor(
        @InjectRepository(clientes)
        private ClienteRepository:Repository<clientes>,
/*        private jwtService:JwtService,
*/  
){}

    public async getUserDates(correoelectronico:string,/*password:string*/):Promise<clientes | null>{
          
        const user = await this.ClienteRepository
        .createQueryBuilder('clientes')
        .select(['clientes.ubicacion','clientes.genero','clientes.apellido','clientes.correoelectronico','clientes.nombre_user' ])
        .where('clientes.correoelectronico = :correoelectronico',{ correoelectronico })
        .getOne();
            
            //const confirmPassword = await bcrypt.compare(password,user!.contrasena);
        //console.log("contraseña: "+user?.contrasena);

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

    public async InsertUserNew(
        correoelectronico:string,
        nameUser:string,
        apellido:string,
        genero:string,
        contrasena:string,
        ubicacion:string
    ):Promise<boolean>{
        console.log({
            correo:correoelectronico,
            nameUser,
            apellido,
            genero,
            contrasena,
            ubicacion
        });

        const hashPassword = await bcrypt.hash(contrasena,this.saltOrRounds);
     
        const InsertUser:Promise<boolean> = await this.ClienteRepository
        .query('select insertnewuser($1, $2, $3, $4, $5, $6)',
            [correoelectronico,nameUser,apellido,genero,hashPassword,ubicacion]) as Promise<boolean>
                 
            console.log(InsertUser);
        
            return InsertUser;        
        }

    public async getUserCorreoPasswordVerification(correo:string,contrasena:string):Promise<clientes | null>{
        const user = await this.ClienteRepository
        .createQueryBuilder('clientes')
        .select(['clientes.id_cliente','clientes.correoelectronico','clientes.nombre_user','clientes.genero'
            ,'clientes.apellido','clientes.contrasena','clientes.ubicacion'])
        .where('clientes.correoelectronico = :correoelectronico',{correoelectronico:correo})
        .getOne();
        console.log(user);
            const passwordVerification = await bcrypt.compare(contrasena,user!.contrasena);
            console.log(passwordVerification);
            return passwordVerification ? user : null;
    }

    public async verificationCorreoPassword(correo:string , password:string):Promise<userIntBasic | boolean>{
        let getPassword:Promise<Array<object>>;
        let userObject:Promise<Array<object>>;
        let user:userIntBasic | null =  null;

        const email = await this.ClienteRepository
        .query('select verificationemail($1)',[correo]) as Promise<Array<object>>    
    
        const verificationEmail:BDB = email[0] as BDB;

        console.log(verificationEmail.verificationemail);

        if(verificationEmail.verificationemail){
            getPassword = await this.ClienteRepository
            .query('select contrasena from clientes WHERE correoelectronico = $1 ',
                [correo]) as Promise<Array<object>>;
            //console.log(getPassword);
            
            const passwordGet:passwor = getPassword[0] as passwor;
                console.log(passwordGet);
            const verificationPassword = await bcrypt.compare(password,passwordGet.contrasena);
                console.log(verificationPassword);
                if(verificationPassword){
                    userObject = await this.ClienteRepository
                    .query(
                        `SELECT correoelectronico, nombre_user, apellido, genero, ubicacion FROM clientes 
                        WHERE correoelectronico = $1`, [correo]) as Promise<Array<object>>;  
                    user = userObject[0]  as userIntBasic;    
                    return user;
                }
                return false;
        }
        return false;
    }     
      

}
