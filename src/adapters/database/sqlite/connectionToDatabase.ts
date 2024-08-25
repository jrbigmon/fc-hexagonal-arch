import { Database } from "sqlite3";
import { resolve } from "node:path";
import { productTableDatabase } from "../product/product.table.database";

export const connectionToDatabase = async (
  onError?: (error?: Error) => void,
  onSuccess?: (database?: Database) => void
): Promise<Database> => {
  const databasePath = resolve(
    "src",
    "adapters",
    "database",
    "sqlite",
    "database.sql"
  );

  const database = new Promise<Database>(async (resolve, reject) => {
    const database = new Database(databasePath, (error) => {
      if (error) {
        onError?.(error);

        return reject(error);
      }
    });

    onSuccess?.(database);

    await productTableDatabase(database);

    return resolve(database);
  });

  return database;
};
