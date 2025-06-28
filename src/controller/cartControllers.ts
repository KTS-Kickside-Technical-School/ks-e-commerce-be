import { Response } from "express";
import { ExtendedRequest } from "../types/types";
import cartRepository from "../repository/cartRepository";

const addProductToCart = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        req.body.user = req.user._id
        const cart = await cartRepository.saveCartProduct(req.body);
        return res.status(201).json({
            status: 201,
            message: "Product added to cart successfully",
            data: {
                cart
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const customerUpdateCart = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const updatedCart = await cartRepository.updateCart(req.cart?._id, req.body);
        return res.status(200).json({
            status: 200,
            message: "Cart updated successfully",
            data: {
                updatedCart
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const customerRemoveProductFromCart = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        await cartRepository.deleteProductFromCart(req.cart?._id);
        return res.status(200).json({
            status: 200,
            message: "Product removed from cart successfully!"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const customerClearCart = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        await cartRepository.clearCart("user", req.user._id);
        return res.status(200).json({
            status: 200,
            message: "Cart cleared successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const customerViewCartProducts = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Cart products retreived successfully",
            data: { cartProducts: req.cartProducts }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}
export default {
    addProductToCart,
    customerUpdateCart,
    customerRemoveProductFromCart,
    customerClearCart,
    customerViewCartProducts
}