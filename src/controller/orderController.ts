import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import ordersRepositories from "../repository/ordersRepositories";

const saveOrder = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        req.body.user = req.user._id
        req.body.orderTrackingHistory = [{
            status: "Order Placed",
            note: "Your order has been placed successfully",
            date: new Date()
        }]
        const order = await ordersRepositories.saveOrder(req.body);

        return res.status(200).json({
            status: 201,
            message: "Order is placed successfully",
            data: { order }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getSingleOrder = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {

        return res.status(200).json({
            status: 200,
            message: "Order details retrieved successfully!",
            data: { order: req.order }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const customerUpdateOrder = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const response = await ordersRepositories.updateOrder(req?.params?.id, req.body);
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const customerGetOrders = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const orders = await ordersRepositories.findOrdersByAttribute("user", req.user._id)
        return res.status(200).json({
            status: 200,
            message: "Orders retrieved successfully",
            data: {
                orders
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const adminGetOrders = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const orders = await ordersRepositories.findAllOrders()
        return res.status(200).json({
            status: 200,
            message: "Orders retrieved successfully",
            data: {
                orders
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export default {
    saveOrder,
    getSingleOrder,
    customerUpdateOrder,
    customerGetOrders,
    adminGetOrders
}