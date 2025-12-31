/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn } from "typeorm";

export enum estado{
    Activo = "Activo",
    Inactivo = "Inactivo",
    Proceso = "Proceso"
}


@Entity()
export class ProductCart{

    @PrimaryColumn({ type:"uuid", nullable:false})
    idCarritoDeCompra:string;

    @Column({type:"uuid",nullable:false})
    idCliente:string;

    @Column({type:"smallint",nullable:false})
    idProduct:number;

    @Column({type:"date",nullable:false})
    fechadeAdiccion:Date;

    @Column({
        type:"character", length:9, enum:estado, 
        default:estado.Inactivo
    })
    estado:string;
}