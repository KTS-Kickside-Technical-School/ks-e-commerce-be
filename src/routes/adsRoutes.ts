import express from "express";
import adsController from "../controller/adsController";
import bodyValidation from "../middlewares/bodyValidation";
import { saveFeaturedShopValidations } from "../validations/adsValidations";
import { isShopExistById } from "../middlewares/shopMiddlewares";
import { isFeaturedShopExistById } from "../middlewares/featuredShopsMiddleware";
import { userAuthorization } from "../middlewares/authorization";

const adsRouter = express.Router();

adsRouter.get("/get-all-featured-shops", userAuthorization(["admin"]), adsController.getFeaturedSHops);
adsRouter.post("/save-featured-shop", userAuthorization(["admin"]), bodyValidation(saveFeaturedShopValidations), isShopExistById, adsController.saveFeaturedShop);
adsRouter.put("/update-featured-shop/:id", userAuthorization(["admin"]), isFeaturedShopExistById, adsController.updateFeaturedShop);

adsRouter.get("/customer-get-featured-shops", adsController.getFeaturedShopsForCustomer);

export default adsRouter;