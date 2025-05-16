import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import ordersRepositories from "../repository/ordersRepositories";

export const isOrderExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.body._id || req.params._id;
        const order = await ordersRepositories.findOrderByAttribute("_id", id);
        if (!order) {
            return res.status(404).json({ status: 404, message: "Order not found" });
        }

        req.order = order;
        return next()
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}

export const isSellerOrdersExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const orders = await ordersRepositories.findOrdersByShop(req?.shop);

        if (!orders || orders.length < 1) {
            return res.status(404).json({
                status: 404,
                message: "No orders found"
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
export const isSellerSingleProductOrdersExists = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const singleProductOrders = await ordersRepositories.findSingleProductsOrdersByShop(req?.shop?._id);

        if (!singleProductOrders?.length) {
            return res.status(404).json({
                status: 404,
                data: [],
                message: "No orders found for this shop"
            }) as unknown as void;
        }
        req.singleProductOrders = singleProductOrders;

        return next();
    } catch (error: unknown) {
        console.error("Order check error:", error);

        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        }) as unknown as void;
    }
};

export const isSingleProductOrderExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.body._id || req.params._id || req.params.orderId;

        if (!id) {
            return res.status(404).json({ status: 404, message: "Order can't be found" });
        }
        
        const order = await ordersRepositories.findSingleProductOrderByAtrribute("_id", id);

        if (!order) {
            return res.status(404).json({ status: 404, message: "Order not found" });
        }

        req.singleProductOrder = order;
        next();
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message });
    }
};
