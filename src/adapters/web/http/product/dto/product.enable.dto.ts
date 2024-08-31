import { ClientError } from "../../../../../application/errors/client.error";

export class ProductEnableDto {
  public id!: string;
  public price!: number;

  constructor({ id, price }: { id: string; price: number }) {
    this.id = id;
    this.price = price;
    this.isValid();
  }

  isValid(): void {
    if (!this.id) {
      throw new ClientError("Product id is required");
    }

    if (this.price === undefined || this.price === null) {
      throw new ClientError("Product price is required");
    }

    if (isNaN(Number(this.price))) {
      throw new ClientError("Product price must be a number");
    }

    if (this.price <= 0) {
      throw new ClientError("Product price must be greater than zero");
    }
  }
}
