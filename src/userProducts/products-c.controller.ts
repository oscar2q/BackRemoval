/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('productsSave')
export class ProductsCController{

    constructor(
        private ProductS:ProductsService
    ){}

    @Post('Save')
    protected  async saveProduct():Promise<unknown>{
        return this.ProductS.savesProducts();
    }

    @Get('recover')
    protected getProductsUser(){
        return this.ProductS.getProducts();
    }


}
