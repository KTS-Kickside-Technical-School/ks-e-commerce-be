import FeaturedShops from "../database/models/featuredShops";

const getAllFeaturedShops = async () => {
    return await FeaturedShops.find()
        .populate({
            path: "shop",
            model: "Shop",
            select: "name logo seller phone",
            populate: {
                path: "seller",
                model: "User",
                select: "fullNames email phone email"
            }
        })
        .select("shop title description status createdAt updatedAt")
        .sort({ createdAt: -1 });
}

const saveFeaturedShop = async (data: any) => {
    return await FeaturedShops.create(data);
}

const updateFeaturedShop = async (_id: any, data: any) => {
    return await FeaturedShops.findByIdAndUpdate(
        _id,
        { $set: data },
        { new: true }
    );
}

const getFeaturedShopByAttribute = async (key: string, value: any) => {
    return await FeaturedShops.findOne({ [key]: value })
        .populate({
            path: "shop",
            model: "Shop",
            select: "name logo seller phone",
            populate: {
                path: "seller",
                model: "User",
                select: "fullNames email phone email"
            }
        })
        .select("shop title description status createdAt updatedAt")
        .sort({ createdAt: -1 });
}

export default {
    getAllFeaturedShops,
    saveFeaturedShop,
    updateFeaturedShop,
    getFeaturedShopByAttribute
}