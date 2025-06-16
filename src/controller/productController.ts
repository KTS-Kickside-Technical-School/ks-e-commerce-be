import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/types";
import productRepositories from "../repository/productRepositories";

const createProduct = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    let slug = req.body.productName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    req.body.slug = `${timestamp}-${slug}`.slice(0, 50);
    req.body.shop = req.shop?._id
    const product = await productRepositories.createProduct(req.body);

    return res.status(201).json({
      status: 201, message: 'Product created successfully', product
    });
  } catch (error: any) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteProduct = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedProduct = await productRepositories.deleteProduct(id);

    return res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
      data: { deletedProduct },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateProductData = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const exixtingData = await productRepositories.findProductByAttribute("_id", id)
    const updatedProduct = await productRepositories.updateProduct(
      id,
      productData
    );

    return res.status(200).json({
      status: 200,
      message: "Product Updated Successfully",
      data: { updatedProduct },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Serval Error",
    });
  }
};

const getSingleProduct = async (req: any, res: Response): Promise<any> => {
  try {
    const relatedProducts = await productRepositories.findCustomerProductsByAttribute(
      "category", req.product.category);

    return res.status(200).json({
      status: 200,
      message: "Product Retrieved Successfully",
      data: { product: req.product, relatedProducts },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getAllProducts = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Products retrieved successfully!",
      data: { products: req.products },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
const getAllProductsByAdmin = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const productsData = await productRepositories.findProductsGroupedBySellersAndShops()
    return res.status(200).json({
      status: 200,
      message: " Product retreived successfully",
      data: { productsData }
    })
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error"
    })

  }
};
const getProductsByCategory = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Product Retreived Succesfully",
      data: {
        category: req.category,
        products: req.products,
      }
    })
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message
    })

  }
}
export default {
  createProduct,
  deleteProduct,
  updateProductData,
  getSingleProduct,
  getAllProducts,
  getAllProductsByAdmin,
  getProductsByCategory
};
