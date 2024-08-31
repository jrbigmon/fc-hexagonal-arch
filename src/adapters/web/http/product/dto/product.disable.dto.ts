import { ClientError } from "../../../../../application/errors/client.error";

export class ProductDisableDto {
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
