import {
  Product,
  ProductInterface,
  ProductPersistenceInterface,
  ProductServiceInterface,
  ProductStatus,
} from "./product";
import { ProductService } from "./product.service";

class ProductPersistenceMock implements ProductPersistenceInterface {
  list: Map<string, ProductInterface>;

  constructor(list?: Map<string, ProductInterface>) {
    this.list = list ?? new Map();
  }

  async get(id: string): Promise<ProductInterface> {
    const product = this.list.get(id);

    if (!product) throw new Error(`Product ${id} not found`);

    return product;
  }

  async save(product: ProductInterface): Promise<ProductInterface> {
    this.list.set(product.getId(), product);

    const productSaved = this.list.get(product.getId());

    if (!productSaved) throw new Error(`Product ${product.getId()} not saved`);

    return productSaved;
  }
}

describe("Product service", () => {
  let productService: ProductServiceInterface;
  let productPersistence: ProductPersistenceInterface;

  describe("Create", () => {
    beforeEach(() => {
      productPersistence = new ProductPersistenceMock();
      productService = new ProductService(productPersistence);
    });

    it("should be create a new product", async () => {
      let productSaved: ProductInterface | null = null;
      try {
        productSaved = await productService.create("Product 1", 10);
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
    beforeEach(() => {
      productPersistence = new ProductPersistenceMock(
        new Map<string, ProductInterface>().set(
          "1",
          new Product("1", "Product 1", ProductStatus.ENABLED, 100)
        )
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
      }).rejects.toThrow("Product 2 not found");
    });

    it("should be not return a product saved when id is not send", async () => {
      expect(async () => {
        await productService.get(undefined as unknown as string);
      }).rejects.toThrow("Product id is required");
    });
  });

  describe("Enable", () => {
    beforeEach(() => {
      productPersistence = new ProductPersistenceMock(
        new Map<string, ProductInterface>().set(
          "1",
          new Product("1", "Product 1", ProductStatus.DISABLED, 0)
        )
      );
      productService = new ProductService(productPersistence);
    });

    it("should enable a product", async () => {
      let product: ProductInterface | null = null;
      try {
        product = await productService.enable("1", 100);
        expect(product.getStatus()).toBe(ProductStatus.ENABLED);
      } catch (error) {
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
});
