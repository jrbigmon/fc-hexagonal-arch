import { Database } from "sqlite3";

export function productTableDatabase(database: Database): Promise<void> {
  return new Promise((resolve, reject) => {
    database.run(
      `
        CREATE TABLE IF NOT EXISTS products 
          (
            id VARCHAR(255) NOT NULL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL, 
            status VARCHAR(255) NOT NULL, 
            price REAL
          )
      `,
      (_: any, error: Error) => {
        if (error) {
          console.log("Error on creating table product:", error);
          return reject(error);
        }

        return resolve();
      }
    );
  });
}
