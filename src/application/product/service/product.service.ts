import { ProductInterface } from "../entity/product.interface";
import { ProductFactory } from "../factory/product.factory";
import { ProductPersistenceInterface } from "../persistence/product.persistence.interface";
import { ProductServiceInterface } from "./product.service.interface";

export class ProductService implements ProductServiceInterface {
  constructor(
    private readonly productPersistence: ProductPersistenceInterface
  ) {}

  async list(): Promise<Array<ProductInterface>> {
    try {
      return await this.productPersistence.list();
    } catch (error) {
      if (error instanceof Error) {
        console.error("ProductService.list", error?.message);
      }

      throw error;
    }
  }

  async get(id: string): Promise<ProductInterface> {
    try {
      if (!id) throw new Error("Product id is required");

      const product = await this.productPersistence.get(id);

      if (!product) throw new Error("Product not found");

      return product;
    } catch (error) {
      if (error instanceof Error) {
        console.error("ProductService.get", error?.message);
      }

      throw error;
    }
  }

  async create(name: string, price: number): Promise<ProductInterface> {
    try {
      const newProduct = ProductFactory.createProduct(name, price);

      newProduct.isValid();

      await this.productPersistence.save(newProduct);

      return newProduct;
    } catch (error) {
      if (error instanceof Error) {
        console.error("ProductService.create", error?.message);
      }

      throw error;
    }
  }

  async enable(id: string, price: number): Promise<ProductInterface> {
    try {
      const product = await this.get(id);

      product.setPrice(price);

      product.enable();

      product.isValid();

      await this.productPersistence.save(product);

      return product;
    } catch (error) {
      if (error instanceof Error) {
        console.error("ProductService.enable", error?.message);
      }

      throw error;
    }
  }

  async disable(id: string): Promise<ProductInterface> {
    try {
      const product = await this.get(id);

      product.setPrice(0);

      product.disable();

      product.isValid();

      await this.productPersistence.save(product);

      return product;
    } catch (error) {
      if (error instanceof Error) {
        console.error("ProductService.disable", error?.message);
      }

      throw error;
    }
  }
}
