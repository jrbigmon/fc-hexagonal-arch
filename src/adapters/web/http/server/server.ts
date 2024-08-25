import express from "express";
import { connectionToDatabase } from "../../../database/sqlite/connectionToDatabase";
import { ProductRouter } from "../product/product.router";

(async () => {
  const app = express();
  const port = 3000;
  const database = await connectionToDatabase();
  const productRouter = ProductRouter(database);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use([productRouter]);

  app.listen(port, () => {
    console.log("Listening on port: " + port);
  });
})();
