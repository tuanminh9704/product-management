import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from "../../entities/Product";
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { title } from 'process';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProduct = {
    id: 1,
    title: "test",
    description: "test",
    price: 20,
    thumbnail: "thumbnail"
  };

  const mockProductRepository = {
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOneBy: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation((product) => Promise.resolve({ id: 1, ...product })),
    update: jest.fn().mockImplementation((id: number, product) => Promise.resolve({ id: 1, ...product })),
    delete: jest.fn().mockResolvedValue(mockProduct)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAllProducts", () => {
    it("get all products", async  () => {
      const result = await service.getAllProduct();
      expect(result).toEqual([mockProduct]);
      expect(mockProductRepository.find).toHaveBeenCalled();
    })

    it("Should return empty array if no products found", async () => {
      mockProductRepository.find.mockResolvedValueOnce([]); 
      const result = await service.getAllProduct();
      expect(result).toEqual([]); 
    });
  });

  describe("findProductById", () => {
    it("Should find one product", async () => {
      const result = await service.findProduct(1);
      expect(result).toEqual({
        id: expect.any(Number),
        title: "test",
        description: "test",
        price: 20,
        thumbnail: "thumbnail"
      });
      expect(mockProductRepository.findOneBy).toHaveBeenCalled();
    });
  
    it("Should return NotFoundException if id is invalid", async () => {
      mockProductRepository.findOneBy.mockResolvedValueOnce(null); 
      await expect(service.findProduct(999)).rejects.toThrow(NotFoundException); 
    });
  });

  describe("createProduct", () => {

    it("Should create a product", async () => {
      const newProduct = {
        title: "test2",
        description: "test2",
        price: 20,
        thumbnail: "thumbnail"
      }
      const result = await service.createProduct(newProduct as any);
      expect(result).toEqual({id: expect.any(Number), ...newProduct});
      expect(mockProductRepository.create).toHaveBeenCalled();
      expect(mockProductRepository.save).toHaveBeenCalled();
    })
  })
  
  describe("updateProductById", () => {
    it("Should update a product", async () => {
      const productUpdated = {
        id: 1,
        title: "test2",
        description: "test1",
        price: 20,
        thumbnail: "thumbnail"
      };
      const result = await service.updateProduct(1, productUpdated);
      expect(result).toEqual({ id: 1, ...productUpdated });
    });
  
    it("Should return NotFoundException if product to update is not found", async () => {
      mockProductRepository.findOneBy.mockResolvedValueOnce(null);
      const productUpdated = {
        id: 999,
        title: "test2",
        description: "test1",
        price: 20,
        thumbnail: "thumbnail"
      };
      await expect(service.updateProduct(999, productUpdated)).rejects.toThrow(NotFoundException);
    });
  });
  
  describe("deleteProductById", () => {
    it("Should delete a product", async () => {
      const result = await service.deleteProduct(1);
      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.delete).toHaveBeenCalled();
    });
  
    it("Should return NotFoundException if product to delete is not found", async () => {
      mockProductRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.deleteProduct(999)).rejects.toThrow(NotFoundException);
    });
  });
  
});
