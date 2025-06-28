import Invetory from "../database/models/invetory";
import { invetoryType } from "../database/models/invetory";

const getInventoryRecordByShop = async (shopId: string) => {
  return await Invetory.find({
    shop: shopId,
    type: {
      $in: [invetoryType.PRODUCT_STOCK_IN, invetoryType.STOCK_OUT, invetoryType.PRODUCT_ADDED],
    },
  }).sort({ createdAt: -1 });
};

const getInvetoryRecordsBySeller = async(sellerId: string)=>{
  return await Invetory.find({
    type: { $in: [invetoryType.PRODUCT_STOCK_IN, invetoryType.STOCK_OUT, invetoryType.PRODUCT_ADDED]}
  }). populate({
    path: "shop",
    match: { seller: sellerId },
    select: "_id seller name"
  }).populate(
    "product", "_id productName stock"
  ).sort({ createdAt: -1 })
};

const getAllInventoryGroupedBySeller = async () => {
  return await Invetory.aggregate([
    {
      $match: {
        type: {
          $in: [invetoryType.PRODUCT_STOCK_IN, invetoryType.STOCK_OUT, invetoryType.PRODUCT_ADDED]
        }
      }
    },
    {
      $lookup: {
        from: "shops",
        localField: "shop",
        foreignField: "_id",
        as: "shopInfo"
      }
    },
    {
      $unwind: "$shopInfo"
    },
    {
      $lookup: {
        from: "users",
        localField: "shopInfo.seller",
        foreignField: "_id",
        as: "sellerInfo"
      }
    },
    {
      $unwind: "$sellerInfo"
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productInfo"
      }
    },
    {
      $unwind: "$productInfo"
    },
    {
      $group: {
        _id: "$sellerInfo._id",
        sellerName: { $first: "$sellerInfo.fullNames" }, 
        email: { $first: "$sellerInfo.email" },
        activities: {
          $push: {
            type: "$type",
            shop: "$shopInfo.name",
            product: "$productInfo.productName",
            oldStock: "$oldData.stock",
            newStock: "$newData.stock",
            createdAt: "$createdAt"
          }
        }
      }
    },
    {
      $sort: { "activities.createdAt": -1 }
    }
  ]);
};

const findInvetoryRecordsByAttributes = async(key: any, value: any) =>{
  return await Invetory.findOne({ [key]: value })
}

export default {
    getInventoryRecordByShop,
    getInvetoryRecordsBySeller,
    getAllInventoryGroupedBySeller,
    findInvetoryRecordsByAttributes
};
