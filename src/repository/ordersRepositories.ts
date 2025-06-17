import order, { IOrder } from "../database/models/order"

const saveOrder = async (data: IOrder) => {
    return await order.create(data);
}

const findOrderByAttribute = async (key: any, value: any) => {
    return await order.findOne({ [key]: value }).populate("user")
}

const findOrderById = async (id: any) => {
    return await order.findById(id);
}

const updateOrder = async (_id: any, data: any) => {
    if (data.orderTrackingHistory) {
        const { orderTrackingHistory, ...updateData } = data;

        const historyItems = Array.isArray(orderTrackingHistory)
            ? orderTrackingHistory
            : [orderTrackingHistory];

        const update: any = {};

        if (Object.keys(updateData).length > 0) {
            update.$set = updateData;
        }

        update.$push = {
            orderTrackingHistory: { $each: historyItems }
        };

        return await order.findByIdAndUpdate(_id, update, { new: true });
    } else {
        return await order.findByIdAndUpdate(_id, data, { new: true });
    }
}

const findOrdersByAttribute = async (key: any, value: any) => {
    return await order.find({ [key]: value }).populate("user").sort({ createdAt: -1 })
}

const findAllOrders = async () => {
    return await order.find().populate("user").sort({ createdAt: -1 })
}


const findShopOrders = async (shopId: any) => {
    return await order.find()
        .populate({
            path: 'product',
            model: 'Product',
            match: { shop: shopId },
            populate: {
                path: 'shop',
                model: 'Shop',
            }
        })
        .populate('user', '-password')
        .sort({ createdAt: -1 });
};

export default {
    saveOrder,
    findOrderByAttribute,
    findOrderById,
    updateOrder,
    findOrdersByAttribute,
    findAllOrders,
    findShopOrders
}