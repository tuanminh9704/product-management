import { Injectable } from '@nestjs/common';
import { CreateProductParams, UpdateProductParams } from './utils/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository : Repository<Product>
    ){

    }

    getAllProduct() {
        return this.productRepository.find();
    }

    findOneProduct(id){
        return this.productRepository.findOneBy(id)
    }

    createProduct(createProductDetails: CreateProductParams) {
        const newProduct = this.productRepository.create(createProductDetails);
        return this.productRepository.save(newProduct);
        
    }

    updateProduct(id: number, updateProductDetails : UpdateProductParams) {
        return this.productRepository.update({id}, updateProductDetails);
    }

    deleteProduct(id) {
        return this.productRepository.delete(id);
    }
}
