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

  get(id: string): Promise<ProductInterface | null> {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM products WHERE id = ?`,
        [id],
        (error: Error, rows: ProductPersistedInterface) => {
          if (error) {
            return reject(error.message);
          }

          if (!rows) {
            return resolve(null);
          }

          return resolve(
            new Product(rows.id, rows.name, rows.status, rows.price)
          );
        }
      );
    });
  }

  private create(product: ProductInterface): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO products (id, name, status, price) VALUES (?, ?, ?, ?)",
        [
          product.getId(),
          product.getName(),
          product.getStatus(),
          product.getPrice(),
        ],
        function (error: Error | null) {
          if (error) {
            return reject(error);
          }

          return resolve();
        }
      );
    });
  }

  private update(product: ProductInterface): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE products  SET name = ?, status = ?, price = ? WHERE id = ?",
        [
          product.getName(),
          product.getStatus(),
          product.getPrice(),
          product.getId(),
        ],
        function (error: Error | null) {
          if (error) {
            return reject(error);
          }

          return resolve();
        }
      );
    });
  }

  save(product: ProductInterface): Promise<void> {
    return new Promise(async (resolve) => {
      const alreadySaved = await this.get(product.getId());

      if (!alreadySaved) {
        return resolve(this.create(product));
      } else {
        return resolve(this.update(product));
      }
    });
  }
}
