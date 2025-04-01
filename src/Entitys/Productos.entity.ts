/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class productos {

    @PrimaryGeneratedColumn("uuid")
    id_producto:string;

    @Column({type:"uuid" })
    category_id:string;

    @Column({type:"varchar",length:40  })
    titleProducts:string;

    @Column({ type:"varchar",length:40 })
    nombre:string;

    @Column({ type:"varchar",length:800 })
    descripcion:string;

    @Column({ type:"numeric",precision:10.2 })
    costo:number;

    @Column({ type:"numeric",precision:5.2 })
    descuento:number;

    @Column({ type:"text",length:50 })
    codigo_descuento:string[][]; 

    @Column({ type:"text",length:50 })
    imagenes:string[][];

    @Column({ type:"smallint" })
    cantidad:number;

}