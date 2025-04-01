/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class categorys {
    
    @PrimaryGeneratedColumn("uuid")
    id_categoryproduct: string;

    @Column({type:"varchar",length:40})
    nombre: string;

}
