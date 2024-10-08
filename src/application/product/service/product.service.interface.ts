import { ProductInterface } from "../entity/product.interface";

export interface ProductServiceInterface {
  list(): Promise<Array<ProductInterface>>;
  get(id: string): Promise<ProductInterface>;
  create(name: string, price: number): Promise<ProductInterface>;
  enable(id: string, price: number): Promise<ProductInterface>;
  disable(id: string): Promise<ProductInterface>;
}
