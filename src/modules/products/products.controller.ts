import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';

@Controller('products')
export class ProductsController {

    constructor(
        private productService : ProductsService, 
    ){}

    @Get()
    getProduct() {
        return this.productService.getAllProduct();
    }

    @Get(":id")
    getProductById(@Param() id : number){
        return this.productService.findOneProduct(id);
    }

    @Post()
    createProduct(@Body() createProductDto : CreateProductDto){
        return this.productService.createProduct(createProductDto);
    }

    @Put(':id')
    updateProductById(@Param() id : number, @Body() updateProductDto : UpdateProductDto){
        return this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    deleteProductbyId(@Param() id : number){
        return this.productService.deleteProduct(id);
    }
}
