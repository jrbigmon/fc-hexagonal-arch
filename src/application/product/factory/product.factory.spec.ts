import { ProductStatus } from "../enum/product.status.enum";
import { ProductFactory } from "./product.factory";

describe("ProductFactory", () => {
  describe("createProduct", () => {
    it("should be create a new product enabled", () => {
      const product = ProductFactory.createProduct("Product 1", 100);

      expect(() => product.isValid()).not.toThrow();

      expect(product.getStatus()).toBe(ProductStatus.ENABLED);
    });

    it("should be create a new product disabled", () => {
      const product = ProductFactory.createProduct("Product 1", 0);

      expect(() => product.isValid()).not.toThrow();

      expect(product.getStatus()).toBe(ProductStatus.DISABLED);
    });
  });
});
