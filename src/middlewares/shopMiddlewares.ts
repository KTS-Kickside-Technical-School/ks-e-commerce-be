import { Request, Response, NextFunction } from "express";
import shopRepositories from "../repository/shopRepositories";
import { ExtendedRequest } from "../types/types";
import userRepositories from "../repository/userRepositories";
import mongoose, { isValidObjectId } from "mongoose";
import productRepositories from "../repository/productRepositories";

export const isShopAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const shop = await shopRepositories.findShopByAttribute(
      "name",
      req.body.name
    );
    if (shop) {
      return res.status(400).json({
        status: 400,
        message: "Shop with this name already exists",
      });
    }
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isSellerAlreadyHaveShop = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const shop = await shopRepositories.findShopByAttribute(
      "seller",
      req.user._id
    );
    if (shop) {
      return res.status(400).json({
        status: 400,
        message: "Seller already have a shop.",
      });
    }
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const doesSellerHaveShop = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const shop = await shopRepositories.findShopByAttribute(
      "seller",
      req.user._id
    );
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Seller doesn't have a shop.",
      });
    }
    req.shop = shop;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isSellersExists = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const users = await userRepositories.findAllUsers();
    const sellers = users.filter((user) => user.role === "seller");
    if (!sellers || sellers.length < 1) {
      return res.status(404).json({
        status: 404,
        message: "No sellers found!",
      });
    }
    req.users = sellers;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isShopExistsBySeller = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const seller = req.params.seller || req.user._id;

    if (!isValidObjectId(seller)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Seller ID",
      });
    }
    const shop = await shopRepositories.findShopByAttribute("seller", seller);
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Shop doesn't exists",
      });
    }
    req.shop = shop;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
export const doesSellerHaveAShop = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const shop = await shopRepositories.findShopByAttribute(
      "seller",
      req.user._id
    );
    if (!shop) {
      return res.status(404).json({
        status: 404,
        message: "Seller doesn't have a shop",
      });
    }
    req.shop = shop;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isShopExistById = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {

    const shopId = req.params.shopId || req.body.shopId;

    if (!shopId) {
      return res.status(400).json({
        status: 400,
        message: "Shop ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Shop ID format",
      });
    }

    const existingShop = await shopRepositories.findShopByAttribute("_id", shopId);

    if (!existingShop) {
      return res.status(404).json({
        status: 404,
        message: "Shop not found",
      });
    }

    req.shop = existingShop;
    next();
  } catch (error: any) {
    console.error("Shop existence check error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const isShopAvailable = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const shop = req.shop;
    if (!shop || shop.status.toLowerCase() !== "active") {
      return res.status(400).json({
        status: 400,
        message: "Shop not available or not active",
      });
    }

    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isShopsAvailable = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("AAFF")
    const shops = await shopRepositories.userFindAllShops();


    if (!shops || shops.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Shop unavailable at this moment",
      });
    }

    req.shops = shops;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const isShopHaveProducts = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const products = await productRepositories.userFindProductsByAttribute(
      "shop",
      req?.shop?._id
    );

    req.products = products;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


export const isShopExistByName = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { shop } = req.body;
    console.log("Shop name:", shop);
    const existingShop = await shopRepositories.findShopByAttribute(
      "name",
      shop
    );

    if (!existingShop) {
      return res.status(404).json({
        status: 404,
        mesage: "Shop not found",
      });
    }
    req.shop = existingShop;

    next();
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};