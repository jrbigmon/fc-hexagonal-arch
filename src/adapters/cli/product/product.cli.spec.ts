import { Database, verbose } from "sqlite3";
import { ProductPersistenceInterface } from "../../../application/product/persistence/product.persistence.interface";
import { ProductServiceInterface } from "../../../application/product/service/product.service.interface";
import { productTableDatabase } from "../../database/product/product.table.database";
import { ProductPersistenceDatabase } from "../../database/product/product.persistence.database";
import { ProductService } from "../../../application/product/service/product.service";
import { productCli } from "./product.cli";
import { ProductStatus } from "../../../application/product/enum/product.status.enum";

describe("Product cli", () => {
  let database: Database;
  let productPersistence: ProductPersistenceInterface;
  let productService: ProductServiceInterface;

  beforeEach(async () => {
    verbose();
    database = new Database(":memory:");
    await productTableDatabase(database);
    productPersistence = new ProductPersistenceDatabase(database);
    productService = new ProductService(productPersistence);
  });

  describe("Create and Disable", () => {
    it("Should be create a product enabled and disable the same product", async () => {
      const productCreated = await productCli(productService, "create", {
        action: "create",
        params: { name: "product 1", price: 10.0 },
      });

      expect(productCreated).toBeDefined();
      expect(productCreated).toMatchObject({
        name: "product 1",
        price: 10.0,
        status: ProductStatus.ENABLED,
      });

      if (!Array.isArray(productCreated) && productCreated) {
        const productDisabled = await productCli(productService, "disable", {
          action: "disable",
          params: { id: productCreated.getId() },
        });

        expect(productDisabled).toBeDefined();
        expect(productDisabled).toMatchObject({
          name: "product 1",
          price: 0,
          status: ProductStatus.DISABLED,
        });
      }
    });
  });

  describe("Create and Enable", () => {
    it("Should be create a product disabled and enable the same product", async () => {
      const productCreated = await productCli(productService, "create", {
        action: "create",
        params: { name: "product 2", price: 0 },
      });

      expect(productCreated).toBeDefined();
      expect(productCreated).toMatchObject({
        name: "product 2",
        price: 0,
        status: ProductStatus.DISABLED,
      });

      if (!Array.isArray(productCreated) && productCreated) {
        const productEnabled = await productCli(productService, "enable", {
          action: "enable",
          params: { id: productCreated.getId(), price: 10.0 },
        });

        expect(productEnabled).toBeDefined();
        expect(productEnabled).toMatchObject({
          name: "product 2",
          price: 10.0,
          status: ProductStatus.ENABLED,
        });
      }
    });
  });

  describe("Create and Get", () => {
    it("Should be create a product enabled and get the same product", async () => {
      const productCreated = await productCli(productService, "create", {
        action: "create",
        params: { name: "product 3", price: 10.0 },
      });

      expect(productCreated).toBeDefined();
      expect(productCreated).toMatchObject({
        name: "product 3",
        price: 10.0,
        status: ProductStatus.ENABLED,
      });

      if (!Array.isArray(productCreated) && productCreated) {
        const productSaved = await productCli(productService, "get", {
          action: "get",
          params: { id: productCreated.getId() },
        });

        expect(productSaved).toBeDefined();
        expect(productSaved).toMatchObject(productCreated);
      }
    });
  });

  describe("Create and List", () => {
    it("Should be create a product enabled and get list with this product", async () => {
      const productCreated = await productCli(productService, "create", {
        action: "create",
        params: { name: "product 3", price: 10.0 },
      });

      expect(productCreated).toBeDefined();
      expect(productCreated).toMatchObject({
        name: "product 3",
        price: 10.0,
        status: ProductStatus.ENABLED,
      });

      const productsSaved = await productCli(productService, "list", {
        action: "list",
        params: {},
      });

      expect(productsSaved).toHaveLength(1);
      expect(productsSaved).toMatchObject([productCreated]);
    });
  });
});
