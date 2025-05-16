import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import cartRepository from "../repository/cartRepository";
import { json } from "stream/consumers";

export const isProductAlreadyInCart = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const productCart = await cartRepository.findCartProductBy2Attributes("product", req.product?._id, "user", req.user._id);
        if (productCart) {
            return res.status(400).json({
                status: 400,
                message: "Product already in the cart!"
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

export const isProductInCart = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.product?._id || req.params.productId
        const productCart = await cartRepository.findCartProductBy2Attributes("product", id, "user", req.user._id);
        if (!productCart) {
            return res.status(400).json({
                status: 400,
                message: "Product is not found in the cart!"
            })
        }
        req.cart = productCart
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const isProductsInCart = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const productsCart = await cartRepository.findCartProductsByAttribute("user", req.user._id);
        if (!productsCart || productsCart.length < 1) {
            return res.status(400).json({
                status: 400,
                message: "Products are not found in the cart!"
            })
        }
        req.carts = productsCart
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export const isCartProductsExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const cartProducts = await cartRepository.findCartProductsByAttribute("user", req.user._id);
        if (!cartProducts || cartProducts.length < 1) {
            return res.status(404).json({
                status: 404,
                message: "No products found in the cart."
            })
        }

        req.cartProducts = cartProducts
        return next();
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}