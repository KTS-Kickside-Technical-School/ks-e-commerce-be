import { Response, NextFunction } from "express";
import productRepositories from "../repository/productRepositories";
import { ExtendedRequest } from "../types/types";
import { Types } from "mongoose";

export const isProductAlreadyExistInShop = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { productName } = req.body
    const existingProduct = await productRepositories.findProductByAttribute(
      "productName", productName
    )
    if (existingProduct) {
      return res.status(400).json({
        status: 400,
        message: "Product already existing in the shop"
      })
    };

    next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
export const isProductExistById = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params || req.body;
    const productExist = await productRepositories.findProductByAttribute(
      "_id",
      id
    );
    if (!productExist) {
      return res.status(404).json({
        status: 404,
        message: "Product Not Found",
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isProductExistBySlug = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { slug } = req.params || req.body;
    const productExist = await productRepositories.findProductByAttribute(
      "slug",
      slug
    );
    if (!productExist) {
      return res.status(404).json({
        status: 404,
        message: "Product Not Found",
      });
    }
    req.product = productExist;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isProductAvailable = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const productExist = req.product

    if (!productExist || productExist.stock === "0" || productExist.status !== "active") {
      return res.status(400).json({
        status: 400,
        message: "Product not available.",
      });
    }

    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};
export const isProductsAvailable = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let products = await productRepositories.userFindAllProducts();

    if (products.length === 0 || !products) {
      return res.status(404).json({
        status: 404,
        message: "No products found!",
      });
    }

    req.products = products;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isProductExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const id = req.body.product || req.params.productId
    const product = await productRepositories.findProductByAttribute("_id", id)
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product doesn't exists in the database!"
      })
    }
    req.product = product
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}
export const isSellerHaveProducts = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const products = await productRepositories.findProductsByAttribute(
      "shop",
      req.shop?._id
    );

    if (!products || products.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "No products Found",
      });
    }
    req.products = products
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
