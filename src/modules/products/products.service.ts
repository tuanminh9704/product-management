import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductParams, UpdateProductParams } from './utils/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/Product';
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
        const product =  await this.productRepository.findOneBy(id);
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async createProduct(createProductDetails: CreateProductParams) {
        const newProduct = this.productRepository.create(createProductDetails);
        if(!newProduct){
            throw new BadRequestException();
        }
        return await this.productRepository.save(newProduct);
        
    }

    async updateProduct(id, updateProductDetails : UpdateProductParams) {
        const product = await this.productRepository.findOneBy(id);
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return await this.productRepository.update({id}, updateProductDetails);
    }

    async deleteProduct(id) {
        const product = await this.productRepository.findOneBy(id);
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return await this.productRepository.delete(id);
    }
}
