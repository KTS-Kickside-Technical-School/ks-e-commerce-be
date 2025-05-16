import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import ordersRepositories from "../repository/ordersRepositories";

const updateOrder = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const updatedOrder = await ordersRepositories.updateOrder(req?.order?._id, req.body);
        return res.status(200).json({
            status: 200,
            message: "Order updated successfully",
            data: { updatedOrder }
        })
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}

const viewOrders = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Order retrieved successfully",
            data: { orders: req.orders || req.singleProductOrders }
        })
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}

const addSingleProductOrderProcess = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const updatedOrder = await ordersRepositories.updateSingleProductOrder(req?.singleProductOrder?._id, req.body);

        return res.status(200).json({
            status: 200,
            message: "Order updated successfully",
            data: { updatedOrder }
        })
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message })
    }
}

const viewSingleProductOrderDetails = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Single product order retrieved successfully"
            , data: {
                order: req.singleProductOrder
            }
        })
    } catch (error: any) {
        return res.status(500).json({ status: 500, message: error.message });
    }
}

export default {
    updateOrder,
    viewOrders,
    addSingleProductOrderProcess,
    viewSingleProductOrderDetails
}