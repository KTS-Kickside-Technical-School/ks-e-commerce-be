import { Request, Response, NextFunction } from "express";
import shopRepositories from "../repository/shopRepositories";
import { ExtendedRequest } from "../types/types"
import userRepositories from "../repository/userRepositories";
import { isValidObjectId } from "mongoose";

export const isShopAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const shop = await shopRepositories.findShopByAttribute("name", req.body.name);
        if (shop) {
            return res.status(400).json({
                status: 400,
                message: "Shop with this name already exists"
            })
        }
        return next()
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const isSellerAlreadyHaveShop = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const shop = await shopRepositories.findShopByAttribute("seller", req.user._id)
        if (shop) {
            return res.status(400).json({
                status: 400,
                message: "Seller already have a shop."
            })
        }
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const doesSellerHaveShop = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const shop = await shopRepositories.findShopByAttribute("seller", req.user._id);
        if (!shop) {
            return res.status(404).json({
                status: 404,
                message: "Seller doesn't have a shop."
            })
        }
        req.shop = shop
        return next()
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const isSellersExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const users = await userRepositories.findAllUsers();
        const sellers = users.filter((user) => user.role === "seller");
        if (!sellers || sellers.length < 1) {
            return res.status(404).json({
                status: 404,
                message: "No sellers found!"
            })
        }
        req.users = sellers
        return next()
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const isShopExistsBySeller = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const seller = req.params.seller || req.user._id

        if (!isValidObjectId(seller)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Seller ID"
            })
        }
        const shop = await shopRepositories.findShopByAttribute("seller", seller);
        if (!shop) {
            return res.status(404).json({
                status: 404,
                message: "Shop doesn't exists"
            })
        }
        req.shop = shop;
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}
export const doesSellerHaveAShop = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
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

  export const isShopExistById = async(
    req: any, 
    res: Response, 
    next: NextFunction
): Promise<any> =>{
    try {
        const { shopId } = req.params
        const existingShop = await shopRepositories.findShopByAttribute(
            "_id", 
            shopId
        );

        if(!existingShop){
        return res.status(404).json({
            status: 404,
            mesage: "Shop not found"
        }) }

        next()
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error"
        })
        
    }
  }