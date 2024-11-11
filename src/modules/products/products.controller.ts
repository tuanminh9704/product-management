import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {

    constructor(
        private productService : ProductsService, 
    ){}

    @Get()
    async getProducts () {
        return await this.productService.getAllProduct();
    }

    @Get(":id")
    async getProductById(@Param() id : number){
        return await this.productService.findProduct(id);
    }
    
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    async createProduct(@Body() createProductDto : CreateProductDto, @UploadedFile() file: Express.Multer.File,){
        return await this.productService.createProduct(createProductDto, file);
    }

    @Put(':id')
    async updateProductById(@Param() id : number, @Body() updateProductDto : UpdateProductDto){
        return await this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    async deleteProductbyId(@Param() id : number){
        return await this.productService.deleteProduct(id);
    }

    @Post('uploads')
    @UseInterceptors(FileInterceptor('thumbnail'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.productService.uploadImage(file)
    }

}
