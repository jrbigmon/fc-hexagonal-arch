import { ClientError } from "../../../../../application/errors/client.error";

export class ProductGetDto {
  public id!: string;

  constructor(id: string) {
    this.id = id;
    this.isValid();
  }

  isValid(): void {
    if (!this.id) {
      throw new ClientError("Product id is required");
    }
  }
}
