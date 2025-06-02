import express from "express";
import { userAuthorization } from "../middlewares/authorization";
import bodyValidation from "../middlewares/bodyValidation";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation";
import productController from "../controller/productController";
import {
  isProductAlreadyExistInShop,
  isProductExistById,
  isProductsAvailable,
  isSellerHaveProducts,
  isProductAvailable,
  isProductExistBySlug,
} from "../middlewares/productMiddlewares";
import { doesSellerHaveAShop } from "../middlewares/shopMiddlewares";
import { isCategoryExistById, isCategoryExistByName, isCategoryHaveProducts } from "../middlewares/categoryMiddlewares";

const productRoute = express.Router();

productRoute.post(
  "/create-product",
  userAuthorization(["admin", "seller"]),
  doesSellerHaveAShop,
  bodyValidation(createProductSchema),
  isProductAlreadyExistInShop,
  productController.createProduct
);
productRoute.delete(
  "/delete-product/:id",
  userAuthorization(["admin"]),
  isProductExistById,
  productController.deleteProduct
);

productRoute.put(
  "/update-product/:id",
  userAuthorization(["admin", "seller"]),
  bodyValidation(updateProductSchema),
  isProductExistById,
  productController.updateProductData
);

productRoute.get(
  "/customer-get-product-details/:slug",
  isProductExistBySlug,
  isProductAvailable,
  productController.getSingleProduct
);

productRoute.get(
  "/customer-gel-all-products",
  isProductsAvailable,
  productController.getAllProducts
);

productRoute.get(
  "/seller-get-products",
  userAuthorization(["seller"]),
  doesSellerHaveAShop,
  isSellerHaveProducts,
  productController.getAllProducts
);

productRoute.get(
  "/admin-get-products",
  userAuthorization(["admin"]),
  productController.getAllProductsByAdmin
);

productRoute.get(
  "/get-products-by-category/:name",
  isCategoryExistByName,
  isCategoryHaveProducts,
  productController.getProductsByCategory
)
export default productRoute;
