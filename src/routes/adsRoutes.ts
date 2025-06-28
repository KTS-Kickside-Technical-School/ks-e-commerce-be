import express from "express";
import adsController from "../controller/adsController";
import bodyValidation from "../middlewares/bodyValidation";
import { saveFeaturedShopValidations } from "../validations/adsValidations";
import { isShopExistById } from "../middlewares/shopMiddlewares";
import { isFeaturedShopExistById } from "../middlewares/featuredShopsMiddleware";

const adsRouter = express.Router();

adsRouter.get("/get-all-featured-shops", adsController.getFeaturedSHops);
adsRouter.post("/save-featured-shop", bodyValidation(saveFeaturedShopValidations), isShopExistById, adsController.saveFeaturedShop);
adsRouter.put("/update-featured-shop/:id", isFeaturedShopExistById, adsController.updateFeaturedShop);

export default adsRouter;