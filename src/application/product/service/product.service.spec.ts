import { ProductInterface } from "../entity/product.interface";
import { ProductPersistenceInterface } from "../persistence/product.persistence.interface";
import { ProductService } from "./product.service";
import { ProductServiceInterface } from "./product.service.interface";
import { Product } from "../entity/product";
import { ProductStatus } from "../enum/product.status.enum";
import sqlite3, { Database } from "sqlite3";
import { ProductPersistenceDatabase } from "../../../adapters/database/product/product.persistence.database";
import { productTableDatabase } from "../../../adapters/database/product/product.table.database";

describe("Product service unit tests", () => {
  let database: Database;
  let productService: ProductServiceInterface;
  let productPersistence: ProductPersistenceInterface;

  beforeEach(async () => {
    sqlite3.verbose();

    database = new sqlite3.Database(":memory:", (error) => {
      if (error) {
        return console.log("Error on connection to database", error);
      }
    });

    await productTableDatabase(database);
  });

  afterEach(() => {
    database.close((error) => {
      if (error) {
        console.log("Error on close connection", error);
      }
    });
  });

  describe("Create", () => {
    beforeEach(() => {
      productPersistence = new ProductPersistenceDatabase(database);
      productService = new ProductService(productPersistence);
    });

    it("should be create a new product", async () => {
      let productSaved: ProductInterface | null = null;
      try {
        productSaved = await productService.create("Product 1", 10);

        const productInDatabase = await productService.get(
          productSaved.getId()
        );

        expect(productInDatabase).toMatchObject(productSaved);
        expect(productSaved).not.toBeNull();
      } catch (error) {
        expect(error).toBeNull();
      } finally {
        expect(productSaved).not.toBeNull();
      }
    });

    it("should be not create a new product", async () => {
      expect(async () => {
        await productService.create("", 10);
      }).rejects.toThrow();
    });
  });

  describe("Get", () => {
    beforeEach(async () => {
      productPersistence = new ProductPersistenceDatabase(database);
      await productPersistence.save(
        new Product("1", "Product 1", ProductStatus.ENABLED, 100)
      );
      productService = new ProductService(productPersistence);
    });

    it("should be return a product saved", async () => {
      let product: ProductInterface | null = null;
      try {
        product = await productService.get("1");
        expect(product.getId()).toBe("1");
        expect(product.getName()).toBe("Product 1");
      } catch (error) {
        expect(error).toBeUndefined();
      } finally {
        expect(product).not.toBeNull();
      }
    });

    it("should be not return a product saved", async () => {
      expect(async () => {
        await productService.get("2");
      }).rejects.toThrow("Product not found");
    });

    it("should be not return a product saved when id is not send", async () => {
      expect(async () => {
        await productService.get(undefined as unknown as string);
      }).rejects.toThrow("Product id is required");
    });
  });

  describe("Enable", () => {
    beforeEach(async () => {
      productPersistence = new ProductPersistenceDatabase(database);
      await productPersistence.save(
        new Product("1", "Product 1", ProductStatus.DISABLED, 0)
      );
      productService = new ProductService(productPersistence);
    });

    it("should enable a product", async () => {
      let product: ProductInterface | null = null;
      try {
        product = await productService.enable("1", 100);
        expect(product.getStatus()).toBe(ProductStatus.ENABLED);
      } catch (error) {
        console.error(error);
        expect(error).toBeNull();
      } finally {
        expect(product).not.toBeNull();
      }
    });

    it("should not enable a product", async () => {
      expect(async () => {
        await productService.enable("1", 0);
      }).rejects.toThrow(
        "Price must be greater than zero to enable the product."
      );
    });
  });

  describe("Disable", () => {
    beforeEach(async () => {
      productPersistence = new ProductPersistenceDatabase(database);
      await productPersistence.save(
        new Product("1", "Product 1", ProductStatus.ENABLED, 10)
      );
      productService = new ProductService(productPersistence);
    });

    it("should disable a product", async () => {
      let product: ProductInterface | null = null;
      try {
        product = await productService.disable("1");
        expect(product.getStatus()).toBe(ProductStatus.DISABLED);
      } catch (error) {
        expect(error).toBeNull();
      } finally {
        expect(product).not.toBeNull();
      }
    });
  });
});
