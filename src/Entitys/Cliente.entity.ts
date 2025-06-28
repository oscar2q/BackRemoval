/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Genero {
    hombre = "H",
    mujer = "M",
};

@Entity()
export class clientes{

    @PrimaryGeneratedColumn("uuid")
    id_cliente:string;

    @Column({type:"varchar",length:40})
    correoelectronico:string

    @Column({type:"varchar",length:40})
    nombre_user:string;

    @Column({type:"varchar",length:40 })
    apellido:string;

    @Column({
        type:"char",
        length:2,
        enum:Genero,
        default:Genero.hombre
    })
    genero:string;

    @Column({type:"varchar",length:100, })
    contrasena:string;

    @Column({type:"varchar",length:30 })
    ubicacion:string;

}

