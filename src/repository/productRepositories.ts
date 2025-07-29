import { Types } from "mongoose";
import Product, { IProduct } from "../database/models/product";
import Shop from "../database/models/shop";

const createProduct = async (data: any): Promise<IProduct> => {
  return await Product.create(data);
};

const findProductByAttribute = async (key: any, value: any) => {
  return await Product.findOne({ [key]: value }).populate("shop");
};
const deleteProduct = async (id: any) => {
  return await Product.findByIdAndDelete(id);
};
const updateProduct = async (id: any, data: any) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const userFindAllProducts = async () => {
  return await Product.aggregate([
    {
      $match: {
        status: "active",
        stock: { $gt: 0 },
      },
    },
    {
      $lookup: {
        from: "shops",
        localField: "shop",
        foreignField: "_id",
        as: "shop",
      },
    },
    {
      $unwind: "$shop",
    },
    {
      $match: {
        "shop.status": "active",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};



const findProductsByAttribute = async (key: any, value: any) => {
  return await Product.find({ [key]: value })
    .sort({ createdAt: -1 })
    .populate("shop");
};

const findCustomerProductsByAttribute = async (key: any, value: any) => {
  return await Product.find({ [key]: value, stock: { $gt: 0 }, status: "active" })
    .sort({ createdAt: -1 }).populate('shop');
};



const findProductsGroupedBySellersAndShops = async () => {
  return Shop.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "_id",
        as: "sellerDetails",
      },
    },
    { $unwind: "$sellerDetails" },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "shop",
        as: "products",
      },
    },
    {
      $project: {
        _id: 0,
        sellerId: "$sellerDetails._id",
        sellerName: "$sellerDetails.fullNames",
        shopId: "$_id",
        shopName: "$name",
        products: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              _id: "$$product._id",
              productName: "$$product.productName",
              description: "$$product.description",
              images: "$$product.images",
              price: "$$product.price",
              stock: "$$product.stock",
              category: "$$product.category",
              slug: "$$product.slug",
              status: "$$product.status",
              shippingOptions: "$$product.shippingOptions",
              createdAt: "$$product.createdAt",
            },
          },
        },
      },
    },
  ]);
};

const userFindProductsByAttribute = async (key: any, value: any) => {
  return await Product.find({
    [key]: value,
    status: "active",
    stock: { $gt: 0 },
  })
    .sort({
      createdAt: -1,
    })
    .populate("shop");
};

export default {
  createProduct,
  findProductByAttribute,
  deleteProduct,
  updateProduct,
  userFindAllProducts,
  findProductsByAttribute,
  findProductsGroupedBySellersAndShops,
  findCustomerProductsByAttribute,
  userFindProductsByAttribute,
};
