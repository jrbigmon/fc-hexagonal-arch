import { Product } from "../../../application/product/entity/product";
import { ProductInterface } from "../../../application/product/entity/product.interface";
import { ProductStatus } from "../../../application/product/enum/product.status.enum";
import { ProductPersistenceInterface } from "../../../application/product/persistence/product.persistence.interface";
import { Database } from "sqlite3";

export interface ProductPersistedInterface {
  id: string;
  name: string;
  status: ProductStatus;
  price: number;
}

export class ProductPersistenceDatabase implements ProductPersistenceInterface {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  get(id: string): Promise<ProductInterface> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM products WHERE id = ${id}`,
        (_: this, error: Error | null, rows: ProductPersistedInterface[]) => {
          if (error !== null) {
            return reject(error.message);
          }

          if (rows?.length === 0) return null;

          const product = rows[0];

          return resolve(
            new Product(product.id, product.name, product.status, product.price)
          );
        }
      );
    });
  }

  save(product: ProductInterface): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO products (id, name, status, price) VALUES ($id, $name, $status, $price)",
        {
          $id: product.getId(),
          $name: product.getName(),
          $status: product.getStatus(),
          $price: product.getPrice(),
        },
        (_: this, error: Error | null) => {
          if (error !== null) {
            return reject(error);
          }

          resolve();
        }
      );
    });
  }
}
