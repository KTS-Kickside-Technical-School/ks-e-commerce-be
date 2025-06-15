import order, { IOrder } from "../database/models/order"

const saveOrder = async (data: IOrder) => {
    return await order.create(data);
}

const findOrderByAttribute = async (key: any, value: any) => {
    return await order.findOne({ [key]: value })
}

const findOrderById = async (id: any) => {
    return await order.findById(id);
}

const updateOrder = async (_id: any, data: any) => {
    return await order.findByIdAndUpdate(_id, data, { new: true })
}

const findOrdersByAttribute = async (key: any, value: any) => {
    return await order.find({ [key]: value }).populate("user").sort({ createdAt: -1 })
}

export default {
    saveOrder,
    findOrderByAttribute,
    findOrderById,
    updateOrder,
    findOrdersByAttribute
}