import { ProductInterface } from "../../application/product/entity/product.interface";
import { ProductServiceInterface } from "../../application/product/service/product.service.interface";

interface Args {
  action: keyof ProductServiceInterface;
  params: { [key: string]: any };
}

interface ArgsGet extends Args {
  action: "get";
  params: { id: string };
}

interface ArgsEnable extends Args {
  action: "enable";
  params: { id: string; price: number };
}

interface ArgsDisable extends Args {
  action: "disable";
  params: { id: string };
}

interface ArgsCreate extends Args {
  action: "create";
  params: { name: string; price: number };
}

type ArgsMapping = {
  get: ArgsGet;
  enable: ArgsEnable;
  disable: ArgsDisable;
  create: ArgsCreate;
};

export type ArgsByMethod<T extends keyof ArgsMapping> = ArgsMapping[T];

export const productCli = async <T extends keyof ProductServiceInterface>(
  productService: ProductServiceInterface,
  action: T,
  args: ArgsByMethod<T>
): Promise<ProductInterface | void> => {
  if (!productService[action]) {
    throw new Error(`Action ${action} not defined for product service`);
  }

  if (action === "create" && args.action === "create") {
    const { name, price } = args.params;

    return await productService.create(name, price);
  }

  if (action === "disable" && args.action === "disable") {
    const { id } = args.params;

    return await productService.disable(id);
  }

  if (action === "enable" && args.action === "enable") {
    const { id, price } = args.params;

    return await productService.enable(id, price);
  }

  if (action === "get" && args.action === "get") {
    const { id } = args.params;

    return await productService.get(id);
  }
};
