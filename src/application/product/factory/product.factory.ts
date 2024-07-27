import { genUUID } from "../../../utils/genUUID";
import { Product } from "../entity/product";
import { ProductInterface } from "../entity/product.interface";
import { ProductStatus } from "../enum/product.status.enum";

export class ProductFactory {
  static createProduct(name: string, price: number): ProductInterface {
    const status =
      price && price > 0 ? ProductStatus.ENABLED : ProductStatus.DISABLED;

    return new Product(genUUID(), name, status, price);
  }
}
