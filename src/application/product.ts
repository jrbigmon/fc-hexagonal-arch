export interface ProductInterface {
  isValid(): boolean;
  enable(): void;
  disable(): void;
  getId(): string;
  getName(): string;
  setName(name: string): void;
  getStatus(): string;
  getPrice(): number;
  setPrice(price: number): void;
}

export enum ProductStatus {
  DISABLED = "disabled",
  ENABLED = "enabled",
}

export class Product implements ProductInterface {
  private id: string;
  private name: string;
  private status: ProductStatus;
  private price: number;

  constructor(id: string, name: string, status: ProductStatus, price: number) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.price = price;
  }

  isValid(): boolean {
    if (this.status === ProductStatus.ENABLED && this.price <= 0) {
      throw new Error(
        "Product status is enabled but the price is less or equal to zero"
      );
    }

    if (this.status === ProductStatus.DISABLED && this.price > 0) {
      throw new Error(
        "Product status is disabled but the price is greater than zero"
      );
    }

    if (
      this.status !== ProductStatus.DISABLED &&
      this.status !== ProductStatus.ENABLED
    ) {
      throw new Error("Product status is not supported");
    }

    if (!this.id) {
      throw new Error("Product id is required");
    }

    if (!this.name) {
      throw new Error("Product name is required");
    }

    if (
      this.price === null ||
      this.price === undefined ||
      typeof this.price !== "number" ||
      isNaN(Number(this.price))
    ) {
      throw new Error("Product price is required and must be a number");
    }

    return true;
  }

  enable(): void {
    if (this.price > 0) {
      this.status = ProductStatus.ENABLED;
    } else {
      throw new Error("Price must be greater than zero to enable the product.");
    }
  }

  disable(): void {
    if (this.price === 0) {
      this.status = ProductStatus.DISABLED;
    } else {
      throw new Error("Price must be zero to disable the product.");
    }
  }

  getStatus(): string {
    return this.status;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
  }
}
