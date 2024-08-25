import { Request, Response } from "express";
import { ProductServiceInterface } from "../../../../application/product/service/product.service.interface";
import { ClientError } from "../../../../application/errors/client.error";

export const ProductController = (productService: ProductServiceInterface) => ({
  list: async (req: Request, res: Response) => {
    try {
      const products = await productService.list();

      return res.json(products).status(200);
    } catch (error) {
      console.error("Error on list products:", error);

      if (error instanceof ClientError) {
        return res.json({ error: error?.message, statusCode: 401 }).status(401);
      }

      return res.json({ error: "Unknown error", statusCode: 500 }).status(500);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const product = await productService.get(req?.params?.id);

      return res.json(product).status(200);
    } catch (error) {
      console.error("Error on get product:", error);

      if (error instanceof ClientError) {
        return res.json({ error: error?.message, statusCode: 401 }).status(401);
      }

      return res.json({ error: "Unknown error", statusCode: 500 }).status(500);
    }
  },

  enable: async (req: Request, res: Response) => {
    try {
      const productEnabled = await productService.enable(
        req?.params?.id,
        req?.body?.price
      );

      return res.json(productEnabled).status(200);
    } catch (error) {
      console.error("Error on enable:", error);

      if (error instanceof ClientError) {
        return res.json({ error: error?.message, statusCode: 401 }).status(401);
      }

      return res.json({ error: "unknown error", statusCode: 500 }).status(500);
    }
  },

  disable: async (req: Request, res: Response) => {
    try {
      const productDisabled = await productService.disable(req?.params?.id);

      return res.json(productDisabled).status(200);
    } catch (error) {
      console.error("Error on disable:", error);

      if (error instanceof ClientError) {
        return res.json({ error: error?.message, statusCode: 401 }).status(401);
      }

      return res.json({ error: "unknown error", statusCode: 500 }).status(500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { name, price } = req?.body || {};

      const productCreated = await productService.create(name, price);

      return res.json(productCreated).status(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return res.json({ error: error.message, statusCode: 401 }).status(401);
      }

      return res.json({ error: "unknown error", statusCode: 500 }).status(500);
    }
  },
});
