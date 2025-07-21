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

const getCustomerFeaturedShops = async () => {
    return await FeaturedShops.aggregate([
        { $match: { status: "active" } },
        { $sort: { createdAt: -1 } },

        {
            $group: {
                _id: "$shop",
                doc: { $first: "$$ROOT" }
            }
        },
        { $replaceRoot: { newRoot: "$doc" } },

        { $limit: 5 },

        {
            $lookup: {
                from: "shops",
                localField: "shop",
                foreignField: "_id",
                as: "shop"
            }
        },
        { $unwind: "$shop" },

        // ✅ Filter to only active shops
        { $match: { "shop.status": "active" } },

        {
            $lookup: {
                from: "users",
                localField: "shop.seller",
                foreignField: "_id",
                as: "shop.seller"
            }
        },
        { $unwind: "$shop.seller" },

        {
            $lookup: {
                from: "products",
                let: { shopId: "$shop._id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$shop", "$$shopId"] },
                                    { $eq: ["$status", "active"] },
                                    { $gt: ["$stock", 0] }
                                ]
                            }
                        }
                    },
                    { $sort: { createdAt: -1 } },
                    { $limit: 3 },
                    {
                        $project: {
                            _id: 1,
                            productName: 1,
                            description: 1,
                            stock: 1,
                            price: 1,
                            images: 1,
                            discount: 1,
                            status: 1,
                            slug: 1,
                            category: 1,
                            shippingOptions: 1,
                            createdAt: 1
                        }
                    }
                ],
                as: "shop.products"
            }
        },

        {
            $project: {
                "shop.name": 1,
                "shop.logo": 1,
                "shop.phone": 1,
                "shop.products": 1,
                "shop.seller.fullNames": 1,
                "shop.seller.email": 1,
                "shop.seller.phone": 1,
                title: 1,
                description: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ]);
};


export default {
    getAllFeaturedShops,
    saveFeaturedShop,
    updateFeaturedShop,
    getFeaturedShopByAttribute,
    getCustomerFeaturedShops
}