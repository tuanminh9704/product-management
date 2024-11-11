import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductParams, UpdateProductParams } from './utils/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/Product';
import { Repository } from 'typeorm';
import *as AWS from "aws-sdk";
import { ConfigService } from '@nestjs/config';
import { createS3 } from 'src/configs/aws-s3.config';

@Injectable()
export class ProductsService {
    private s3 : AWS.S3
    constructor(
        @InjectRepository(Product) private productRepository : Repository<Product>,
        private configService : ConfigService
    ){
        this.s3 = createS3(configService);
    }

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

    async uploadImage(file: Express.Multer.File){
        const bucket = this.configService.get<string>('AWS_PUBLIC_BUCKET_KEY');
        // console.log(file);
        const params = {
            Bucket : bucket,
            Key: String(file.originalname),
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        }
        return await this.s3.upload(params).promise();
    }
}
