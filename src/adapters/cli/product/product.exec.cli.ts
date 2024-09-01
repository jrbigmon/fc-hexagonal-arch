#!/usr/bin/env node

import { program } from "commander";
import { input, select } from "@inquirer/prompts";

import { Database } from "sqlite3";
import { ProductServiceInterface } from "../../../application/product/service/product.service.interface";
import { ProductService } from "../../../application/product/service/product.service";
import { ProductPersistenceInterface } from "../../../application/product/persistence/product.persistence.interface";
import { ProductPersistenceDatabase } from "../../database/product/product.persistence.database";
import { connectionToDatabase } from "../../database/sqlite/connectionToDatabase";
import { productCli } from "./product.cli";
import { ProductInterface } from "../../../application/product/entity/product.interface";

program.version("1.0.0").description("CLI to use product service");

program.action(async () => {
  const database: Database = await connectionToDatabase();
  const productPersistence: ProductPersistenceInterface =
    new ProductPersistenceDatabase(database);
  const productService: ProductServiceInterface = new ProductService(
    productPersistence
  );

  const selectFn = () =>
    select({
      message: "Choose which command you will execute",
      choices: [
        { name: "get", value: "get" },
        { name: "list", value: "list" },
        { name: "create", value: "create" },
        { name: "enable", value: "enable" },
        { name: "disable", value: "disable" },
        { name: "close", value: "close" },
      ],
    }).then(async (result) => {
      result = result as keyof ProductServiceInterface;

      if (result === "close") {
        return false;
      }

      if (result === "create") {
        const productName = await input({
          message: "Enter the product name",
          validate(value) {
            if (!value) return false;
            return true;
          },
        });

        const productPrice = await input({
          message: "Enter the product price",
          validate(value) {
            if (!value) return false;
            if (isNaN(Number(value))) return false;
            if (Number(value) < 0) return false;
            return true;
          },
        });

        try {
          const productCreated = await productCli(productService, "create", {
            action: "create",
            params: {
              name: productName,
              price: Number(productPrice),
            },
          });

          console.log("Product created successfully", productCreated);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error?.message);
          }
        }
      }

      if (result === "get") {
        const productId = await input({
          message: "Enter the product id",
          validate(value) {
            if (!value) return false;
            return true;
          },
        });

        try {
          const product = await productCli(productService, "get", {
            action: "get",
            params: {
              id: productId,
            },
          });

          console.table(product);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      }

      if (result === "list") {
        try {
          const products = (await productCli(productService, "list", {
            action: "list",
            params: {},
          })) as ProductInterface[];

          if (products?.length) {
            console.table(products, ["id", "name", "price", "status"]);
          } else {
            console.log("List of products is empty");
          }
        } catch (error) {}
      }

      if (result === "disable") {
        const productId = await input({
          message: "Enter the product id",
          validate(value) {
            if (!value) return false;
            return true;
          },
        });

        try {
          await productCli(productService, "disable", {
            action: "disable",
            params: { id: productId },
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error?.message);
          }
        }
      }

      if (result === "enable") {
        const productId = await input({
          message: "Enter the product id",
          validate(value) {
            if (!value) return false;
            return true;
          },
        });

        const productPrice = await input({
          message: "Enter the product price",
          validate(value) {
            if (!value) return false;
            if (isNaN(Number(value))) return false;
            if (Number(value) < 0) return false;
            return true;
          },
        });

        try {
          await productCli(productService, "enable", {
            action: "enable",
            params: { id: productId, price: Number(productPrice) },
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error?.message);
          }
        }
      }

      await selectFn();
    });

  await selectFn();
});

program.parse(process.argv);
