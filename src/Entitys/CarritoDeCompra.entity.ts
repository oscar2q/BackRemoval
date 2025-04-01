/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ProcesoDeCompra{
    Activo = "Activo",
    Inactivo = "Inactivo",
    Proceso = "Proceso"
}

@Entity()
export class CarritoDeCompra{

    @PrimaryGeneratedColumn("uuid")
    idcarritodecompra:string;

    @Column({ type:"uuid", })
    clienteid:string;

    @Column({ type:"uuid", })
    productoId:string;

    @Column({ type:'smallint', })
    cantidad:number;

    @Column({
        type:'char',
        length:9,
        enum:ProcesoDeCompra,
        default:ProcesoDeCompra.Proceso 
    })
    estado:string;

}