import sqlite3, { Database } from "sqlite3";
import { ProductPersistenceInterface } from "../../../application/product/persistence/product.persistence.interface";
import { ProductPersistenceDatabase } from "./product.persistence.database";
import { productTableDatabase } from "./product.table.database";
import { Product } from "../../../application/product/entity/product";
import { ProductStatus } from "../../../application/product/enum/product.status.enum";

describe("ProductPersistenceDatabase", () => {
  let database: Database;
  let productPersistenceDatabase: ProductPersistenceInterface;

  beforeEach(async () => {
    sqlite3.verbose();
    database = new Database(":memory:");
    productPersistenceDatabase = new ProductPersistenceDatabase(database);
    await productTableDatabase(database);
  });

  afterEach(() => {
    database?.close();
  });

  it("Should be save and get a product in database", async () => {
    const product = new Product("123", "Product 1", ProductStatus.ENABLED, 10);

    await productPersistenceDatabase.save(product);

    const productSaved = await productPersistenceDatabase.get(product.getId());

    expect(productSaved).toBeDefined();
    expect(productSaved).toMatchObject(product);
  });

  it("should be save and get a product when the product already exists in database", async () => {
    const product = new Product("123", "Product 1", ProductStatus.ENABLED, 10);

    await productPersistenceDatabase.save(product);
    const productEnabled = await productPersistenceDatabase.get(
      product.getId()
    );
    expect(productEnabled).toMatchObject(product);

    if (productEnabled) {
      productEnabled.setPrice(0);
      productEnabled?.disable();
      await productPersistenceDatabase.save(productEnabled);
    }

    const productDisabled = await productPersistenceDatabase.get(
      product.getId()
    );

    expect(productDisabled).toBeDefined();
    expect(productDisabled?.getStatus()).toBe(ProductStatus.DISABLED);
  });
});
