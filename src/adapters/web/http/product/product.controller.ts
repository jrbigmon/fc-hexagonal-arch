import { Request, Response } from "express";
import { ProductServiceInterface } from "../../../../application/product/service/product.service.interface";

export const ProductController = (productService: ProductServiceInterface) => ({
  list: async (req: Request, res: Response) => {
    try {
      const products = await productService.list();

      return res.json(products).status(200);
    } catch (error) {
      console.error("Error on list products:", error);
      if (error instanceof Error) {
        return res.json({ error: error?.message }).status(500);
      }

      return res.json({ error: "Unknown error" }).status(500);
    }
  },
});
