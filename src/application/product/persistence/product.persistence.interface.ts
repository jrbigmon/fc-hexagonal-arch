import { ProductInterface } from "../entity/product.interface";

export interface ProductReaderInterface {
  get(id: string): Promise<ProductInterface | null>;
}

export interface ProductWriterInterface {
  save(product: ProductInterface): Promise<void>;
}

export interface ProductPersistenceInterface
  extends ProductReaderInterface,
    ProductWriterInterface {}
