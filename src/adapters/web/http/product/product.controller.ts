import { Request, Response } from "express";
import { ProductServiceInterface } from "../../../../application/product/service/product.service.interface";
import { ClientError } from "../../../../application/errors/client.error";
import { ProductCreateDto } from "./dto/product.create.dto";
import { Product } from "../../../../application/product/entity/product";
import { ProductEnableDto } from "./dto/product.enable.dto";
import { ProductDisableDto } from "./dto/product.disable.dto";
import { ProductGetDto } from "./dto/product.get.dto";

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
      const productGetDto = new ProductGetDto(req?.params?.id);

      const product = await productService.get(productGetDto.id);

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
      const productEnableDto = new ProductEnableDto({
        id: req?.params?.id,
        price: req?.body?.price,
      });

      const productEnabled = await productService.enable(
        productEnableDto.id,
        productEnableDto.price
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
      const productDisableDto = new ProductDisableDto(req?.params?.id);

      const productDisabled = await productService.disable(
        productDisableDto.id
      );

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
      const productCreateDto = new ProductCreateDto(req.body || {});

      const productCreated = await productService.create(
        productCreateDto.name,
        productCreateDto.price
      );

      return res.json(productCreated).status(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return res.json({ error: error.message, statusCode: 401 }).status(401);
      }

      return res.json({ error: "unknown error", statusCode: 500 }).status(500);
    }
  },
});
