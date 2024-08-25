import { Router } from "express";
import { ProductController } from "./product.controller";
import { Database } from "sqlite3";
import { ProductService } from "../../../../application/product/service/product.service";
import { ProductPersistenceDatabase } from "../../../database/product/product.persistence.database";

export const ProductRouter = (database: Database): Router => {
  const router = Router();
  const productService = new ProductService(
    new ProductPersistenceDatabase(database)
  );
  const productController = ProductController(productService);

  router.get("/products", async (req, res) => productController.list(req, res));

  return router;
};
