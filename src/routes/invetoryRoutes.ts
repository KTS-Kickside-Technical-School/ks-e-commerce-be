import express from 'express'
import invetoryController from '../controller/invetoryController';
import { isShopExistById } from '../middlewares/shopMiddlewares';
import { userAuthorization } from '../middlewares/authorization';
import bodyValidation from '../middlewares/bodyValidation';
import { isProductExists } from '../middlewares/productMiddlewares';
import { updateInvetorySchema } from '../validations/invetoryValidation';
import { isUserExistsById } from '../middlewares/userMidllewares';


const invetoryRoute = express.Router();

invetoryRoute.put(
    "/update-invetory/:productId",
    userAuthorization(["admin", "seller"]),
    bodyValidation(updateInvetorySchema),
    isProductExists,
    invetoryController.updateInvetoryStock
);
invetoryRoute.get(
    "/invetory-records/:shopId",
    userAuthorization(["seller"]),
    isShopExistById,
    invetoryController.getInventoryRecords
);
invetoryRoute.get(
    "/get-seller-invetory-records/:sellerId",
    userAuthorization(["admin"]),
    invetoryController.getInvetoryBySeller
);

invetoryRoute.get(
    "/admin-get-all-invetory-records",
    userAuthorization(["admin"]),
    invetoryController.getAllInventoryGroupedBySeller
)

export default invetoryRoute;