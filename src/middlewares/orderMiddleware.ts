import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import ordersRepositories from "../repository/ordersRepositories";

export const isOrderExistsById = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.body._id || req.params.id;

        const order = await ordersRepositories.findOrderById(id);

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found"
            });
        }

        req.order = order;
        return next()
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}

export const isCustomerTheOrderOwner = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        if (!req.order || !req.user) {
            return res.status(400).json({
                status: 400,
                message: "Order or user data is missing."
            });
        }

        if (req.order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 403,
                message: "You do not own this order."
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

export const isOrderExistsByTrackingCoode = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const trackingCode = req.params.trackingCode;

        const order = await ordersRepositories.findOrderByAttribute("trackingCode", trackingCode);

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found"
            });
        }

        req.order = order;
        return next()
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}