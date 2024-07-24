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
