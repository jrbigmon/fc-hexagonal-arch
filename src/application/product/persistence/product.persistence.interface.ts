import { ProductInterface } from "../entity/product.interface";

export interface ProductReaderInterface {
  get(id: string): Promise<ProductInterface>;
}

export interface ProductWriterInterface {
  save(product: ProductInterface): Promise<ProductInterface>;
}

export interface ProductPersistenceInterface
  extends ProductReaderInterface,
    ProductWriterInterface {}
