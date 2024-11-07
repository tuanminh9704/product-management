import { Injectable } from '@nestjs/common';
import { CreateProductParams, UpdateProductParams } from './utils/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository : Repository<Product>
    ){}

    async getAllProduct() {
        return await this.productRepository.find();
    }

    async findProduct(id){
        return await this.productRepository.findOneBy(id);
    }

    async createProduct(createProductDetails: CreateProductParams) {
        const newProduct = this.productRepository.create(createProductDetails);
        return await this.productRepository.save(newProduct);
        
    }

    async updateProduct(id: number, updateProductDetails : UpdateProductParams) {
        return await this.productRepository.update({id}, updateProductDetails);
    }

    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }
}
