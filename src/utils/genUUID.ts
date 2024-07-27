import { randomUUID } from "crypto";

export function genUUID(): string {
  return randomUUID();
}
