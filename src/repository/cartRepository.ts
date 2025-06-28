import Cart, { ICart } from "../database/models/cart"

const findCartProductBy2Attributes = async (key1: any, value1: any, key2: any, value2: any) => {
    return await Cart.findOne({
        [key1]: value1,
        [key2]: value2
    })
}

const saveCartProduct = async (data: ICart) => {
    return await Cart.create(data)
}

const updateCart = async (_id: any, data: any) => {
    return await Cart.findOneAndUpdate(
        { _id },
        { $set: data },
        { new: true }
    ).populate('product');
};

const deleteProductFromCart = async (_id: any) => {
    return await Cart.findOneAndDelete({ _id });
}

const findCartProductsByAttribute = async (key: any, value: any) => {
    return await Cart.find({
        [key]: value
    }).populate("product");
}

const clearCart = async (key: any, value: any) => {
    return await Cart.deleteMany({ [key]: value });
}

export default {
    findCartProductBy2Attributes,
    saveCartProduct,
    updateCart,
    deleteProductFromCart,
    findCartProductsByAttribute,
    clearCart
}