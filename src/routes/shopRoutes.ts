import express from "express"
import {
    isShopAlreadyExists,
    isSellerAlreadyHaveShop,
    doesSellerHaveShop,
    isSellersExists,
    isShopExistsBySeller
} from "../middlewares/shopMiddlewares";
import { userAuthorization } from "../middlewares/authorization";
import shopControllers from "../controller/shopController";
import bodyValidation from "../middlewares/bodyValidation";
import { newShopValidation, updateShopValidation } from "../validations/shopValidations";
import userController from "../controller/userController";

const shopRoutes = express.Router()

shopRoutes.post("/seller-create-shop", userAuthorization(["seller"]), bodyValidation(newShopValidation), isSellerAlreadyHaveShop, isShopAlreadyExists, shopControllers.sellerCreateShop);
shopRoutes.get("/seller-view-shop-details", userAuthorization(["seller"]), doesSellerHaveShop, shopControllers.viewShopDetails);

shopRoutes.get("/admin-view-sellers", userAuthorization(["admin"]), isSellersExists, userController.viewUsers)
shopRoutes.get("/admin-view-single-shop-by-seller/:seller", userAuthorization(["admin"]), isShopExistsBySeller, shopControllers.viewShopDetails)

shopRoutes.put("/seller-update-shop", userAuthorization(["seller"]), bodyValidation(updateShopValidation), doesSellerHaveShop, shopControllers.updateShopDetails);

export default shopRoutes