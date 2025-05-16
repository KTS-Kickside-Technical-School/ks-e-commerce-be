import mongoose from "mongoose";
import Order, { IOrder } from "../database/models/order";
import SingleProductOrder, { ISingleProductOrders } from "../database/models/SingleProductOrder";

const saveOrder = async (data: any) => {
    return await Order.create(data)
}

const findOrderByAttribute = async (key: any, value: any) => {
    return await Order.findOne({ [key]: value })
}

const updateOrder = async (_id: any, data: any) => {
    return Order.findOneAndUpdate(
        { _id }, data,
        { new: true, runValidators: true })
}


const findOrdersByShop = async (shopId: any) => {
    return await Order.find({ "items.product.shop": shopId })
        .populate("items.product")
        .populate("user")
        .sort({ createdAt: -1 });
};

const saveSingleProductOrder = async (data: any) => {
    return await SingleProductOrder.create(data)
}

const findSingleProductOrderByAtrribute = async (key: any, value: any) => {
    const queryValue = key === "_id" ? new mongoose.Types.ObjectId(value) : value;

    const [order] = await SingleProductOrder.aggregate([
        { $match: { [key]: queryValue } },
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productData"
            }
        },
        { $unwind: "$productData" },
        {
            $lookup: {
                from: "shops",
                localField: "productData.shop",
                foreignField: "_id",
                as: "shopData"
            }
        },
        { $unwind: "$shopData" },
        {
            $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customerData"
            }
        },
        { $unwind: "$customerData" },
        {
            $project: {
                product: "$productData",
                shop: "$shopData",
                customer: "$customerData",
                quantity: 1,
                finalUnitPrice: 1,
                discount: 1,
                images: 1,
                finalTotalPrice: 1,
                originalPrice: 1,
                productName: 1,
                paymentMethod: 1,
                addresses: 1,
                orderProcesses: 1,
                orderStatus: 1,
                createdAt: 1,
                updatedAt: 1,
                trackingNumber: 1,
                courier: 1,
            }
        }
    ]);

    return order || null;
};

const updateSingleProductOrder = async (_id: any, data: any) => {
    const { orderStatus, process, date, images, courier } = data;

    const update: any = {};

    if (orderStatus) update.orderStatus = orderStatus;
    if (courier) update.courier = courier;
    return await SingleProductOrder.findOneAndUpdate(
        { _id },
        {
            $set: update,
            $push: {
                orderProcesses: {
                    process,
                    date,
                    images: images || []
                }
            }
        },
        { new: true, runValidators: true }
    );
};
const findSingleProductsOrdersByShop = async (shopId: any) => {
    const shopObjectId = new mongoose.Types.ObjectId(shopId);

    return await SingleProductOrder.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productData"
            }
        },
        { $unwind: "$productData" },
        {
            $lookup: {
                from: "shops",
                localField: "productData.shop",
                foreignField: "_id",
                as: "shopData"
            }
        },
        {
            $match: {
                "shopData._id": shopObjectId
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "customer",
                foreignField: "_id",
                as: "customerData"
            },
        },
        { $unwind: "$customerData" },
        {
            $project: {
                "product": "$productData",
                "shop": { $arrayElemAt: ["$shopData", 0] },
                "customer": "$customerData",
                quantity: 1,
                finalUnitPrice: 1,
                discount: 1,
                images: 1,
                finalTotalPrice: 1,
                originalPrice: 1,
                productName: 1,
                paymentMethod: 1,
                addresses: 1,
                orderProcesses: 1,
                orderStatus: 1,
                createdAt: 1,
                trackingNumber: 1,
                updatedAt: 1,
                courier: 1,
            }
        },
        { $sort: { createdAt: -1 } }
    ]);
};

export default {
    saveOrder,
    findOrdersByShop,
    findOrderByAttribute,
    updateOrder,
    saveSingleProductOrder,
    findSingleProductOrderByAtrribute,
    updateSingleProductOrder,
    findSingleProductsOrdersByShop,
}