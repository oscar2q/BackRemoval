/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCart } from './entity/SaveProduct.entity'

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(ProductCart)
        private ProductUser:Repository<ProductCart>
    ){}

    public async savesProducts(){
        
    } 

    public async getProducts(){

    }


}
