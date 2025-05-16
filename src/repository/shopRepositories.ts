import Shop, { IShop } from "../database/models/shop";

const findShopByAttribute = async (key: string, value: any) => {
    return await Shop.findOne({ [key]: value });
}

const findShopBy2Attributes = async (key1: string, value1: string, key2: string, value2: string) => {
    return await Shop.findOne({ [key1]: value1, [key2]: value2 })
}

const saveSellerShop = async (data: IShop) => {
    return await Shop.create(data);
}

export default {
    findShopByAttribute,
    findShopBy2Attributes,
    saveSellerShop
}