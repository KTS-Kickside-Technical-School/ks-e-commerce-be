import Shop, { IShop } from "../database/models/shop";

const findShopByAttribute = async (key: string, value: any) => {
  return await Shop.findOne({ [key]: value }).populate("seller", "fullNames email phone addresses profile phone isUserVerified");
}

const findShopBy2Attributes = async (key1: string, value1: string, key2: string, value2: string) => {
  return await Shop.findOne({ [key1]: value1, [key2]: value2 })
}

const saveSellerShop = async (data: any) => {
  return await Shop.create(data);
}

const updateShopDetails = async (_id: any, data: any) => {
  return await Shop.findByIdAndUpdate(_id, data, { new: true });
};

const userFindAllShops = async () => {
  return await Shop.aggregate([
    { $match: { status: "active" } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "products",
        let: { shopId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$shop", "$$shopId"] },
                  { $eq: ["$status", "active"] },
                  {
                    $gt: ["$stock", 0]

                  }
                ]
              }
            }
          }
        ],
        as: "products"
      }
    }
  ]);
};


const userFindSingleShop = async (shopId: string) => {
  return await Shop.findOne({
    _id: shopId,
    status: "Active",
  }).populate({
    path: "products",
    match: {
      status: "Active",
      stock: { $gt: 0 },
    },
  });
};

export default {
  findShopByAttribute,
  findShopBy2Attributes,
  saveSellerShop,
  updateShopDetails,
  userFindAllShops,
  userFindSingleShop
}