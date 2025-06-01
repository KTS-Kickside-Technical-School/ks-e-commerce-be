import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/types";
import shopRepositories from "../repository/shopRepositories";

const sellerCreateShop = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    req.body.seller = req.user._id;
    const shop = await shopRepositories.saveSellerShop(req.body);
    return res.status(201).json({
      status: 201,
      message: "Shop created successfully",
      data: { shop },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const viewShopDetails = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Shop details retireved successfully",
      data: { shop: req.shop },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateShopDetails = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await shopRepositories.updateShopDetails(
      req.shop?._id,
      req.body
    );
    return res.status(200).json({
      status: 200,
      message: "Shop details updated successfully",
      data: { shop: response },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getAllShops = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Shops Retrieved Successfully",
      data: { shops: req.shops },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getSingleShop = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Shop Retrieved Successfully",
      data: {
        shop: req.shop,
        products: req.products || [],
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  sellerCreateShop,
  viewShopDetails,
  updateShopDetails,
  getAllShops,
  getSingleShop,
};
