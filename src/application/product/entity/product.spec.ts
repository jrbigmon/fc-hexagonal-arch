import { ProductStatus } from "../enum/product.status.enum";
import { Product } from "./product";
import { randomUUID } from "crypto";

describe("Application Product entity", () => {
  describe("IsValid", () => {
    it("Product is valid", () => {
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

    it("Product is not valid when status is enabled and price is less than zero", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.ENABLED,
        0
      );

      expect(() => {
        product.isValid();
      }).toThrow(
        "Product status is enabled but the price is less or equal to zero"
      );
    });

    it("Product is not valid when status is disabled and price is greater than zero", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.DISABLED,
        120
      );

      expect(() => {
        product.isValid();
      }).toThrow(
        "Product status is disabled but the price is greater than zero"
      );
    });

    it("Product is not valid when status is not supported", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        "Status not supported" as ProductStatus,
        120
      );

      expect(() => {
        product.isValid();
      }).toThrow("Product status is not supported");
    });

    it("Product is not valid when it has no id", () => {
      const product = new Product("", "Product A", ProductStatus.ENABLED, 120);

      expect(() => {
        product.isValid();
      }).toThrow("Product id is required");
    });

    it("Product is not valid when it has no name", () => {
      const product = new Product(randomUUID(), "", ProductStatus.ENABLED, 120);

      expect(() => {
        product.isValid();
      }).toThrow("Product name is required");
    });

    it("Product is not valid when it has no valid price", () => {
      const product = new Product(
        randomUUID(),
        "Product A",
        ProductStatus.ENABLED,
        "anyPriceInvalid" as unknown as number
      );

      expect(() => {
        product.isValid();
      }).toThrow("Product price is required and must be a number");
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
