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
