import { ClientError } from "../../errors/client.error";
import { ProductStatus } from "../enum/product.status.enum";
import { ProductInterface } from "./product.interface";

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
      throw new ClientError(
        "Product status is enabled but the price is less or equal to zero"
      );
    }

    if (this.status === ProductStatus.DISABLED && this.price > 0) {
      throw new ClientError(
        "Product status is disabled but the price is greater than zero"
      );
    }

    if (
      this.status !== ProductStatus.DISABLED &&
      this.status !== ProductStatus.ENABLED
    ) {
      throw new ClientError("Product status is not supported");
    }

    if (!this.id) {
      throw new ClientError("Product id is required");
    }

    if (!this.name) {
      throw new ClientError("Product name is required");
    }

    if (
      this.price === null ||
      this.price === undefined ||
      typeof this.price !== "number" ||
      isNaN(Number(this.price))
    ) {
      throw new ClientError("Product price is required and must be a number");
    }

    if (this.price < 0) {
      throw new ClientError(
        "Product price must be greater than or equal to zero"
      );
    }

    return true;
  }

  enable(): void {
    if (this.price > 0) {
      this.status = ProductStatus.ENABLED;
    } else {
      throw new ClientError(
        "Price must be greater than zero to enable the product."
      );
    }
  }

  disable(): void {
    if (this.price === 0) {
      this.status = ProductStatus.DISABLED;
    } else {
      throw new ClientError("Price must be zero to disable the product.");
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
