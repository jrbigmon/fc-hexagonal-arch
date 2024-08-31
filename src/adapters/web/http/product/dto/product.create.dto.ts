import { ClientError } from "../../../../../application/errors/client.error";

export class ProductCreateDto {
  public name!: string;
  public price!: number;

  constructor({ name, price }: { name: string; price: number }) {
    this.name = name;
    this.price = price;
    this.isValid();
  }

  isValid(): void {
    if (!this.name) {
      throw new ClientError("Product name is required");
    }

    if (this.price === undefined || this.price === null) {
      throw new ClientError("Product price is required");
    }

    if (isNaN(Number(this.price))) {
      throw new ClientError("Product price must be a number");
    }

    if (this.price < 0) {
      throw new ClientError(
        "Product price must be greater than or equal to zero"
      );
    }
  }
}
