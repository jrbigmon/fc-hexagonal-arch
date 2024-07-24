import { Product, ProductStatus } from "./product";
import { randomUUID } from "crypto";

describe("Application Product entity", () => {
  describe("IsValid", () => {
    it("Should be create a new product", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.ENABLED,
        120
      );

      expect(() => {
        product.isValid();
      }).not.toThrow();
    });
  });

  describe("Enable", () => {
    it("Product enable successfully", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.DISABLED,
        120
      );

      expect(() => {
        product.enable();
      }).not.toThrow();
      expect(product.getStatus()).toBe(ProductStatus.ENABLED);
    });

    it("Product enable unsuccessfully", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.DISABLED,
        0
      );

      expect(() => {
        product.enable();
      }).toThrow();
      expect(product.getStatus()).toBe(ProductStatus.DISABLED);
    });
  });

  describe("Disable", () => {
    it("Product disable successfully", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.ENABLED,
        120
      );

      product.setPrice(0);

      expect(() => {
        product.disable();
      }).not.toThrow();
      expect(product.getStatus()).toBe(ProductStatus.DISABLED);
    });

    it("Product disable unsuccessfully", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.ENABLED,
        120
      );

      expect(() => {
        product.disable();
      }).toThrow();
      expect(product.getStatus()).toBe(ProductStatus.ENABLED);
    });
  });
});
